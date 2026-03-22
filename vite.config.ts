import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-project-dirs',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && req.url.match(/^\/projects\/[^/]+\/?$/) && !req.url.endsWith('.html')) {
            req.url = req.url.replace(/\/?$/, '/index.html')
          }
          next()
        })
      },
    },
  ],
  base: '/',
  server: {
    proxy: {
      '/api': 'http://localhost:3003',
    },
  },
})
