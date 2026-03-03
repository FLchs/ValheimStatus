import { useServerStatus } from "../hooks/useServerStatus";

const ErrorBanner = () => {
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
            Les Esprits sont Agités
          </h2>
          <p className="text-red-100/80 text-sm mb-3">
            Le serveur <span className="text-amber-400 font-semibold">{data.server_name}</span> a rencontré
            une présence sinistre
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;
