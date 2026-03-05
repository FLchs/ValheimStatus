import { useConfig } from "../context/ConfigContext";
import { useServerStatus } from "../hooks/useServerStatus";
import { m } from "../i18n/messages";

const JoinInstructions = () => {
  const { data } = useServerStatus();
  if (!data) return null;

  const { serverDomain } = useConfig();
  const steamUrl = `steam://connect/${serverDomain}:${data.port}`;

  return (
    <div className="mt-6 p-4 bg-stone-900/60 border border-stone-700/50 rounded-lg">
      <h3 className="text-amber-400/80 text-sm font-semibold mb-3 tracking-wider uppercase text-center">
        {m.join_instructions_title()}
      </h3>

      <div className="flex justify-center mb-4">
        <a
          href={steamUrl}
          className="inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-b from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-parchment font-bold text-sm rounded-lg border-2 border-amber-500/50 shadow-lg shadow-amber-900/50 transition-all duration-200 hover:shadow-amber-700/50 hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
          </svg>
          {m.join_steam_button()}
        </a>
      </div>

      <div className="text-center mb-3">
        <span className="text-parchment/60 text-sm italic">{m.join_or_manual()}</span>
      </div>

      <ol className="text-parchment/80 text-sm space-y-2 list-decimal list-inside">
        <li>{m.join_step_1()}</li>
        <li>{m.join_step_2()}</li>
        <li>{m.join_step_3()}</li>
        <li>
          {m.join_step_4()}{" "}
          <span className="text-amber-400 font-bold tracking-wider font-mono">
            {serverDomain}:{data.port}
          </span>
        </li>
        <li>{m.join_step_5()}</li>
        <li>{m.join_step_6()}</li>
      </ol>
    </div>
  );
};

export default JoinInstructions;
