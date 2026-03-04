export const LATENCY_THRESHOLDS = {
  GOOD: 100,
  MEDIUM: 300,
} as const;

export const COLORS = {
  GOOD: "#4ade80",
  MEDIUM: "#facc15",
  POOR: "#f87171",
  UNKNOWN: "#78716c",
  BORDER: "#a8a29e",
} as const;

export const STREAMING_DURATION = 60000;
export const Y_AXIS_MAX = 150;
export const DEFAULT_REFRESH_INTERVAL = 1000;
