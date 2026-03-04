import { useQuery } from "@tanstack/react-query";

const PING_INTERVAL = 1000;

interface PingResult {
  latency: number | null;
}

const measurePing = async (signal: AbortSignal): Promise<PingResult> => {
  const startTime = performance.now();

  try {
    const response = await fetch("/status.json", { signal });

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
  const { data } = useQuery({
    queryKey: ["ping", refreshInterval],
    queryFn: ({ signal }) => measurePing(signal),
    refetchInterval: refreshInterval,
    retry: false,
    staleTime: Infinity,
  });

  return {
    latestLatency: data?.latency ?? null,
  };
};
