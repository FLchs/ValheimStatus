import { m } from "../paraglide/messages.js";

const ErrorState = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-950/90 border-2 border-red-700/50 rounded-lg p-8 max-w-lg text-center shadow-2xl shadow-red-900/50">
      <div className="text-6xl mb-4">💀</div>
      <h1 className="text-2xl font-bold text-red-200 mb-4 font-['Cinzel_Decorative'] tracking-wider">
        {m.error_connection_title()}
      </h1>
      <p className="text-red-100/80">
        {m.error_connection_message()}
      </p>
    </div>
  </div>
);

export default ErrorState;
