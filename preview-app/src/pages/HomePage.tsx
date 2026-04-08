import {
  memo,
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react'
import { Link } from 'react-router-dom'
import {
  DESIGN_MD_ENTRIES,
  type DesignMdEntry,
  filterDesignMdEntries,
} from '../designMdIndex'

type BrandCardProps = { entry: DesignMdEntry }

/** Top-level leaf component (react-best-practices: rerender-no-inline-components). */
const BrandCard = memo(function BrandCard({ entry }: BrandCardProps) {
  const lightTo = `/view/${encodeURIComponent(entry.slug)}?mode=light`
  const darkTo = `/view/${encodeURIComponent(entry.slug)}?mode=dark`
  return (
    <li className="card">
      <div className="card-head">
        <span className="card-title">{entry.label}</span>
        <code className="card-slug">{entry.slug}</code>
      </div>
      <div className="card-actions">
        <Link className="btn primary" to={lightTo}>
          Light
        </Link>
        <Link className="btn" to={darkTo}>
          Dark
        </Link>
      </div>
    </li>
  )
})

export function HomePage() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const filtered = useMemo(
    () => filterDesignMdEntries(deferredQuery),
    [deferredQuery],
  )

  const isStale = query !== deferredQuery

  const onQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  return (
    <div className="shell">
      <header className="hero">
        <p className="eyebrow">agent-generated-webpage</p>
        <h1>design-md previews</h1>
        <p className="lede">
          Browse every brand sample under <code>design-md/</code>. Open light or
          dark HTML catalogs in a full-width frame.
        </p>
        <div className="search-row">
          <label className="sr-only" htmlFor="filter">
            Filter brands
          </label>
          <input
            id="filter"
            className="search"
            type="search"
            placeholder="Filter by folder name or label…"
            value={query}
            onChange={onQueryChange}
            autoComplete="off"
            spellCheck={false}
          />
          <span className="count">
            {filtered.length} / {DESIGN_MD_ENTRIES.length}
          </span>
        </div>
      </header>

      <main>
        <ul
          className="grid"
          style={{ opacity: isStale ? 0.72 : 1 }}
          aria-busy={isStale ? true : undefined}
        >
          {filtered.map((e) => (
            <BrandCard key={e.slug} entry={e} />
          ))}
        </ul>
        {filtered.length === 0 ? (
          <p className="empty">No brands match that filter.</p>
        ) : null}
      </main>
    </div>
  )
}
