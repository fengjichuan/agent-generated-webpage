import type { EChartsCoreOption } from 'echarts'
import type { ThemePalette } from '../theme/ThemeContext'
import type { ChartId } from './chartConstants'

function baseText(c: ThemePalette) {
  return { color: c.text, fontFamily: 'system-ui, -apple-system, sans-serif' }
}

/** ECharts options per widget. `table` is HTML-only → null. */
export function getChartOption(
  id: ChartId,
  c: ThemePalette,
  worldMapReady: boolean,
): EChartsCoreOption | null {
  if (id === 'table') return null

  const axisLine = { lineStyle: { color: c.axis } }
  const splitLine = { lineStyle: { color: c.splitLine } }
  const common = {
    backgroundColor: 'transparent',
    textStyle: baseText(c),
  }

  switch (id) {
    case 'pie':
      return {
        ...common,
        tooltip: { trigger: 'item' },
        series: [
          {
            type: 'pie',
            radius: ['40%', '68%'],
            avoidLabelOverlap: true,
            itemStyle: { borderRadius: 6, borderColor: c.surface, borderWidth: 2 },
            label: { color: c.text, fontSize: 11 },
            data: [
              { value: 335, name: 'Direct' },
              { value: 234, name: 'Partner' },
              { value: 154, name: 'Organic' },
              { value: 92, name: 'Paid' },
              { value: 48, name: 'Other' },
            ].map((d, i) => ({
              ...d,
              itemStyle: { color: c.palette[i % c.palette.length] },
            })),
          },
        ],
      }

    case 'line':
      return {
        ...common,
        tooltip: { trigger: 'axis' },
        grid: { left: 48, right: 24, top: 28, bottom: 32, containLabel: true },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          axisLine,
          axisLabel: { color: c.textMuted },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisLabel: { color: c.textMuted },
          splitLine,
        },
        series: [
          {
            name: 'Revenue',
            type: 'line',
            smooth: true,
            symbolSize: 6,
            lineStyle: { width: 2, color: c.accent },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: `${c.accent}55` },
                  { offset: 1, color: `${c.accent}08` },
                ],
              },
            },
            data: [120, 182, 151, 194, 230, 280, 260, 310],
          },
        ],
      }

    case 'scatter':
      return {
        ...common,
        tooltip: { trigger: 'item' },
        grid: { left: 48, right: 24, top: 28, bottom: 36, containLabel: true },
        xAxis: {
          type: 'value',
          name: 'Spend (k)',
          nameTextStyle: { color: c.textMuted },
          axisLine,
          axisLabel: { color: c.textMuted },
          splitLine,
        },
        yAxis: {
          type: 'value',
          name: 'CVR',
          nameTextStyle: { color: c.textMuted },
          axisLine: { show: false },
          axisLabel: {
            color: c.textMuted,
            formatter: (v: number) => `${(v * 100).toFixed(0)}%`,
          },
          splitLine,
        },
        series: [
          {
            type: 'scatter',
            symbolSize: 14,
            itemStyle: {
              color: c.palette[0],
              opacity: 0.85,
            },
            data: [
              [12, 0.032],
              [19, 0.041],
              [24, 0.028],
              [31, 0.055],
              [38, 0.038],
              [44, 0.062],
              [52, 0.049],
              [58, 0.071],
              [66, 0.044],
              [72, 0.058],
            ],
          },
        ],
      }

    case 'radar':
      return {
        ...common,
        tooltip: {},
        radar: {
          indicator: [
            { name: 'Latency', max: 100 },
            { name: 'Uptime', max: 100 },
            { name: 'Quality', max: 100 },
            { name: 'Adoption', max: 100 },
            { name: 'Cost', max: 100 },
          ],
          splitArea: { areaStyle: { color: [c.splitLine, 'transparent'] } },
          axisName: { color: c.textMuted },
          splitLine: { lineStyle: { color: c.axis } },
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [82, 94, 76, 88, 71],
                name: 'Current',
                areaStyle: { color: `${c.accent}33` },
                lineStyle: { color: c.accent },
                itemStyle: { color: c.accent },
              },
            ],
          },
        ],
      }

    case 'parallel':
      return {
        ...common,
        parallelAxis: [
          { dim: 0, name: 'Age', min: 18, max: 65 },
          { dim: 1, name: 'Income', min: 20, max: 180 },
          { dim: 2, name: 'Orders', min: 0, max: 80 },
          { dim: 3, name: 'LTV', min: 0, max: 12 },
          { dim: 4, name: 'Churn %', min: 0, max: 40 },
        ],
        parallel: {
          left: 56,
          right: 36,
          bottom: 28,
          top: 42,
          parallelAxisDefault: {
            nameTextStyle: { color: c.textMuted, fontSize: 10 },
            axisLine: { lineStyle: { color: c.axis } },
            axisTick: { lineStyle: { color: c.axis } },
            splitLine: { show: false },
            axisLabel: { color: c.textMuted, fontSize: 9 },
          },
        },
        series: {
          type: 'parallel',
          lineStyle: { width: 1.5, opacity: 0.55 },
          data: [
            [32, 86, 42, 8.2, 8],
            [41, 62, 18, 5.1, 14],
            [28, 48, 55, 6.4, 6],
            [54, 120, 12, 9.8, 22],
            [36, 72, 33, 7.1, 11],
            [45, 95, 24, 8.9, 9],
          ],
          color: c.palette,
        },
      }

    case 'map':
      if (!worldMapReady) {
        return {
          ...common,
          graphic: {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
              text: 'Loading map…',
              fill: c.textMuted,
              fontSize: 13,
            },
          },
        }
      }
      return {
        ...common,
        tooltip: { trigger: 'item' },
        visualMap: {
          min: 0,
          max: 200,
          text: ['High', 'Low'],
          textStyle: { color: c.textMuted },
          inRange: { color: [c.splitLine, c.accent] },
          calculable: true,
          left: 16,
          bottom: 24,
        },
        series: [
          {
            name: 'Users',
            type: 'map',
            map: 'world',
            roam: true,
            emphasis: {
              label: { show: true, color: c.text },
              itemStyle: { areaColor: c.accent },
            },
            itemStyle: {
              borderColor: c.axis,
              areaColor: c.surface,
            },
            data: [
              { name: 'United States', value: 182 },
              { name: 'China', value: 210 },
              { name: 'Germany', value: 96 },
              { name: 'Japan', value: 88 },
              { name: 'United Kingdom', value: 74 },
              { name: 'France', value: 68 },
              { name: 'Brazil', value: 52 },
            ],
          },
        ],
      }

    case 'lines':
      if (!worldMapReady) {
        return {
          ...common,
          graphic: {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: { text: 'Loading routes…', fill: c.textMuted, fontSize: 13 },
          },
        }
      }
      return {
        ...common,
        geo: {
          map: 'world',
          roam: true,
          itemStyle: { areaColor: c.surface, borderColor: c.axis },
          emphasis: { itemStyle: { areaColor: c.splitLine } },
        },
        series: [
          {
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 2,
            effect: {
              show: true,
              period: 5,
              trailLength: 0.02,
              symbol: 'arrow',
              symbolSize: 5,
              color: c.accent,
            },
            lineStyle: { color: c.accent, width: 1, opacity: 0.65, curveness: 0.25 },
            data: [
              { coords: [[-74.006, 40.7128], [2.3522, 48.8566]] },
              { coords: [[121.4737, 31.2304], [139.6917, 35.6895]] },
              { coords: [[12.4964, 41.9028], [-0.1276, 51.5074]] },
              { coords: [[103.8198, 1.3521], [144.9631, -37.8136]] },
            ],
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: { brushType: 'stroke', scale: 3 },
            itemStyle: { color: c.palette[1] },
            symbolSize: 8,
            data: [
              { name: 'NYC', value: [-74.006, 40.7128] },
              { name: 'Paris', value: [2.3522, 48.8566] },
              { name: 'Shanghai', value: [121.4737, 31.2304] },
              { name: 'Tokyo', value: [139.6917, 35.6895] },
            ],
          },
        ],
      }

    case 'sunburst':
      return {
        ...common,
        tooltip: {},
        series: {
          type: 'sunburst',
          radius: [0, '92%'],
          itemStyle: { borderRadius: 4, borderWidth: 2, borderColor: c.surface },
          label: { color: c.text, fontSize: 10 },
          data: [
            {
              name: 'Hardware',
              children: [
                { name: 'Phones', value: 42, itemStyle: { color: c.palette[0] } },
                { name: 'Wearables', value: 18, itemStyle: { color: c.palette[1] } },
                { name: 'Audio', value: 24, itemStyle: { color: c.palette[2] } },
              ],
            },
            {
              name: 'Services',
              children: [
                { name: 'Cloud', value: 31, itemStyle: { color: c.palette[3] } },
                { name: 'Care', value: 14, itemStyle: { color: c.palette[4] } },
              ],
            },
            {
              name: 'Software',
              children: [
                { name: 'Apps', value: 28, itemStyle: { color: c.palette[5] } },
                { name: 'OS', value: 19, itemStyle: { color: c.palette[6] } },
              ],
            },
          ],
        },
      }

    case 'candlestick':
      return {
        ...common,
        tooltip: { trigger: 'axis' },
        grid: { left: 52, right: 20, top: 24, bottom: 28, containLabel: true },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Mon', 'Tue'],
          axisLine,
          axisLabel: { color: c.textMuted },
        },
        yAxis: {
          scale: true,
          axisLine: { show: false },
          axisLabel: { color: c.textMuted },
          splitLine,
        },
        series: [
          {
            type: 'candlestick',
            itemStyle: {
              color: c.palette[2],
              color0: c.palette[3],
              borderColor: c.palette[2],
              borderColor0: c.palette[3],
            },
            data: [
              [20, 34, 18, 30],
              [30, 35, 22, 31],
              [31, 38, 25, 33],
              [33, 40, 28, 36],
              [36, 42, 30, 35],
              [35, 37, 29, 36],
              [36, 45, 32, 44],
            ],
          },
        ],
      }

    case 'gauge':
      return {
        ...common,
        series: [
          {
            type: 'gauge',
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            progress: { show: true, width: 10, itemStyle: { color: c.accent } },
            axisLine: { lineStyle: { width: 10, color: [[1, c.splitLine]] } },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { distance: 14, color: c.textMuted, fontSize: 10 },
            anchor: { show: true, size: 12, itemStyle: { borderWidth: 2, borderColor: c.accent } },
            title: { show: false },
            detail: {
              valueAnimation: true,
              fontSize: 22,
              fontWeight: 600,
              color: c.text,
              offsetCenter: [0, '58%'],
              formatter: '{value}',
            },
            data: [{ value: 72, name: 'NPS' }],
          },
        ],
      }

    case 'themeRiver':
      return {
        ...common,
        tooltip: { trigger: 'axis', axisPointer: { type: 'line' } },
        singleAxis: {
          type: 'time',
          axisTick: {},
          axisLabel: { color: c.textMuted },
          axisLine: { lineStyle: { color: c.axis } },
          splitLine: { show: true, lineStyle: { color: c.splitLine } },
        },
        series: [
          {
            type: 'themeRiver',
            color: c.palette,
            emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.2)' } },
            data: [
              ['2024-01-01', 12, 'Alpha'],
              ['2024-01-02', 18, 'Alpha'],
              ['2024-01-03', 22, 'Alpha'],
              ['2024-01-01', 8, 'Beta'],
              ['2024-01-02', 14, 'Beta'],
              ['2024-01-03', 11, 'Beta'],
              ['2024-01-01', 20, 'Gamma'],
              ['2024-01-02', 16, 'Gamma'],
              ['2024-01-03', 24, 'Gamma'],
              ['2024-01-04', 19, 'Alpha'],
              ['2024-01-04', 15, 'Beta'],
              ['2024-01-04', 21, 'Gamma'],
            ],
          },
        ],
      }

    case 'pictorialBar':
      return {
        ...common,
        tooltip: { trigger: 'axis' },
        grid: { left: 48, right: 24, top: 20, bottom: 28, containLabel: true },
        xAxis: {
          type: 'value',
          max: 100,
          axisLine: { show: false },
          axisLabel: { color: c.textMuted },
          splitLine,
        },
        yAxis: {
          type: 'category',
          data: ['Phones', 'Tablets', 'Audio', 'Wearables', 'Accessories'],
          axisLine,
          axisLabel: { color: c.textMuted },
        },
        series: [
          {
            type: 'pictorialBar',
            symbol: 'roundRect',
            symbolRepeat: true,
            symbolSize: [10, 14],
            symbolMargin: 3,
            itemStyle: { color: c.accent },
            data: [78, 62, 88, 45, 70],
          },
        ],
      }

    default:
      return { ...common }
  }
}
