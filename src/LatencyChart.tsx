import { useMemo, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type Chart,
} from "chart.js";
import { Line } from "react-chartjs-2";
import StreamingPlugin from "chartjs-plugin-streaming";
import "chartjs-adapter-luxon";

// Register Chart.js components and streaming plugin
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  StreamingPlugin,
);

interface LatencyChartProps {
  latency: number | null;
}

const getCurrentLatencyColor = (latency: number | null): string => {
  if (latency === null) return "text-stone-500";
  if (latency < 100) return "text-green-400";
  if (latency <= 300) return "text-yellow-400";
  return "text-red-400";
};

const getPointColor = (latency: number | null): string => {
  if (latency === null) return "rgba(120, 113, 108, 0.6)";
  if (latency < 100) return "#4ade80";
  if (latency <= 300) return "#facc15";
  return "#f87171";
};

// Data point with per-point styling properties
type DataPoint = {
  x: number;
  y: number | null;
  pointBackgroundColor: string;
  pointBorderColor: string;
  pointRadius: number;
  pointHoverRadius: number;
};

export const LatencyChart = ({ latency }: LatencyChartProps) => {
  // Use ref to track current latency for onRefresh callback
  const latencyRef = useRef(latency);

  useEffect(() => {
    latencyRef.current = latency;
  }, [latency]);

  // Chart data with initial empty dataset
  const chartData = useMemo(
    () => ({
      datasets: [
        {
          label: "Latence",
          data: [] as DataPoint[],
          borderColor: "#a8a29e",
          backgroundColor: "transparent",
          borderWidth: 2,
          tension: 0.3,
          fill: false,
          spanGaps: false,
          // Enable per-point styling
          parsing: {
            xAxisKey: "x",
            yAxisKey: "y",
          },
        },
      ],
    }),
    [],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      parsing: false as const,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(20, 26, 22, 0.9)",
          titleColor: "#d4a853",
          bodyColor: "#e8dcc4",
          borderColor: "rgba(120, 113, 108, 0.3)",
          borderWidth: 1,
          padding: 8,
          titleFont: {
            family: "Cinzel, serif",
            size: 12,
          },
          bodyFont: {
            family: "Cinzel, serif",
            size: 12,
          },
          callbacks: {
            label: (context: { parsed: { y: number | null } }) => `${context.parsed.y ?? 0} ms`,
          },
        },
      },
      scales: {
        x: {
          type: "realtime" as const,
          realtime: {
            duration: 30000,
            refresh: 1000,
            delay: 1000,
            onRefresh: (chart: Chart) => {
              const currentLatency = latencyRef.current;
              const now = Date.now();
              const pointColor = getPointColor(currentLatency);
              const dataset = chart.data.datasets[0] as { data: DataPoint[] };

              dataset.data.push({
                x: now,
                y: currentLatency,
                pointBackgroundColor: pointColor,
                pointBorderColor: "transparent",
                pointRadius: 2,
                pointHoverRadius: 5,
              });
            },
          },
          grid: {
            color: "rgba(120, 113, 108, 0.2)",
            drawBorder: false,
          },
          ticks: {
            color: "rgba(231, 229, 228, 0.6)",
            font: {
              size: 10,
            },
          },
        },
        y: {
          min: 0,
          max: 150,
          grid: {
            color: "rgba(120, 113, 108, 0.2)",
            drawBorder: false,
          },
          ticks: {
            color: "rgba(231, 229, 228, 0.6)",
            font: {
              size: 10,
            },
            stepSize: 30,
            callback: (value: string | number) => `${value}ms`,
          },
          beginAtZero: true,
        },
      },
      interaction: {
        intersect: false,
        mode: "index" as const,
      },
      animation: {
        duration: 0,
      },
    }),
    [],
  );

  return (
    <div className="mt-6 border rounded-lg p-4 bg-stone-900/60 border-stone-700/50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-amber-400/80">
          Latence Réseau
        </h3>
        <span className={`text-sm font-semibold ${getCurrentLatencyColor(latency)}`}>
          {latency === null ? "--" : `${latency} ms`}
        </span>
      </div>

      <div className="h-32 relative overflow-hidden">
        <Line data={chartData} options={options} />
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4ade80" }} />
          <span className="text-parchment/60">&lt; 100ms</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#facc15" }} />
          <span className="text-parchment/60">100-300ms</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#f87171" }} />
          <span className="text-parchment/60">&gt; 300ms</span>
        </div>
      </div>
    </div>
  );
};
