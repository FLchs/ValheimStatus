import { useServerStatus } from "../hooks/useServerStatus";
import ErrorBanner from "./ErrorBanner";
import JoinInstructions from "./JoinInstructions";
import LoadingView from "./LoadingView";
import PingGraph from "./PingGraph";
import ServerAddress from "./ServerAddress";
import ServerDetailsGrid from "./ServerDetailsGrid";
import ServerFooter from "./ServerFooter";
import ServerHeader from "./ServerHeader";
import ServerName from "./ServerName";
import ServerStatusGrid from "./ServerStatusGrid";

const ServerCard = () => {
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

      <div className="bg-gradient-to-b from-stone-900/80 to-stone-950/90 border-2 border-stone-700/50 rounded-xl p-6 md:p-8 shadow-2xl shadow-black/50">
        <ServerName />
        <ServerStatusGrid />
        <ServerDetailsGrid />
        <ServerAddress />
        <PingGraph />
        <JoinInstructions />
        <ServerFooter />
      </div>
    </div>
  );
};

export default ServerCard;
