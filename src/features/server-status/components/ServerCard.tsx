import { useServerStatus } from "#/features/server-status/hooks/useServerStatus";
import { ErrorBanner } from "#/features/server-status/components/ErrorBanner";
import { JoinInstructions } from "#/features/server-status/components/JoinInstructions";
import { LoadingView } from "#/features/server-status/components/LoadingView";
import { PingGraph } from "#/features/server-status/components/PingGraph";
import { ServerAddress } from "#/features/server-status/components/ServerAddress";
import { ServerDetailsGrid } from "#/features/server-status/components/ServerDetailsGrid";
import { AppFooter } from "#/components/AppFooter";
import { ServerHeader } from "#/features/server-status/components/ServerHeader";
import { ServerName } from "#/features/server-status/components/ServerName";
import { ServerStatusGrid } from "#/features/server-status/components/ServerStatusGrid";

export function ServerCard() {
  const { data: serverData, isLoading: isStatusLoading } = useServerStatus();

  const isLoading = isStatusLoading;
  const hasError = serverData?.error != null;

  if (isLoading && !serverData) {
    return <LoadingView />;
  }

  if (!serverData) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <ServerHeader />

      {hasError && <ErrorBanner />}

      <div id="server-card-content" className="bg-gradient-to-b from-stone-900/80 to-stone-950/90 border-2 border-stone-700/50 rounded-xl px-6 pt-6 md:px-8 md:pt-8 shadow-2xl pb-2 shadow-black/50">
        <ServerName />
        <ServerStatusGrid />
        <ServerDetailsGrid />
        <ServerAddress />
        <PingGraph />
        <JoinInstructions />
        <AppFooter />
      </div>
    </div>
  );
}
