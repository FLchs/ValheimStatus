import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { usePingLatency } from "./usePingLatency";
import { LatencyChart } from "./LatencyChart";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import type { ServerStatus, Player } from "./types";

const LoadingView = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4">⚔️</div>
      <h1 className="text-2xl text-amber-400 font-bold tracking-wider">
        <Trans>Invoking the Server Spirits...</Trans>
      </h1>
      <p className="text-parchment/60 mt-2 text-sm">
        <Trans>The runes are aligning</Trans>
      </p>
    </div>
  </div>
);

const ErrorBanner = ({ serverName }: { serverName: string }) => (
  <div className="bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-950/90 border-2 border-red-700/50 rounded-lg p-6 mb-8 shadow-2xl shadow-red-900/50">
    <div className="flex items-start gap-4">
      <div className="text-5xl shrink-0">💀</div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-red-200 mb-2 font-['Cinzel_Decorative'] tracking-wider">
          <Trans>The Spirits are Restless</Trans>
        </h2>
        <p className="text-red-100/80 text-sm mb-3">
          <Trans>
            The server <span className="text-amber-400 font-semibold">{serverName}</span> has encountered
            a sinister presence
          </Trans>
        </p>
      </div>
    </div>
  </div>
);

const StatusIndicator = ({ hasError }: { hasError: boolean }) => (
  <div className="flex items-center justify-center gap-2">
    <div
      className={`w-4 h-4 rounded-full shadow-lg ${
        hasError ? "bg-red-600 shadow-red-600/50" : "bg-green-600 shadow-green-600/50 animate-pulse"
      }`}
    />
    <span
      className={`text-sm font-semibold tracking-wide ${
        hasError ? "text-red-400" : "text-green-400"
      }`}
    >
      {hasError ? <Trans>Corrupted</Trans> : <Trans>Online</Trans>}
    </span>
  </div>
);

