import { createContext, useContext, type ReactNode } from "react";

type Config = {
  apiDomain: string;
  serverDomain?: string;
};

export function normalizeApiDomain(url: string): string {
  // Remove https:// prefix
  let normalized = url.replace(/^https:\/\//, '');
  
  // Remove /status.json if it's the exact path
  normalized = normalized.replace(/\/status\.json$/, '');
  
  return normalized;
}

export function buildApiUrl(domain: string): string {
  // Add https:// prefix
  return `https://${domain}`;
}

export function buildStatusUrl(domain: string): string {
  // domain is normalized (no https://, no /status.json)
  // Build full URL with https:// and /status.json if no path
  return domain.includes('/') ? buildApiUrl(domain) : `${buildApiUrl(domain)}/status.json`;
}

function extractHostname(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return url;
  }
}

export const ConfigContext = createContext<Config | undefined>(undefined);

export function ConfigProvider({
  children,
  apiDomain,
  serverDomain,
}: Config & { children: ReactNode }) {
  // apiDomain comes from URL params, which is already normalized (no https://)
  // For serverDomain, extract hostname from the full apiDomain (which may include path)
  const normalizedApiDomain = normalizeApiDomain(apiDomain);
  const serverHost = serverDomain ?? extractHostname(normalizedApiDomain);
  
  return (
    <ConfigContext.Provider value={{ apiDomain: normalizedApiDomain, serverDomain: serverHost }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
}
