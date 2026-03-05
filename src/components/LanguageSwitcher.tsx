import { m } from "#/i18n/messages";
import { useLocale } from "#/i18n/LocaleContext";

export function LanguageSwitcher() {
  const { locale: currentLocale, setLocale } = useLocale();

  const handleSwitch = (locale: "en" | "fr") => {
    if (locale !== currentLocale) {
      setLocale(locale);
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-3">
      <button
        type="button"
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
        type="button"
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
}
