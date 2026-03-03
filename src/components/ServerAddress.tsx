import { m } from "../i18n/messages";

const ServerAddress = () => (
  <div className="bg-stone-900/50 rounded p-3 mb-6 text-center">
    <div className="text-xs text-parchment/40 uppercase mb-1">{m.server_address_label()}</div>
    <div className="text-xl font-bold text-amber-400 tracking-wider font-mono">
      valheim.flcloud.ovh
    </div>
  </div>
);

export default ServerAddress;
