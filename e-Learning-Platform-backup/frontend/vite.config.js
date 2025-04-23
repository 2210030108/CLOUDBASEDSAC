import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// ✅ Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ Export Vite config
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ '@' now points to the 'src' directory
    },
  },
  plugins: [react()],
})
