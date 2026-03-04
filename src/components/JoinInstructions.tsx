import { useConfig } from "../context/ConfigContext";
import { useServerStatus } from "../hooks/useServerStatus";
import { m } from "../i18n/messages";

const JoinInstructions = () => {
  const { data } = useServerStatus();
  if (!data) return null;

  const { serverDomain } = useConfig();

  return (
    <div className="mt-6 p-4 bg-stone-900/60 border border-stone-700/50 rounded-lg">
      <h3 className="text-amber-400/80 text-sm font-semibold mb-3 tracking-wider uppercase text-center">
        {m.join_instructions_title()}
      </h3>
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
