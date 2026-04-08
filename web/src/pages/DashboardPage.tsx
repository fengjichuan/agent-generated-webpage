import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Responsive, WidthProvider } from 'react-grid-layout/legacy'
import type { Layout, ResponsiveLayouts } from 'react-grid-layout/legacy'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { CHART_IDS } from '../dashboard/chartConstants'
import { ChartTile } from '../dashboard/components/ChartTile'
import '../dashboard/dashboard.css'
import { ensureWorldMapRegistered } from '../dashboard/geoRegister'
import {
  loadDashboardLayouts,
  saveDashboardLayouts,
  type StoredDashboardLayouts,
} from '../dashboard/layoutStorage'
import { useTheme } from '../theme/ThemeContext'

const ResponsiveGridLayout = WidthProvider(Responsive)

export default function DashboardPage() {
  const { mode, toggleMode } = useTheme()
  const [layouts, setLayouts] = useState<StoredDashboardLayouts>(() =>
    loadDashboardLayouts(),
  )
  const [editMode, setEditMode] = useState(false)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    void ensureWorldMapRegistered().then(setMapReady)
  }, [])

  const onLayoutChange = useCallback(
    (_current: Layout, allLayouts: ResponsiveLayouts) => {
      setLayouts((prev) => ({
        lg: allLayouts.lg ?? prev.lg,
        xs: allLayouts.xs ?? prev.xs,
      }))
    },
    [],
  )

  const onSaveLayout = useCallback(() => {
    saveDashboardLayouts(layouts)
  }, [layouts])

  return (
    <div className="dashboard-page">
      <header className="dashboard-toolbar">
        <h1>Analytics dashboard</h1>
        <div className="dashboard-toolbar__actions">
          <Link to="/">Home</Link>
          <button
            type="button"
            className={`dashboard-btn dashboard-btn--ghost ${editMode ? 'dashboard-btn--active' : ''}`}
            onClick={() => setEditMode((e) => !e)}
          >
            {editMode ? 'Done editing' : 'Edit layout'}
          </button>
          <button
            type="button"
            className="dashboard-btn dashboard-btn--primary"
            onClick={onSaveLayout}
            title="Save current layout to this browser (localStorage)"
          >
            Save layout
          </button>
          <button
            type="button"
            className="dashboard-btn dashboard-btn--ghost"
            onClick={toggleMode}
          >
            {mode === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      <div className="dashboard-grid-wrap">
        <ResponsiveGridLayout
          className="dashboard-grid"
          layouts={layouts}
          breakpoints={{ lg: 768, xs: 0 }}
          cols={{ lg: 12, xs: 1 }}
          rowHeight={32}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          onLayoutChange={onLayoutChange}
          isDraggable={editMode}
          isResizable={editMode}
          draggableHandle=".chart-tile__drag"
          useCSSTransforms
          compactType="vertical"
        >
          {CHART_IDS.map((id) => (
            <div key={id}>
              <ChartTile chartId={id} editMode={editMode} mapReady={mapReady} />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  )
}
