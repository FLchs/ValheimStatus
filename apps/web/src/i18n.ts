import { detect, fromNavigator, fromStorage, fromUrl } from "@lingui/detect-locale";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { messages as enMessages } from "../locales/en/messages.js";
import { messages as frMessages } from "../locales/fr/messages.js";

// Supported locales
const locales = ["en", "fr"] as const;
type Locale = (typeof locales)[number];

// Load messages based on locale
const messages: Record<Locale, Messages> = {
  en: enMessages,
  fr: frMessages,
};

// Storage key for persisting language preference
const STORAGE_KEY = "valheim-language";

// Detect initial locale from multiple sources in order of priority:
// 1. URL parameter (?lang=fr)
// 2. Local storage (user's previous choice)
// 3. Browser language
// 4. Default to English
function detectLocale(): Locale {
  const detected = detect(
    fromUrl("lang"),
    fromStorage(STORAGE_KEY),
    fromNavigator(),
    () => "en", // default
  );

  // Ensure we return a valid locale
  const locale = detected?.split("-")[0]; // Convert 'en-US' to 'en'
  return locales.includes(locale as Locale) ? (locale as Locale) : "en";
}

// Create and configure i18n instance
export function createI18n(): I18n {
  const locale = detectLocale();

  return setupI18n({
    locale,
    messages: {
      [locale]: messages[locale],
    },
  });
}

// Get current locale
export function getLocale(): Locale {
  return (localStorage.getItem(STORAGE_KEY) as Locale) || detectLocale();
}

// Set locale and persist to localStorage
export function setLocale(i18n: I18n, locale: Locale): void {
  if (locales.includes(locale)) {
    i18n.loadAndActivate({ locale, messages: messages[locale] });
    localStorage.setItem(STORAGE_KEY, locale);
  }
}

// Check if locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get list of supported locales
export function getSupportedLocales(): readonly string[] {
  return locales;
}

export type { Locale };
