import { useServerStatus } from "../hooks/useServerStatus";

const JoinInstructions = () => {
  const { data } = useServerStatus();
  if (!data) return null;

  return (
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
  );
};

export default JoinInstructions;
