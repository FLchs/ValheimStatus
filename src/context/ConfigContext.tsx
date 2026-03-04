import { createContext, useContext, type ReactNode } from "react";

type Config = {
  apiDomain: string;
  serverDomain?: string;
};

export const ConfigContext = createContext<Config | undefined>(undefined);

export function ConfigProvider({
  children,
  apiDomain,
  serverDomain,
}: Config & { children: ReactNode }) {
  return (
    <ConfigContext.Provider value={{ apiDomain, serverDomain }}>{children}</ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
}
