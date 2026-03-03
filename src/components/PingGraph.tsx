import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { usePingLatency } from "../hooks/usePingLatency";
import { m } from "../paraglide/messages.js";
import { getLocale } from "../paraglide/runtime.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const getLatencyColor = (latency: number | null): string => {
  if (latency == null) return "#78716c";
  if (latency < 100) return "#4ade80";
  if (latency <= 300) return "#facc15";
  return "#f87171";
};

const getCurrentLatencyColor = (latency: number | null): string => {
  if (latency == null) return "text-stone-500";
  if (latency < 100) return "text-green-400";
  if (latency <= 300) return "text-yellow-400";
  return "text-red-400";
};

const options = {
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
      grid: { color: "rgba(120, 113, 108, 0.2)" },
      ticks: { color: "rgba(231, 229, 228, 0.6)", font: { size: 10 }, maxTicksLimit: 6 },
    },
    y: {
      beginAtZero: true,
      suggestedMax: 150,
      grid: { color: "rgba(120, 113, 108, 0.2)" },
      ticks: { color: "rgba(231, 229, 228, 0.6)", font: { size: 10 } },
    },
  },
};

const PingGraph = () => {
  const { latencyData } = usePingLatency();

  const currentLatency =
    latencyData.length > 0 ? latencyData[latencyData.length - 1].latency : null;

  const locale = getLocale();
  const timeLocale = locale === "fr" ? "fr-FR" : "en-US";

  const labels = latencyData.map((p) =>
    new Date(p.timestamp).toLocaleTimeString(timeLocale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  );

  const data = latencyData.map((p) => p.latency);
  const colors = data.map((lat) => getLatencyColor(lat));

  const chartData = {
    labels,
    datasets: [
      {
        label: m.network_latency(),
        data,
        borderColor: "#a8a29e",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: colors,
        spanGaps: true,
      },
    ],
  };

  return (
    <div className="mt-6 bg-stone-900/60 border border-stone-700/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-amber-400/80 text-sm font-semibold tracking-wider uppercase">
          {m.network_latency()}
        </h3>
        <span className={`text-sm font-semibold ${getCurrentLatencyColor(currentLatency)}`}>
          {currentLatency == null ? m.latency_unknown() : m.latency_ms({ latency: currentLatency })}
        </span>
      </div>

      <div className="h-32">
        <Line key={labels.length} data={chartData} options={options} />
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
};

export default PingGraph;
