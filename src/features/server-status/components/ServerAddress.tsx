import { useConfig } from "#/features/server-status/ConfigContext";
import { useServerStatus } from "#/features/server-status/hooks/useServerStatus";
import { m } from "#/i18n/messages";

export function ServerAddress() {
  const { serverDomain } = useConfig();
  const { data } = useServerStatus();
  return (
    <div className="bg-stone-900/50 rounded p-3 mb-6 text-center">
      <div className="text-xs text-parchment/40 uppercase mb-1">{m.server_address_label()}</div>
      <div className="text-xl font-bold text-amber-400 tracking-wider font-mono">
        {serverDomain}:{data?.port}
      </div>
    </div>
  );
}
