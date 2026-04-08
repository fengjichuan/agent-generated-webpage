import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CHART_TITLES, isChartId } from '../dashboard/chartConstants'
import { DataTable } from '../dashboard/components/DataTable'
import { EChartsView } from '../dashboard/components/EChartsView'
import '../dashboard/dashboard.css'
import { getChartOption } from '../dashboard/chartOptions'
import { ensureWorldMapRegistered } from '../dashboard/geoRegister'
import { useTheme } from '../theme/ThemeContext'

export default function ChartDetailPage() {
  const { chartId: raw } = useParams()
  const chartId = raw ? decodeURIComponent(raw) : ''
  const { mode, chart } = useTheme()
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    void ensureWorldMapRegistered().then(setMapReady)
  }, [])

  const valid = isChartId(chartId)

  const option = useMemo(() => {
    if (!valid || chartId === 'table') return null
    return getChartOption(chartId, chart, mapReady)
  }, [valid, chartId, chart, mapReady])

  if (!valid) {
    return <Navigate to="/dashboard" replace />
  }

  const title = CHART_TITLES[chartId]

  return (
    <div className="detail-page">
      <header className="detail-toolbar">
        <Link to="/dashboard">← Dashboard</Link>
        <h1>{title}</h1>
        <Link to="/">Home</Link>
      </header>
      <div className="detail-body">
        <div className="detail-chart-host">
          {chartId === 'table' ? (
            <DataTable />
          ) : option ? (
            <EChartsView option={option} themeKey={mode} className="chart-tile__chart" />
          ) : null}
        </div>
      </div>
    </div>
  )
}
