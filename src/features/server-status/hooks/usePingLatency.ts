import { useQuery } from "@tanstack/react-query";
import { useConfig, buildStatusUrl } from "#/features/server-status/ConfigContext";

const PING_INTERVAL = 1000;

interface PingResult {
  latency: number | null;
}

const measurePing = async (domain: string, signal: AbortSignal): Promise<PingResult> => {
  const startTime = performance.now();

  try {
    const url = buildStatusUrl(domain);
    const response = await fetch(url, { signal, method: "HEAD" });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);

    return { latency };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw err;
    }
    return { latency: null };
  }
};

export const usePingLatency = (refreshInterval: number = PING_INTERVAL) => {
  const { apiDomain } = useConfig();
  const { data } = useQuery({
    queryKey: ["ping"],
    queryFn: ({ signal }) => measurePing(apiDomain, signal),
    refetchInterval: refreshInterval,
    retry: false,
    staleTime: Infinity,
  });

  return {
    latestLatency: data?.latency ?? null,
  };
};
