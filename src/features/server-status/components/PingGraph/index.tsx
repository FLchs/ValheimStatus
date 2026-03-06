import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  type ScriptableContext,
  type ChartData,
  type ChartDataset,
} from "chart.js";
import StreamingPlugin, { RealTimeScale } from "@aziham/chartjs-plugin-streaming";
import "chartjs-adapter-date-fns";
import { useMemo, useRef, useState } from "react";
import { usePingLatency } from "#/features/server-status/hooks/usePingLatency";
import { m } from "#/i18n/messages";
import { COLORS, STREAMING_DURATION, DEFAULT_REFRESH_INTERVAL, Y_AXIS_MIN_RANGE, Y_AXIS_ROUNDING, Y_SCALE_HYSTERESIS } from "./constants";
import { getLatencyColor, getCurrentLatencyColor } from "./utils";

function calculateDynamicYMax(currentMax: number, dataPoints: number[]): number {
  if (dataPoints.length === 0) return Y_AXIS_MIN_RANGE;

  const maxValue = Math.max(...dataPoints);
  const roundedMax = Math.ceil(maxValue / Y_AXIS_ROUNDING) * Y_AXIS_ROUNDING;
  const targetMax = Math.max(roundedMax, Y_AXIS_MIN_RANGE);

  const diff = Math.abs(targetMax - currentMax);
  if (diff < Y_SCALE_HYSTERESIS) {
    return currentMax;
  }

  return targetMax;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  StreamingPlugin,
  RealTimeScale,
);

export function PingGraph({
  refreshInterval = DEFAULT_REFRESH_INTERVAL,
}: {
  refreshInterval?: number;
}) {
  const { latestLatency } = usePingLatency(refreshInterval);
  const latencyRef = useRef(latestLatency);
  latencyRef.current = latestLatency;
  const [yAxisMax, setYAxisMax] = useState(Y_AXIS_MIN_RANGE);

  const chartData = useMemo<ChartData<"line", { x: number; y: number }[], unknown>>(
    () => ({
      datasets: [
        {
          label: m.network_latency(),
          data: [],
          borderColor: COLORS.BORDER,
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: (ctx: ScriptableContext<"line">) => {
            const raw = ctx.raw as { y?: number | null } | undefined;
            return getLatencyColor(raw?.y ?? null);
          },
          spanGaps: true,
        } as ChartDataset<"line", { x: number; y: number }[]>,
      ],
    }),
    [],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 },
      interaction: {
        mode: "nearest" as const,
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: {
          type: "realtime" as const,
          realtime: {
            duration: STREAMING_DURATION,
            refresh: refreshInterval,
            delay: 0,
            onRefresh: (chart: ChartJS) => {
              const latency = latencyRef.current;
              if (latency != null) {
                const dataset = chart.data.datasets[0];
                if (dataset) {
                  dataset.data.push({
                    x: Date.now(),
                    y: latency,
                  });

                  const dataPoints = (dataset.data as Array<{ x: number; y: number }>)
                    .map((point) => point.y)
                    .filter((y): y is number => y != null);

                  const newMax = calculateDynamicYMax(yAxisMax, dataPoints);
                  if (newMax !== yAxisMax) {
                    setYAxisMax(newMax);
                    if (chart.options.scales?.y) {
                      chart.options.scales.y.suggestedMax = newMax;
                    }
                  }
                }
              }
            },
          },
          grid: { color: "rgba(120, 113, 108, 0.2)" },
          ticks: {
            color: "rgba(231, 229, 228, 0.6)",
            font: { size: 10 },
            maxRotation: 0,
          },
          time: {
            displayFormats: {
              second: "HH:mm:ss",
              minute: "HH:mm:ss",
            },
          },
        },
        y: {
          beginAtZero: true,
          suggestedMax: yAxisMax,
          grid: { color: "rgba(120, 113, 108, 0.2)" },
          ticks: { color: "rgba(231, 229, 228, 0.6)", font: { size: 10 } },
        },
      },
    }),
    [refreshInterval, yAxisMax],
  );

  return (
    <div className="mt-6 bg-stone-900/60 border border-stone-700/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-amber-400/80 text-sm font-semibold tracking-wider uppercase">
          {m.network_latency()}
        </h3>
        <span className={`text-sm font-semibold ${getCurrentLatencyColor(latestLatency)}`}>
          {latestLatency == null ? m.latency_unknown() : m.latency_ms({ latency: latestLatency })}
        </span>
      </div>

      <div className="h-32">
        <Line data={chartData} options={options} />
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-parchment/60">{m.latency_legend_good()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="text-parchment/60">{m.latency_legend_medium()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-parchment/60">{m.latency_legend_poor()}</span>
        </div>
      </div>
    </div>
  );
}
