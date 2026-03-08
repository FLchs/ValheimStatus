import { useQuery } from "@tanstack/react-query";
import { ServerStatusSchema, type ServerStatus } from "#/lib/types";
import { useConfig, buildStatusUrl } from "#/features/server-status/ConfigContext";

const DEMO_DATA: ServerStatus = {
  last_status_update: new Date().toISOString(),
  error: null,
  server_name: "Demo Valheim Server",
  server_type: "d",
  platform: "l",
  player_count: 5,
  password_protected: true,
  port: 2456,
  keywords: "demo,test",
};

const fetchServerStatus = async (domain: string): Promise<ServerStatus> => {
  if (domain === "__demo__") {
    return ServerStatusSchema.parse({
      ...DEMO_DATA,
      last_status_update: new Date().toISOString(),
    });
  }

  const url = buildStatusUrl(domain);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return ServerStatusSchema.parse(data);
};

export const useServerStatus = () => {
  const { apiDomain } = useConfig();
  return useQuery({
    queryKey: ["server-status"],
    queryFn: () => fetchServerStatus(apiDomain),
    staleTime: 0,
    retry: 2,
  });
};
