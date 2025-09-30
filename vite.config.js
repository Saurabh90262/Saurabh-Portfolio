import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Use base path for GitHub Pages, root path for Netlify
  const base = process.env.NETLIFY === 'true' ? '/' : '/Saurabh-Portfolio/'
  
  return {
    base: base,
    plugins: [react()],
    build: {
      outDir: 'docs',
      assetsDir: 'assets',
      // Ensure source maps for debugging
      sourcemap: false,
    },
    publicDir: 'public',
  }
})