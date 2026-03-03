import { useServerStatus } from "../hooks/useServerStatus";

const ServerName = () => {
  const { data } = useServerStatus();
  if (!data) return null;

  return (
    <div className="text-center mb-6 pb-6 border-b border-stone-700/50">
      <h2 className="text-2xl md:text-3xl font-bold text-parchment font-['Cinzel_Decorative'] tracking-wide">
        {data.server_name}
      </h2>
    </div>
  );
};

export default ServerName;
