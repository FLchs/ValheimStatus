import { useServerStatus } from "../hooks/useServerStatus";
import { m } from "../../../i18n/messages";

export function ErrorBanner() {
  const { data, isLoading } = useServerStatus();

  if (isLoading || !data || data.error == null) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-950/90 border-2 border-red-700/50 rounded-lg p-6 mb-8 shadow-2xl shadow-red-900/50">
      <div className="flex items-start gap-4">
        <div className="text-5xl shrink-0">💀</div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-red-200 mb-2 font-['Cinzel_Decorative'] tracking-wider">
            {m.error_server_title()}
          </h2>
          <p className="text-red-100/80 text-sm mb-3">
            {m.error_server_message({ serverName: data.server_name })}
          </p>
        </div>
      </div>
    </div>
  );
}
