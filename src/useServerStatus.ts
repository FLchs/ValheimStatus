import { useQuery } from "@tanstack/react-query";
import { ServerStatusSchema, type ServerStatus } from "./types";

const fetchServerStatus = async (): Promise<ServerStatus> => {
  const response = await fetch("/status.json");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return ServerStatusSchema.parse(data);
};

export const useServerStatus = () => {
  return useQuery({
    queryKey: ["server-status"],
    queryFn: fetchServerStatus,
    refetchInterval: 5000,
    staleTime: 0,
    retry: 2,
  });
};
