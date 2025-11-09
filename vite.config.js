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
          'User-Agent': 'FareWiseDev/1.0 (+https://github.com/Pakthapriyan/farewise-react; contact: pakthapriyan@example.com)',
          'Accept-Language': 'en',
          'Accept': 'application/json',
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
      },
      // Simple alias for Nominatim's /search endpoint
      '/api/geocode': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/geocode/, '/search'),
        headers: {
          'User-Agent': 'FareWiseDev/1.0 (+https://github.com/Pakthapriyan/farewise-react; contact: pakthapriyan@example.com)',
          'Accept-Language': 'en',
          'Accept': 'application/json',
          'Referer': 'http://localhost'
        }
      }
    }
  }
})
