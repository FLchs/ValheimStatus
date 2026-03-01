import { useLingui } from "@lingui/react";
import { setLocale, type Locale, getSupportedLocales } from "../i18n.ts";

export function LanguageSwitcher() {
  const { i18n } = useLingui();
  const currentLocale = i18n.locale as Locale;
  const locales = getSupportedLocales() as Locale[];

  const handleChange = (locale: Locale) => {
    if (locale !== currentLocale) {
      setLocale(i18n, locale);
    }
  };

  return (
    <div className="flex items-center gap-1 bg-stone-900/30 rounded-full px-1.5 py-1 border border-stone-700/30">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
            currentLocale === locale
              ? "bg-stone-700/80 text-amber-400 shadow-sm"
              : "text-parchment/50 hover:text-parchment/70 hover:bg-stone-800/50"
          }`}
          aria-label={`Switch to ${locale}`}
          aria-pressed={currentLocale === locale}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
