import react from '@vitejs/plugin-react'
import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import svgr from "vite-plugin-svgr";
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
