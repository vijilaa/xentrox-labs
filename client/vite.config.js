import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dev proxy: forwards /api/* to the local backend on port 5000.
    // This means in development VITE_API_URL is NOT needed — the
    // browser calls relative /api/... and Vite forwards them to localhost:5000.
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
