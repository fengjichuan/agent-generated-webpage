import { memo, useMemo, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../theme/ThemeContext'
import type { ChartId } from '../chartConstants'
import { CHART_TITLES } from '../chartConstants'
import { getChartOption } from '../chartOptions'
import { DataTable } from './DataTable'
import { EChartsView } from './EChartsView'

type Props = {
  chartId: ChartId
  editMode: boolean
  mapReady: boolean
}

export const ChartTile = memo(function ChartTile({
  chartId,
  editMode,
  mapReady,
}: Props) {
  const { mode, chart } = useTheme()
  const navigate = useNavigate()
  const title = CHART_TITLES[chartId]

  const option = useMemo(
    () => getChartOption(chartId, chart, mapReady),
    [chartId, chart, mapReady],
  )

  function openDetail() {
    if (!editMode) navigate(`/dashboard/chart/${encodeURIComponent(chartId)}`)
  }

  function onBodyKeyDown(e: KeyboardEvent) {
    if (editMode) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openDetail()
    }
  }

  return (
    <div className={`chart-tile ${editMode ? 'chart-tile--edit' : ''}`}>
      <div
        className="chart-tile__header chart-tile__drag"
        title={editMode ? 'Drag to move' : undefined}
      >
        <span className="chart-tile__title">{title}</span>
        {editMode ? (
          <span className="chart-tile__badge">Edit</span>
        ) : (
          <span className="chart-tile__hint">Click chart for detail</span>
        )}
      </div>
      <div
        className="chart-tile__body"
        role={editMode ? undefined : 'button'}
        tabIndex={editMode ? undefined : 0}
        aria-label={editMode ? undefined : `Open ${title} detail view`}
        onClick={openDetail}
        onKeyDown={onBodyKeyDown}
      >
        {chartId === 'table' ? (
          <DataTable />
        ) : option ? (
          <EChartsView option={option} themeKey={mode} className="chart-tile__chart" />
        ) : null}
      </div>
    </div>
  )
})
