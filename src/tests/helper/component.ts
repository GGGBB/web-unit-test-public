import { config, mount } from "@vue/test-utils"
import {
  createRouterMock,
  injectRouterMock,
  VueRouterMock,
} from "vue-router-mock"
import { vi } from "vitest"
function setupRouterMock() {
  const router = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockReset(),
    },
  })
  router.reset()
  injectRouterMock(router)
}

export function useSetup(setup: () => void) {
  setupRouterMock()
  config.plugins.VueWrapper.install(VueRouterMock)
  const Comp = {
    render() {},
    setup,
  }
  const wrapper = mount(Comp)
  return {
    wrapper,
    router: wrapper.router,
  }
}
