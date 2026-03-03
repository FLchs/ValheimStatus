import { setLocale, getLocale } from "../paraglide/runtime.js";
import { m } from "../paraglide/messages.js";

const LanguageSwitcher = () => {
  const currentLocale = getLocale();
  const targetLocale = currentLocale === "en" ? "fr" : "en";

  const handleSwitch = () => {
    setLocale(targetLocale);
  };

  return (
    <button
      onClick={handleSwitch}
      className="fixed top-4 right-4 z-50 px-3 py-1.5 bg-stone-800/80 hover:bg-stone-700/80 border border-stone-600/50 rounded-md text-xs text-parchment/70 hover:text-parchment transition-colors duration-200 flex items-center gap-2"
      aria-label={m.switch_language()}
    >
      <span className="font-medium">{currentLocale === "en" ? m.language_en() : m.language_fr()}</span>
      <span className="text-parchment/40">|</span>
      <span>{targetLocale === "en" ? m.language_en() : m.language_fr()}</span>
    </button>
  );
};

export default LanguageSwitcher;
