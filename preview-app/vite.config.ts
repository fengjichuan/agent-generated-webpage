import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import type { Connect, Plugin } from 'vite'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const designMdRoot = path.join(repoRoot, 'design-md')

export type DesignMdEntry = { slug: string; label: string }

function discoverDesignMdEntries(): DesignMdEntry[] {
  if (!fs.existsSync(designMdRoot)) return []
  const names = fs
    .readdirSync(designMdRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => {
      const light = path.join(designMdRoot, name, 'preview.html')
      return fs.existsSync(light)
    })
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

  return names.map((slug) => ({ slug, label: humanizeSlug(slug) }))
}

function humanizeSlug(slug: string): string {
  return slug
    .split(/[./]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' · ')
}

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
}

function resolveUnderRoot(root: string, relativePath: string): string | null {
  const decoded = decodeURIComponent(relativePath)
  if (decoded.includes('\0')) return null
  const normalized = path.normalize(decoded)
  if (normalized.startsWith('..') || path.isAbsolute(normalized)) return null
  const full = path.join(root, normalized)
  const rootReal = path.resolve(root)
  const fullReal = path.resolve(full)
  if (!fullReal.startsWith(rootReal + path.sep) && fullReal !== rootReal) return null
  return fullReal
}

function designMdDevPlugin(): Plugin {
  return {
    name: 'design-md-dev-static',
    configureServer(server) {
      server.middlewares.use(
        createDesignMdMiddleware(designMdRoot) as Connect.NextHandleFunction,
      )
    },
  }
}

function createDesignMdMiddleware(filesRoot: string): Connect.HandleFunction {
  return (req, res, next) => {
    const raw = req.url
    if (!raw?.startsWith('/design-md/')) {
      next()
      return
    }
    try {
      const pathname = raw.split('?')[0] ?? ''
      const rel = pathname.slice('/design-md/'.length)
      const full = resolveUnderRoot(filesRoot, rel)
      if (!full || !fs.existsSync(full) || !fs.statSync(full).isFile()) {
        next()
        return
      }
      const ext = path.extname(full).toLowerCase()
      res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream')
      fs.createReadStream(full).pipe(res)
    } catch {
      next()
    }
  }
}

function copyDesignMdToDist(): Plugin {
  let outDir = path.resolve(__dirname, 'dist')
  return {
    name: 'copy-design-md-dist',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const dest = path.join(outDir, 'design-md')
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.cpSync(designMdRoot, dest, { recursive: true })
    },
  }
}

const entries = discoverDesignMdEntries()

export default defineConfig({
  plugins: [react(), designMdDevPlugin(), copyDesignMdToDist()],
  define: {
    __DESIGN_MD_ENTRIES__: JSON.stringify(entries),
  },
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
})
