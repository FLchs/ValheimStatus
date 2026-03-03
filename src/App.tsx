import { usePingLatency, type LatencyDataPoint } from "./usePingLatency";
import { PingGraph } from "./PingGraph";
import type { ServerStatus } from "./types";

const LoadingView = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4">⚔️</div>
      <h1 className="text-2xl text-amber-400 font-bold tracking-wider">
        Invocation des Esprits du Serveur...
      </h1>
      <p className="text-parchment/60 mt-2 text-sm">Les runes s'alignent</p>
    </div>
  </div>
);

const ErrorBanner = ({ serverName }: { serverName: string }) => (
  <div className="bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-950/90 border-2 border-red-700/50 rounded-lg p-6 mb-8 shadow-2xl shadow-red-900/50">
    <div className="flex items-start gap-4">
      <div className="text-5xl shrink-0">💀</div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-red-200 mb-2 font-['Cinzel_Decorative'] tracking-wider">
          Les Esprits sont Agités
        </h2>
        <p className="text-red-100/80 text-sm mb-3">
          Le serveur <span className="text-amber-400 font-semibold">{serverName}</span> a rencontré
          une présence sinistre
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
      {hasError ? "Corrompu" : "En Ligne"}
    </span>
  </div>
);

const ServerCard = ({
  data,
  latencyData,
}: {
  data: ServerStatus;
  latencyData: LatencyDataPoint[];
}) => {
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
            <div className="text-xs text-parchment/50 uppercase tracking-wider mb-2">État</div>
            <StatusIndicator hasError={hasError} />
          </div>

          {/* Player Count */}
          <div className="bg-stone-800/40 border border-stone-700/30 rounded-lg p-4 text-center">
            <div className="text-xs text-parchment/50 uppercase tracking-wider mb-2">Guerriers</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span className="text-2xl font-bold text-amber-400">{data.player_count}</span>
            </div>
          </div>

          {/* Port */}
          <div className="bg-stone-800/40 border border-stone-700/30 rounded-lg p-4 text-center">
            <div className="text-xs text-parchment/50 uppercase tracking-wider mb-2">Port</div>
            <div className="text-xl font-bold text-parchment/80">{data.port}</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div className="bg-stone-900/50 rounded p-3">
            <div className="text-xs text-parchment/40 uppercase mb-1">Plateforme</div>
            <div className="text-sm font-semibold text-parchment/70">
              {data.platform === "l" ? "Linux" : data.platform}
            </div>
          </div>
          <div className="bg-stone-900/50 rounded p-3">
            <div className="text-xs text-parchment/40 uppercase mb-1">Type</div>
            <div className="text-sm font-semibold text-parchment/70">
              {data.server_type === "d" ? "Dédié" : data.server_type}
            </div>
          </div>
          <div className="bg-stone-900/50 rounded p-3">
            <div className="text-xs text-parchment/40 uppercase mb-1">Mot de Passe</div>
            <div className="text-sm font-semibold text-parchment/70">
              {data.password_protected ? "Oui" : "Non"}
            </div>
          </div>
        </div>

        {/* Server Address */}
        <div className="bg-stone-900/50 rounded p-3 mb-6 text-center">
          <div className="text-xs text-parchment/40 uppercase mb-1">Adresse du Serveur</div>
          <div className="text-xl font-bold text-amber-400 tracking-wider font-mono">
            valheim.flcloud.ovh
          </div>
        </div>

        {/* Ping Graph */}
        <PingGraph latencyData={latencyData} />

        {/* How to Join Instructions */}
        <div className="mt-6 p-4 bg-stone-900/60 border border-stone-700/50 rounded-lg">
          <h3 className="text-amber-400/80 text-sm font-semibold mb-3 tracking-wider uppercase text-center">
            Comment Rejoindre
          </h3>
          <ol className="text-parchment/80 text-sm space-y-2 list-decimal list-inside">
            <li>Lancer Valheim</li>
            <li>Cliquer sur "Rejoindre une Partie" dans le menu principal</li>
            <li>Sélectionner l'onglet "Rejoindre par IP"</li>
            <li>
              Entrer :{" "}
              <span className="text-amber-400 font-bold tracking-wider font-mono">
                valheim.flcloud.ovh:{data.port}
              </span>
            </li>
            <li>Entrer le mot de passe si nécessaire</li>
            <li>Commencez votre aventure !</li>
          </ol>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-700/30 text-center">
          <p className="text-xs text-parchment/30">
            Conçu par <span className="text-amber-500/70 font-medium">François Lachèse</span>
          </p>
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
            La Connexion a Échoué
          </h1>
          <p className="text-red-100/80">
            Les anciennes runes ne peuvent pas atteindre les esprits du serveur
          </p>
        </div>
      </div>
    );
  }

  // Show server status (with silent refresh - no loading indicators during refetch)
  if (serverStatus) {
    return <ServerCard data={serverStatus} latencyData={latencyData} />;
  }

  return null;
}

export default App;
