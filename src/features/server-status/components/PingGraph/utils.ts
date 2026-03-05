import { COLORS, LATENCY_THRESHOLDS } from "./constants";

export const getLatencyColor = (latency: number | null): string => {
  if (latency == null) return COLORS.UNKNOWN;
  if (latency < LATENCY_THRESHOLDS.GOOD) return COLORS.GOOD;
  if (latency <= LATENCY_THRESHOLDS.MEDIUM) return COLORS.MEDIUM;
  return COLORS.POOR;
};

export const getCurrentLatencyColor = (latency: number | null): string => {
  if (latency == null) return "text-stone-500";
  if (latency < LATENCY_THRESHOLDS.GOOD) return "text-green-400";
  if (latency <= LATENCY_THRESHOLDS.MEDIUM) return "text-yellow-400";
  return "text-red-400";
};
