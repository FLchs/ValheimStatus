import { setLocale, getLocale } from "../i18n/runtime";
import { m } from "../i18n/messages";

const LanguageSwitcher = () => {
  const currentLocale = getLocale();

  const handleSwitch = (locale: "en" | "fr") => {
    if (locale !== currentLocale) {
      setLocale(locale);
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-3">
      <button
        onClick={() => handleSwitch("en")}
        className={`px-2 py-1 text-xs rounded-l-md transition-all duration-200 ${
          currentLocale === "en"
            ? "bg-amber-600/80 text-white font-medium"
            : "bg-stone-800/60 text-parchment/50 hover:text-parchment/70 hover:bg-stone-700/60"
        }`}
        aria-label={m.language_en()}
      >
        EN
      </button>
      <button
        onClick={() => handleSwitch("fr")}
        className={`px-2 py-1 text-xs rounded-r-md transition-all duration-200 ${
          currentLocale === "fr"
            ? "bg-amber-600/80 text-white font-medium"
            : "bg-stone-800/60 text-parchment/50 hover:text-parchment/70 hover:bg-stone-700/60"
        }`}
        aria-label={m.language_fr()}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
