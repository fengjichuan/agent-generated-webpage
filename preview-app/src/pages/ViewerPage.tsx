import { useCallback } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  DESIGN_MD_SLUG_SET,
  DESIGN_MD_SLUG_TO_LABEL,
} from '../designMdIndex'

export function ViewerPage() {
  const { slug: rawSlug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const mode = searchParams.get('mode') === 'dark' ? 'dark' : 'light'

  const slug = rawSlug ? decodeURIComponent(rawSlug) : ''
  const valid = slug.length > 0 && DESIGN_MD_SLUG_SET.has(slug)

  const label = valid ? (DESIGN_MD_SLUG_TO_LABEL.get(slug) ?? slug) : ''

  const file = mode === 'dark' ? 'preview-dark.html' : 'preview.html'
  const src = valid ? `/design-md/${encodeURIComponent(slug)}/${file}` : ''

  const setMode = useCallback(
    (next: 'light' | 'dark') => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev)
          p.set('mode', next)
          return p
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  if (!valid) {
    return (
      <div className="viewer-shell">
        <div className="viewer-bar">
          <Link className="back" to="/">
            ← All previews
          </Link>
          <span className="viewer-title">Unknown brand</span>
        </div>
        <p className="viewer-error">
          No <code>design-md/{slug.length > 0 ? slug : '…'}/preview.html</code>{' '}
          found. Return to the index and pick a listed brand.
        </p>
      </div>
    )
  }

  return (
    <div className="viewer-shell">
      <div className="viewer-bar">
        <Link className="back" to="/">
          ← All previews
        </Link>
        <div className="viewer-meta">
          <span className="viewer-title">{label}</span>
          <code className="viewer-slug">{slug}</code>
        </div>
        <div className="toggle" role="group" aria-label="Theme">
          <button
            type="button"
            className={mode === 'light' ? 'active' : ''}
            onClick={() => setMode('light')}
          >
            Light
          </button>
          <button
            type="button"
            className={mode === 'dark' ? 'active' : ''}
            onClick={() => setMode('dark')}
          >
            Dark
          </button>
        </div>
      </div>
      <iframe
        key={src}
        className="frame"
        title={`${label} preview`}
        src={src}
      />
    </div>
  )
}
