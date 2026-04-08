import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'web-apple-theme'

export type ThemeMode = 'light' | 'dark'

export type ThemePalette = {
  text: string
  textMuted: string
  axis: string
  splitLine: string
  bg: string
  surface: string
  accent: string
  palette: string[]
}

function readTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const v = window.localStorage.getItem(STORAGE_KEY)
  return v === 'dark' || v === 'light' ? v : 'light'
}

function paletteFor(mode: ThemeMode): ThemePalette {
  if (mode === 'dark') {
    return {
      text: '#f5f5f7',
      textMuted: 'rgba(255,255,255,0.55)',
      axis: 'rgba(255,255,255,0.25)',
      splitLine: 'rgba(255,255,255,0.08)',
      bg: '#000000',
      surface: '#272729',
      accent: '#2997ff',
      palette: [
        '#2997ff',
        '#30d158',
        '#ff9f0a',
        '#ff375f',
        '#bf5af2',
        '#64d2ff',
        '#ffd60a',
        '#ac8e68',
      ],
    }
  }
  return {
    text: '#1d1d1f',
    textMuted: 'rgba(0,0,0,0.48)',
    axis: 'rgba(0,0,0,0.2)',
    splitLine: 'rgba(0,0,0,0.06)',
    bg: '#f5f5f7',
    surface: '#ffffff',
    accent: '#0071e3',
    palette: [
      '#0071e3',
      '#34c759',
      '#ff9500',
      '#ff3b30',
      '#af52de',
      '#5ac8fa',
      '#ffcc00',
      '#8e8e93',
    ],
  }
}

type ThemeContextValue = {
  mode: ThemeMode
  setMode: (m: ThemeMode) => void
  toggleMode: () => void
  chart: ThemePalette
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m)
  }, [])

  const toggleMode = useCallback(() => {
    setModeState((m) => (m === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode,
      chart: paletteFor(mode),
    }),
    [mode, setMode, toggleMode],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export function initThemeDom() {
  document.documentElement.dataset.theme = readTheme()
}