const PlayerList = ({ players }: { players: Player[] }) => {
  if (players.length === 0) {
    return (
      <div className="mt-6 p-4 bg-stone-900/50 border border-stone-700/50 rounded-lg">
        <p className="text-parchment/50 text-center italic">
          <Trans>No warriors present in this realm</Trans>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-amber-400/80 text-sm font-semibold mb-3 tracking-wider uppercase">
        <Trans>Warriors Present</Trans>
      </h3>
      <div className="bg-stone-900/30 border border-stone-700/30 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {players.map((player, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-stone-800/50 rounded border border-stone-700/30"
            >
              <span className="text-amber-500">⚔️</span>
              <span className="text-parchment/90 text-sm">{player.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServerCard = ({ data, currentLatency }: { data: ServerStatus; currentLatency: number | null }) => {
  const { i18n } = useLingui();
  const hasError = data.error !== null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-400 font-['Cinzel_Decorative'] tracking-wider drop-shadow-lg">
          Valheim Server
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-4" />
      </div>

      {/* Error Banner */}
      {hasError && <ErrorBanner serverName={data.server_name} />}

      {/* Main Status Card */}
      <div className="bg-gradient-to-b from-stone-900/80 to-stone-950/90 border-2 border-stone-700/50 rounded-xl p-6 md:p-8 shadow-2xl shadow-black/50">
        {/* Server Name */}
        <div className="text-center mb-6 pb-6 border-b border-stone-700/50">
          <h2 className="text-2xl md:text-3xl font-bold text-parchment font-['Cinzel_Decorative'] tracking-wide">
            {data.server_name}
          </h2>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Status */}
          <div className="bg-stone-800/40 border border-stone-700/30 rounded-lg p-4 text-center">
            <div className="text-xs text-parchment/50 uppercase tracking-wider mb-2">
              <Trans>Status</Trans>
            </div>
            <StatusIndicator hasError={hasError} />
          </div>

          {/* Player Count */}
          <div className="bg-stone-800/40 border border-stone-700/30 rounded-lg p-4 text-center">
            <div className="text-xs text-parchment/50 uppercase tracking-wider mb-2">
              <Trans>Warriors</Trans>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span className="text-2xl font-bold text-amber-400">{data.player_count}</span>
            </div>
          </div>

          {/* Port */}
          <div className="bg-stone-800/40 border border-stone-700/30 rounded-lg p-4 text-center">
            <div className="text-xs text-parchment/50 uppercase tracking-wider mb-2">
              <Trans>Port</Trans>
            </div>
            <div className="text-xl font-bold text-parchment/80">{data.port}</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div className="bg-stone-900/50 rounded p-3">
            <div className="text-xs text-parchment/40 uppercase mb-1">
              <Trans>Platform</Trans>
            </div>
            <div className="text-sm font-semibold text-parchment/70">
              {data.platform === "l" ? t(i18n)`Linux` : data.platform}
            </div>
          </div>
          <div className="bg-stone-900/50 rounded p-3">
            <div className="text-xs text-parchment/40 uppercase mb-1">
              <Trans>Type</Trans>
            </div>
            <div className="text-sm font-semibold text-parchment/70">
              {data.server_type === "d" ? t(i18n)`Dedicated` : data.server_type}
            </div>
          </div>
          <div className="bg-stone-900/50 rounded p-3">
            <div className="text-xs text-parchment/40 uppercase mb-1">
              <Trans>Password</Trans>
            </div>
            <div className="text-sm font-semibold text-parchment/70">
              {data.password_protected ? t(i18n)`Yes` : t(i18n)`No`}
            </div>
          </div>
        </div>

        {/* Server Address */}
        <div className="bg-stone-900/50 rounded p-3 mb-6 text-center">
          <div className="text-xs text-parchment/40 uppercase mb-1">
            <Trans>Server Address</Trans>
          </div>
          <div className="text-xl font-bold text-amber-400 tracking-wider font-mono">
            {import.meta.env.VITE_SERVER_ADDRESS}
          </div>
        </div>

        {/* Ping Graph */}
        <LatencyChart latency={currentLatency} />

        {/* Player List */}
        <PlayerList players={data.players} />

        {/* How to Join Instructions */}
        <div className="mt-6 p-4 bg-stone-900/60 border border-stone-700/50 rounded-lg">
          <h3 className="text-amber-400/80 text-sm font-semibold mb-3 tracking-wider uppercase text-center">
            <Trans>How to Join</Trans>
          </h3>
          <ol className="text-parchment/80 text-sm space-y-2 list-decimal list-inside">
            <li><Trans>Launch Valheim</Trans></li>
            <li><Trans>Click "Join Game" in the main menu</Trans></li>
            <li><Trans>Select the "Join by IP" tab</Trans></li>
            <li>
              <Trans>
                Enter: <span className="text-amber-400 font-bold tracking-wider font-mono">{import.meta.env.VITE_SERVER_ADDRESS}:{data.port}</span>
              </Trans>
            </li>
            <li><Trans>Enter password if required</Trans></li>
            <li><Trans>Begin your adventure!</Trans></li>
          </ol>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-700/30 text-center space-y-4">
          <p className="text-xs text-parchment/30">
            <a href="https://github.com/FLchs/ValheimStatus" target="_blank" rel="noopener noreferrer" className="text-amber-500/70 hover:text-amber-400 transition-colors">
              github.com/FLchs/ValheimStatus
            </a>
          </p>
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const { latencyData, serverStatus, isLoading, error } = usePingLatency();

  // Initial loading state - show medieval loading screen
  if (isLoading && !serverStatus) {
    return <LoadingView />;
  }

  // Error state - show error in medieval style
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-950/90 border-2 border-red-700/50 rounded-lg p-8 max-w-lg text-center shadow-2xl shadow-red-900/50">
          <div className="text-6xl mb-4">💀</div>
          <h1 className="text-2xl font-bold text-red-200 mb-4 font-['Cinzel_Decorative'] tracking-wider">
            <Trans>Connection Failed</Trans>
          </h1>
          <p className="text-red-100/80">
            <Trans>The ancient runes cannot reach the server spirits</Trans>
          </p>
        </div>
      </div>
    );
  }

  // Show server status (with silent refresh - no loading indicators during refetch)
  if (serverStatus) {
    const currentLatency = latencyData.length > 0 ? latencyData[latencyData.length - 1].latency : null;
    return <ServerCard data={serverStatus} currentLatency={currentLatency} />;
  }

  return null;
}

export default App;
