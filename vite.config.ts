import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  server:
    mode === "development"
      ? {
          proxy: {
            "/status.json": {
              target: "https://valheim.flcloud.ovh",
              changeOrigin: true,
              secure: true,
            },
          },
        }
      : undefined,
}));
