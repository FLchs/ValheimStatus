import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Theme = "medieval" | "synthwave" | "hugo-boss" | "royal" | "caesar";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const STORAGE_KEY = "valheim-theme";
const DEFAULT_THEME: Theme = "medieval";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored && ["medieval", "synthwave", "hugo-boss", "royal", "caesar"].includes(stored)) {
    return stored;
  }
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSetTheme = useCallback((newTheme: Theme) => {
    if (newTheme !== theme) {
      localStorage.setItem(STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
