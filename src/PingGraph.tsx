import { useRef } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  type ChartOptions,
  type ScriptableContext,
  type ScriptableLineSegmentContext,
} from 'chart.js'
import type { LatencyDataPoint } from './usePingLatency'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

interface PingGraphProps {
  latencyData: LatencyDataPoint[]
}

const getLatencyColor = (latency: number | null): string => {
  if (latency === null) return '#78716c' // stone-500 for null
  if (latency < 100) return '#4ade80' // green-400
  if (latency <= 300) return '#facc15' // yellow-400
  return '#f87171' // red-400
}

const getCurrentLatencyColor = (latency: number | null): string => {
  if (latency === null) return 'text-stone-500'
  if (latency < 100) return 'text-green-400'
  if (latency <= 300) return 'text-yellow-400'
  return 'text-red-400'
}

export const PingGraph = ({ latencyData }: PingGraphProps) => {
  const chartRef = useRef<ChartJS<'line'> | null>(null)
  const currentLatency = latencyData.length > 0 ? latencyData[latencyData.length - 1].latency : null

  // Format time labels in French locale (HH:MM:SS)
  const labels = latencyData.map((point) => {
    const date = new Date(point.timestamp)
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  })

  // Create gradient-aware dataset with segment coloring
  const dataPoints = latencyData.map((point) => point.latency)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Latence',
        data: dataPoints,
        borderColor: '#4ade80',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const chart = context.chart
          const { chartArea } = chart
          if (!chartArea) return 'rgba(74, 222, 128, 0.1)'
          const gradient = chart.ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
          gradient.addColorStop(0, 'rgba(74, 222, 128, 0.1)') // green at bottom
          gradient.addColorStop(0.5, 'rgba(250, 204, 21, 0.2)') // yellow at middle
          gradient.addColorStop(1, 'rgba(248, 113, 113, 0.3)') // red at top
          return gradient
        },
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 4,
        spanGaps: true,
        segment: {
          borderColor: (ctx: ScriptableLineSegmentContext) => {
            const latency = ctx.p1.parsed.y as number | null
            return getLatencyColor(latency)
          },
        },
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(41, 37, 36, 0.95)', // stone-900
        titleColor: '#fbbf24', // amber-400
        bodyColor: '#e7e5e4', // stone-200
        borderColor: 'rgba(120, 113, 108, 0.5)', // stone-500
        borderWidth: 1,
        padding: 12,
        titleFont: {
          family: 'Cinzel Decorative',
          size: 14,
        },
        bodyFont: {
          family: 'system-ui',
          size: 13,
        },
        callbacks: {
          title: (context) => {
            return context[0].label
          },
          label: (context) => {
            const latency = context.parsed.y as number | null
            if (latency === null) return 'Latence: --'
            return `Latence: ${latency} ms`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(120, 113, 108, 0.2)', // stone-500
        },
        ticks: {
          color: 'rgba(231, 229, 228, 0.6)', // stone-200
          font: {
            size: 10,
          },
          maxTicksLimit: 6,
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: 500,
        grid: {
          color: 'rgba(120, 113, 108, 0.2)', // stone-500
        },
        ticks: {
          color: 'rgba(231, 229, 228, 0.6)', // stone-200
          font: {
            size: 10,
          },
          callback: (value) => `${value} ms`,
        },
        title: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="mt-6 bg-stone-900/60 border border-stone-700/50 rounded-lg p-4">
      {/* Header with title and current latency */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-amber-400/80 text-sm font-semibold tracking-wider uppercase">
          Latence Réseau
        </h3>
        <span className={`text-sm font-semibold ${getCurrentLatencyColor(currentLatency)}`}>
          {currentLatency === null ? '--' : `${currentLatency} ms`}
        </span>
      </div>

      {/* Chart container - fixed height at 128px (h-32) */}
      <div className="h-32">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-parchment/60">&lt; 100ms</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="text-parchment/60">100-300ms</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-parchment/60">&gt; 300ms</span>
        </div>
      </div>
    </div>
  )
}
