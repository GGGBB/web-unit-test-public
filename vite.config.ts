import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"
import path from "path"
import Unocss from "unocss/vite"

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
  },
  plugins: [vue(), Unocss()],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
})
