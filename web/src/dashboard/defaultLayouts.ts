import type { Layout, LayoutItem } from 'react-grid-layout/legacy'
import { CHART_IDS } from './chartConstants'

const ROW_H = 7

function lgLayout(): Layout {
  const items: LayoutItem[] = CHART_IDS.map((id, i) => {
    const col = i % 3
    const row = Math.floor(i / 3)
    return {
      i: id,
      x: col * 4,
      y: row * ROW_H,
      w: 4,
      h: ROW_H,
      minW: 4,
      minH: 5,
    }
  })
  return items
}

function xsLayout(): Layout {
  const items: LayoutItem[] = CHART_IDS.map((id, i) => ({
    i: id,
    x: 0,
    y: i * ROW_H,
    w: 1,
    h: ROW_H,
    minW: 1,
    minH: 5,
  }))
  return items
}

export type DefaultLayoutsShape = { lg: Layout; xs: Layout }

/** Desktop ≥768px: 12 cols → 3 columns (w=4). Mobile: single column. */
export function getDefaultLayouts(): DefaultLayoutsShape {
  return {
    lg: lgLayout(),
    xs: xsLayout(),
  }
}
