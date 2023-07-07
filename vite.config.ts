import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"
import Unocss from "unocss/vite"

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
  },
  plugins: [vue(), Unocss()],
})
