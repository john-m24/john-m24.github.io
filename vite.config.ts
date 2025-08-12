import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/john-m24.github.io/', // Your repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
