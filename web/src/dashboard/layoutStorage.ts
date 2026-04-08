import { mergeWithDefaults } from './layoutMerge'
import type { DefaultLayoutsShape } from './defaultLayouts'

const STORAGE_KEY = 'web-apple-dashboard-layouts-v1'

export type StoredDashboardLayouts = DefaultLayoutsShape

export function loadDashboardLayouts(): StoredDashboardLayouts {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return mergeWithDefaults(null)
    const parsed = JSON.parse(raw) as Partial<DefaultLayoutsShape>
    return mergeWithDefaults(parsed)
  } catch {
    return mergeWithDefaults(null)
  }
}

export function saveDashboardLayouts(layouts: StoredDashboardLayouts) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts))
}
