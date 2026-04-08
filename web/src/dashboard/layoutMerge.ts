import type { Layout, LayoutItem, ResponsiveLayouts } from 'react-grid-layout/legacy'
import type { DefaultLayoutsShape } from './defaultLayouts'
import { CHART_IDS } from './chartConstants'
import { getDefaultLayouts } from './defaultLayouts'

function mergeBreakpoint(saved: Layout | undefined, defaults: Layout): Layout {
  const list = saved ?? []
  const byId = new Map(list.map((item) => [item.i, item]))
  const out: LayoutItem[] = CHART_IDS.map((id) => {
    const d = defaults.find((x) => x.i === id)
    const s = byId.get(id)
    if (s && d) return { ...d, ...s, i: id }
    return (
      d ?? {
        i: id,
        x: 0,
        y: 0,
        w: 4,
        h: 6,
        minW: 1,
        minH: 4,
      }
    )
  })
  return out
}

/** Ensures every chart id exists; fills missing keys from defaults. */
export function mergeWithDefaults(
  raw: Partial<ResponsiveLayouts> | null | undefined,
): DefaultLayoutsShape {
  const def = getDefaultLayouts()
  if (!raw || typeof raw !== 'object') return def
  return {
    lg: mergeBreakpoint(raw.lg, def.lg),
    xs: mergeBreakpoint(raw.xs, def.xs),
  }
}
