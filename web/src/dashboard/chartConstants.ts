export const CHART_IDS = [
  'table',
  'pie',
  'line',
  'scatter',
  'radar',
  'parallel',
  'map',
  'lines',
  'sunburst',
  'candlestick',
  'gauge',
  'themeRiver',
  'pictorialBar',
] as const

export type ChartId = (typeof CHART_IDS)[number]

export function isChartId(s: string): s is ChartId {
  return (CHART_IDS as readonly string[]).includes(s)
}

export const CHART_TITLES: Record<ChartId, string> = {
  table: 'Regional metrics',
  pie: 'Channel mix',
  line: 'Revenue trend',
  scatter: 'Spend vs conversion',
  radar: 'Product health',
  parallel: 'Customer segments',
  map: 'Regional distribution',
  lines: 'Logistics flows',
  sunburst: 'Category breakdown',
  candlestick: 'Trading range',
  gauge: 'NPS score',
  themeRiver: 'Topic trends',
  pictorialBar: 'Inventory symbols',
}
