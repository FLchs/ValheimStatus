import { m } from "#/i18n/messages";

export function LoadingView() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">⚔️</div>
        <h1 className="text-2xl text-amber-400 font-bold tracking-wider">
          {m.loading_title()}
        </h1>
        <p className="text-parchment/60 mt-2 text-sm">{m.loading_subtitle()}</p>
      </div>
    </div>
  );
}
