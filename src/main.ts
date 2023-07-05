import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css"
import ContextMenu from "@imengyu/vue3-context-menu"
import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import { setupRouter } from "./router"
import "@unocss/reset/tailwind.css"
import "uno.css"
import "virtual:unocss-devtools"
import "./style/overrides.css"
;(async function setupApp() {
  const app = createApp(App).use(createPinia()).use(ContextMenu)
  await setupRouter(app)
  // This must be placed at bottom of app initialization, before mount.
  // 这必须在安装之前放置在应用程序初始化的底部。
  resolveNaiveAndTailwindConflict()
  app.mount("#app")
})()

// https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
function resolveNaiveAndTailwindConflict() {
  // We use tailwind reset as Unocss reset
  // 我们使用tailwind重置作为 Unocss 重置

  // But some of reset style will replaced some of naive-ui style
  // 但是重置样式中的一些样式将替换一些naive-ui的样式

  // To following the docs, we need to do this.
  // 为了遵循文档，我们需要这样做。
  const meta = document.createElement("meta")
  meta.name = "naive-ui-style"
  document.head.appendChild(meta)
}
