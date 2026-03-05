import { useQuery } from "@tanstack/react-query";
import { ServerStatusSchema, type ServerStatus } from "#/lib/types";
import { useConfig, buildStatusUrl } from "#/features/server-status/ConfigContext";

const fetchServerStatus = async (domain: string): Promise<ServerStatus> => {
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
