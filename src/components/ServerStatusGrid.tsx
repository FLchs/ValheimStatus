import { useServerStatus } from "../hooks/useServerStatus";
import StatusIndicator from "./StatusIndicator";
import { m } from "../paraglide/messages.js";

const ServerStatusGrid = () => {
  const { data } = useServerStatus();
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-stone-800/40 border border-stone-700/30 rounded-lg p-4 text-center">
        <div className="text-xs text-parchment/50 uppercase tracking-wider mb-2">{m.status_label()}</div>
        <StatusIndicator />
      </div>

      <div className="bg-stone-800/40 border border-stone-700/30 rounded-lg p-4 text-center">
        <div className="text-xs text-parchment/50 uppercase tracking-wider mb-2">{m.players_label()}</div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">🛡️</span>
          <span className="text-2xl font-bold text-amber-400">{data.player_count}</span>
        </div>
      </div>

      <div className="bg-stone-800/40 border border-stone-700/30 rounded-lg p-4 text-center">
        <div className="text-xs text-parchment/50 uppercase tracking-wider mb-2">{m.port_label()}</div>
        <div className="text-xl font-bold text-parchment/80">{data.port}</div>
      </div>
    </div>
  );
};

export default ServerStatusGrid;
