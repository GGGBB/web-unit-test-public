import {
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHashHistory,
} from "vue-router"
import { RouteNames } from "./const"
import Task from "@/pages/Task.vue"
import { App } from "vue"
import { getDiscreteApi } from "@/composables/useNaiveDiscreteApi"
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/task",
    name: RouteNames.HOME,
  },
  { path: "/task", component: Task, name: RouteNames.TASK },
]

const setupRouterGuard = (router: Router) => {
  router.beforeEach(() => {
    getDiscreteApi().loadingBar.start()
  })
  router.afterEach(() => {
    getDiscreteApi().loadingBar.finish()
  })
}

export const setupRouter = async (app: App) => {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}