import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"
import Unocss from "unocss/vite"

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    testTimeout: 1000 * 60 * 5,
  },
  plugins: [vue(), Unocss()],
  server: {
    port: 8111,
    host: "192.168.2.6",
  },
})
