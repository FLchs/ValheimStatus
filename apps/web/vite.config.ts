import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { lingui } from "@lingui/vite-plugin";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), "");

  // In development, use the proxy to avoid CORS issues
  // The API_URL env variable determines the target server
  // If empty, falls back to VITE_SERVER_ADDRESS from .env
  const apiUrl = env.VITE_API_URL || `https://${env.VITE_SERVER_ADDRESS}`;

  return {
    plugins: [
      react({
        babel: {
          plugins: ["@lingui/babel-plugin-lingui-macro"],
        },
      }),
      tailwindcss(),
      lingui(),
    ],
    server:
      mode === "development"
        ? {
            proxy: {
              "/status.json": {
                target: apiUrl,
                changeOrigin: true,
                secure: true,
              },
            },
          }
        : undefined,
  };
});
