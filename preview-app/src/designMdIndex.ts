/**
 * Hoisted, read-only index of design-md entries (react-best-practices: module-level
 * static data; Map/Set for O(1) lookups — js-set-map-lookups).
 */
export type DesignMdEntry = { readonly slug: string; readonly label: string }

export const DESIGN_MD_ENTRIES: readonly DesignMdEntry[] = __DESIGN_MD_ENTRIES__

export const DESIGN_MD_SLUG_SET: ReadonlySet<string> = new Set(
  DESIGN_MD_ENTRIES.map((e) => e.slug),
)

export const DESIGN_MD_SLUG_TO_LABEL: ReadonlyMap<string, string> = new Map(
  DESIGN_MD_ENTRIES.map((e) => [e.slug, e.label]),
)

export function filterDesignMdEntries(
  query: string,
  entries: readonly DesignMdEntry[] = DESIGN_MD_ENTRIES,
): readonly DesignMdEntry[] {
  const q = query.trim().toLowerCase()
  if (q.length === 0) return entries
  return entries.filter(
    (e) =>
      e.slug.toLowerCase().includes(q) || e.label.toLowerCase().includes(q),
  )
}
