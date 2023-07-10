import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css"
import ContextMenu from "@imengyu/vue3-context-menu"
import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import { setupRouter } from "./router"
import "@unocss/reset/tailwind.css"
import "uno.css"
// import "virtual:unocss-devtools"
import "./style/overrides.css"
import { useDexieDB } from "./db"
;(async function setupApp() {
  const app = createApp(App).use(createPinia()).use(ContextMenu)
  useDexieDB().setupDB()
  setupRouter(app)
  // 这必须在安装之前放置在应用程序初始化的底部。
  resolveNaiveAndTailwindConflict()
  app.mount("#app")
})()

function resolveNaiveAndTailwindConflict() {
  const meta = document.createElement("meta")
  meta.name = "naive-ui-style"
  document.head.appendChild(meta)
}
