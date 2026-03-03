import { useServerStatus } from "../hooks/useServerStatus";

const ServerDetailsGrid = () => {
  const { data } = useServerStatus();
  if (!data) return null;

  return (
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
  );
};

export default ServerDetailsGrid;
