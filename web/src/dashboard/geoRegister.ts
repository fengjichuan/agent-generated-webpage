let loadPromise: Promise<boolean> | null = null

/** Served from `public/geo/world.json` (same-origin). */
function worldGeoUrl(): string {
  return `${import.meta.env.BASE_URL}geo/world.json`
}

function parseGeoJsonText(text: string): unknown {
  const start = text.indexOf('{')
  if (start === -1) throw new Error('world.json: no JSON object found')
  return JSON.parse(text.slice(start)) as unknown
}

/** Registers ECharts map "world" from bundled static asset. */
export function ensureWorldMapRegistered(): Promise<boolean> {
  if (loadPromise) return loadPromise

  const p = Promise.all([
    import('echarts'),
    fetch(worldGeoUrl()).then(async (r) => {
      if (!r.ok) throw new Error(`world.json: HTTP ${r.status}`)
      const text = await r.text()
      return parseGeoJsonText(text)
    }),
  ])
    .then(([echarts, geoJson]) => {
      echarts.registerMap('world', geoJson as never)
      return true
    })
    .catch(() => {
      loadPromise = null
      return false
    })

  loadPromise = p
  return p
}
