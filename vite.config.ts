import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    paraglideVitePlugin({
      project: "./.inlang",
      outdir: "./src/paraglide",
      strategy: ["localStorage", "preferredLanguage", "baseLocale"],
    }),
  ],
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
