import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

/** Route-level code splitting (react-best-practices: bundle-dynamic-imports). */
const HomePage = lazy(() =>
  import('./pages/HomePage.tsx').then((m) => ({ default: m.HomePage })),
)
const ViewerPage = lazy(() =>
  import('./pages/ViewerPage.tsx').then((m) => ({ default: m.ViewerPage })),
)

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view/:slug" element={<ViewerPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
