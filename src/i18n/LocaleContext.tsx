import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { setLocale, getLocale, type Locale } from "../i18n/runtime";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getLocale());

  const handleSetLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale !== locale) {
        // Update localStorage without reloading the page
        setLocale(newLocale, { reload: false });
        // Update React state to trigger re-render
        setLocaleState(newLocale);
      }
    },
    [locale],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
