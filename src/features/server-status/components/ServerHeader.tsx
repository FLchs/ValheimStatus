import { m } from "#/i18n/messages";

export function ServerHeader() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-amber-400 font-['Cinzel_Decorative'] tracking-wider drop-shadow-lg">
        {m.header_title()}
      </h1>
      <div className="h-1 w-32 bg-linear-to-r from-transparent via-amber-600 to-transparent mx-auto mt-4" />
    </div>
  );
}
