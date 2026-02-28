import { useServerStatus } from './useServerStatus'
import type { ServerStatus, Player } from './types'

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const LoadingView = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4">⚔️</div>
      <h1 className="text-2xl text-amber-400 font-bold tracking-wider">
        Summoning Server Spirits...
      </h1>
      <p className="text-parchment/60 mt-2 text-sm">
        The runes are aligning
      </p>
    </div>
  </div>
)

const ErrorBanner = ({ error, serverName }: { error: string; serverName: string }) => (
  <div className="bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-950/90 border-2 border-red-700/50 rounded-lg p-6 mb-8 shadow-2xl shadow-red-900/50">
    <div className="flex items-start gap-4">
      <div className="text-5xl shrink-0">💀</div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-red-200 mb-2 font-['Cinzel_Decorative'] tracking-wider">
          The Spirits Are Restless
        </h2>
        <p className="text-red-100/80 text-sm mb-3">
          The server <span className="text-amber-400 font-semibold">{serverName}</span> has encountered an ominous presence
        </p>
        <div className="bg-red-950/50 border border-red-800/50 rounded p-3">
          <p className="text-red-200 font-mono text-xs">{error}</p>
        </div>
      </div>
    </div>
  </div>
)

const StatusIndicator = ({ hasError }: { hasError: boolean }) => (
  <div className="flex items-center gap-3">
    <div 
      className={`w-4 h-4 rounded-full shadow-lg ${
        hasError 
          ? 'bg-red-600 shadow-red-600/50 animate-pulse' 
          : 'bg-green-600 shadow-green-600/50'
      }`}
    />
    <span className={`text-sm font-semibold tracking-wide ${
      hasError ? 'text-red-400' : 'text-green-400'
    }`}>
      {hasError ? 'Corrupted' : 'Online'}
    </span>
  </div>
)

const PlayerList = ({ players }: { players: Player[] }) => {
  if (players.length === 0) {
    return (
      <div className="mt-6 p-4 bg-stone-900/50 border border-stone-700/50 rounded-lg">
        <p className="text-parchment/50 text-center italic">
          No warriors present in this realm
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <h3 className="text-amber-400/80 text-sm font-semibold mb-3 tracking-wider uppercase">
        Warriors Present
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
  )
}

const ServerCard = ({ data }: { data: ServerStatus }) => {
  const hasError = data.error !== null

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🏰</div>
        <h1 className="text-3xl md:text-4xl font-bold text-amber-400 font-['Cinzel_Decorative'] tracking-wider drop-shadow-lg">
          Valheim Server
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-4" />
      </div>

      {/* Error Banner */}
      {hasError && <ErrorBanner error={data.error} serverName={data.server_name} />}

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
              Status
            </div>
            <StatusIndicator hasError={hasError} />
          </div>

          {/* Player Count */}
          <div className="bg-stone-800/40 border border-stone-700/30 rounded-lg p-4 text-center">
            <div className="text-xs text-parchment/50 uppercase tracking-wider mb-2">
              Warriors
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span className="text-2xl font-bold text-amber-400">
                {data.player_count}
              </span>
            </div>
          </div>

          {/* Port */}
          <div className="bg-stone-800/40 border border-stone-700/30 rounded-lg p-4 text-center">
            <div className="text-xs text-parchment/50 uppercase tracking-wider mb-2">
              Port
            </div>
            <div className="text-xl font-bold text-parchment/80">
              {data.port}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
          <div className="bg-stone-900/50 rounded p-3">
            <div className="text-xs text-parchment/40 uppercase mb-1">Platform</div>
            <div className="text-sm font-semibold text-parchment/70">{data.platform === 'l' ? 'Linux' : data.platform}</div>
          </div>
          <div className="bg-stone-900/50 rounded p-3">
            <div className="text-xs text-parchment/40 uppercase mb-1">Type</div>
            <div className="text-sm font-semibold text-parchment/70">{data.server_type === 'd' ? 'Dedicated' : data.server_type}</div>
          </div>
          <div className="bg-stone-900/50 rounded p-3">
            <div className="text-xs text-parchment/40 uppercase mb-1">Password</div>
            <div className="text-sm font-semibold text-parchment/70">{data.password_protected ? 'Yes' : 'No'}</div>
          </div>
          <div className="bg-stone-900/50 rounded p-3">
            <div className="text-xs text-parchment/40 uppercase mb-1">VAC</div>
            <div className="text-sm font-semibold text-parchment/70">{data.vac_enabled ? 'Enabled' : 'Disabled'}</div>
          </div>
        </div>

        {/* Player List */}
        <PlayerList players={data.players} />

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-700/50 text-center">
          <p className="text-xs text-parchment/40">
            Last updated: {formatDate(data.last_status_update)}
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const { data, isLoading, error } = useServerStatus()

  // Initial loading state - show medieval loading screen
  if (isLoading && !data) {
    return <LoadingView />
  }

  // Error state - show error in medieval style
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-950/90 border-2 border-red-700/50 rounded-lg p-8 max-w-lg text-center shadow-2xl shadow-red-900/50">
          <div className="text-6xl mb-4">💀</div>
          <h1 className="text-2xl font-bold text-red-200 mb-4 font-['Cinzel_Decorative'] tracking-wider">
            The Connection Has Failed
          </h1>
          <p className="text-red-100/80">
            The ancient runes cannot reach the server spirits
          </p>
          <div className="mt-4 bg-red-950/50 border border-red-800/50 rounded p-3">
            <p className="text-red-200 font-mono text-xs">{error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  // Show server status (with silent refresh - no loading indicators during refetch)
  if (data) {
    return <ServerCard data={data} />
  }

  return null
}

export default App
