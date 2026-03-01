import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // In development, use the proxy to avoid CORS issues
  // The API_URL env variable determines the target server
  // If empty, falls back to the production URL
  const apiUrl = process.env.VITE_API_URL || 'https://YOUR_SERVER_ADDRESS'
  
  return {
    plugins: [react(), tailwindcss()],
    server: mode === 'development' ? {
      proxy: {
        '/status.json': {
          target: apiUrl,
          changeOrigin: true,
          secure: true,
        },
      },
    } : undefined,
  }
})
