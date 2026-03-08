import { useNavigate } from "@tanstack/react-router";
import { useServerStatus } from "#/features/server-status/hooks/useServerStatus";
import { useConfig } from "#/features/server-status/ConfigContext";
import { m } from "#/i18n/messages";

export function ServerName() {
  const { data } = useServerStatus();
  const navigate = useNavigate();
  const { apiDomain, serverDomain } = useConfig();

  if (!data) return null;

  return (
    <div className="text-center mb-6 pb-6 border-b border-stone-700/50">
      <h2 className="text-2xl md:text-3xl font-bold text-parchment font-['Cinzel_Decorative'] tracking-wide">
        {data.server_name}
      </h2>
      <button
        onClick={() =>
          navigate({
            to: "/",
            search: {
              api: apiDomain,
              server: serverDomain,
            },
          })
        }
        className="mt-3 text-xs text-parchment/50 hover:text-amber-400 transition-colors duration-200 flex items-center justify-center gap-1 mx-auto cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        {m.change_server_button()}
      </button>
    </div>
  );
}
