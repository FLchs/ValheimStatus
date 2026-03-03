import { m } from "../paraglide/messages.js";

const ServerFooter = () => (
  <div className="mt-6 pt-4 border-t border-stone-700/30 text-center">
    <p className="text-xs text-parchment/30">
      {m.designed_by()}{" "}
      <span className="text-amber-500/70 font-medium">François Lachèse</span>
    </p>
  </div>
);

export default ServerFooter;
