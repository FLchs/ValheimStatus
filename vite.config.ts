import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Get the default server URL from environment variable or use a fallback
  const defaultServerUrl = process.env.VITE_DEFAULT_SERVER_URL || 'https://YOUR_SERVER_ADDRESS'
  
  return {
    plugins: [react(), tailwindcss()],
    server: mode === 'development' ? {
      proxy: {
        '/status.json': {
          target: defaultServerUrl,
          changeOrigin: true,
          secure: true,
        },
      },
    } : undefined,
  }
})
