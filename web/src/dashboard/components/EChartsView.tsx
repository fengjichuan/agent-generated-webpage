import type { ECharts, EChartsCoreOption } from 'echarts'
import { useEffect, useLayoutEffect, useRef } from 'react'

type Props = {
  option: EChartsCoreOption
  themeKey: 'light' | 'dark'
  className?: string
}

export function EChartsView({ option, themeKey, className }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ECharts | null>(null)
  const optionRef = useRef(option)
  optionRef.current = option

  useLayoutEffect(() => {
    const el = hostRef.current
    if (!el) return
    let cancelled = false
    let instance: ECharts | null = null
    const ro = new ResizeObserver(() => instance?.resize())

    void import('echarts').then((echarts) => {
      if (cancelled || !hostRef.current) return
      instance = echarts.init(
        hostRef.current,
        themeKey === 'dark' ? 'dark' : undefined,
        { renderer: 'canvas' },
      )
      chartRef.current = instance
      instance.setOption(optionRef.current, { notMerge: true })
      ro.observe(el)
    })

    return () => {
      cancelled = true
      ro.disconnect()
      instance?.dispose()
      chartRef.current = null
    }
  }, [themeKey])

  useEffect(() => {
    chartRef.current?.setOption(option, { notMerge: true })
  }, [option])

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ width: '100%', height: '100%', minHeight: 160 }}
    />
  )
}
