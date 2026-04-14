import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
  base: process.env.NETLIFY === "true" ? "/" : "/Saurabh-Portfolio/",
  plugins: [react()],
  build: {
    outDir: "docs",
    assetsDir: "assets",
    sourcemap: false,
  },
  publicDir: "public",
}));
