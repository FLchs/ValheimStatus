import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export interface LatencyDataPoint {
  timestamp: number;
  latency: number | null;
}

const MAX_DATA_POINTS = 300;
const PING_INTERVAL = 1000;

interface PingResult {
  latency: number | null;
  timestamp: number;
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

    return { latency, timestamp: Date.now() };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw err;
    }
    return { latency: null, timestamp: Date.now() };
  }
};

export const usePingLatency = () => {
  const [latencyData, setLatencyData] = useState<LatencyDataPoint[]>([]);

  const { isLoading, error, isError, data } = useQuery({
    queryKey: ["ping"],
    queryFn: ({ signal }) => measurePing(signal),
    refetchInterval: PING_INTERVAL,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setLatencyData((prev) => {
        const newData = [...prev, data];
        if (newData.length > MAX_DATA_POINTS) {
          return newData.slice(newData.length - MAX_DATA_POINTS);
        }
        return newData;
      });
    }
  }, [data]);

  const latestLatency = latencyData.length > 0
    ? latencyData[latencyData.length - 1].latency
    : null;

  return {
    latencyData,
    isLoading,
    error,
    isError,
    latestLatency,
  };
};
