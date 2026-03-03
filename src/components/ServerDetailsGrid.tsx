import { useServerStatus } from "../hooks/useServerStatus";
import { m } from "../paraglide/messages.js";

const ServerDetailsGrid = () => {
  const { data } = useServerStatus();
  if (!data) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
      <div className="bg-stone-900/50 rounded p-3">
        <div className="text-xs text-parchment/40 uppercase mb-1">{m.platform_label()}</div>
        <div className="text-sm font-semibold text-parchment/70">
          {data.platform === "l" ? m.platform_linux() : data.platform}
        </div>
      </div>

      <div className="bg-stone-900/50 rounded p-3">
        <div className="text-xs text-parchment/40 uppercase mb-1">{m.server_type_label()}</div>
        <div className="text-sm font-semibold text-parchment/70">
          {data.server_type === "d" ? m.server_type_dedicated() : data.server_type}
        </div>
      </div>

      <div className="bg-stone-900/50 rounded p-3">
        <div className="text-xs text-parchment/40 uppercase mb-1">{m.password_label()}</div>
        <div className="text-sm font-semibold text-parchment/70">
          {data.password_protected ? m.yes() : m.no()}
        </div>
      </div>
    </div>
  );
};

export default ServerDetailsGrid;
