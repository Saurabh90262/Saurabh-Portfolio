import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // This line is essential for GitHub Pages deployment
  base: '/Saurabh-Portfolio/', 
  plugins: [react()],
  // Add this to ensure proper asset handling
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
  },
  // Add this to handle public assets correctly
  publicDir: 'public',
})