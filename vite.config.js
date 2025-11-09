import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/nominatim': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/nominatim/, ''),
        headers: {
          'User-Agent': 'farewise-react dev (support@farewise.example)',
          'Accept-Language': 'en',
          'Referer': 'http://localhost'
        }
      },
      '/api/osrm': {
        target: 'https://router.project-osrm.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/osrm/, ''),
        headers: {
          'User-Agent': 'farewise-react dev (support@farewise.example)'
        }
      }
    }
  }
})
