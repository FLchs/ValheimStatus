import { useServerStatus } from "../hooks/useServerStatus";

const StatusIndicator = () => {
  const { data, isLoading } = useServerStatus();
  const hasError = isLoading || !data ? false : data.error != null;

  return (
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
};

export default StatusIndicator;
