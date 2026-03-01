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
import { StreamingPlugin } from "@aziham/chartjs-plugin-streaming";
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

// Type for our data point with color
type DataPoint = { x: number; y: number | null };

const getPointColor = (latency: number | null): string => {
  if (latency === null) return "rgba(120, 113, 108, 0.6)";
  if (latency < 100) return "#4ade80";
  if (latency <= 300) return "#facc15";
  return "#f87171";
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
          backgroundColor: "rgba(168, 162, 158, 0.1)",
          pointBackgroundColor: (context: { parsed: { y: number | null } }) => {
            return getPointColor(context.parsed?.y ?? null);
          },
          pointBorderColor: "transparent",
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          spanGaps: false,
        },
      ],
    }),
    [],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
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
            duration: 30000, // 30 seconds window
            refresh: 1000, // Refresh every second
            delay: 1000, // 1 second delay
            onRefresh: (chart: Chart) => {
              const currentLatency = latencyRef.current;
              const now = Date.now();
              const dataset = chart.data.datasets[0] as {
                data: DataPoint[];
              };

              // Push new data point
              dataset.data.push({
                x: now,
                y: currentLatency,
              });
            },
          },
          grid: {
            color: "rgba(120, 113, 108, 0.2)",
            drawBorder: false,
          },
          ticks: {
            display: false,
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
        duration: 0, // Disable animation for smooth streaming
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
          <span className="text-parchment/60">Bonne (&lt; 100ms)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#facc15" }} />
          <span className="text-parchment/60">Moyenne (100-300ms)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#f87171" }} />
          <span className="text-parchment/60">Mauvaise (&gt; 300ms)</span>
        </div>
      </div>
    </div>
  );
};
