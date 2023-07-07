import { useSetup } from "@/tests/helper"
import { GITHUB_URL, openGithub, useGoto } from "@/composables"
import { RouteNames } from "@/router/const"

describe("goto", () => {
  it("should be go to home page", () => {
    const { router } = useSetup(() => {
      const { gotoHome } = useGoto()
      gotoHome()
    })
    expect(router.push).toBeCalledWith({ name: RouteNames.HOME })
  })

  it("should be go to Settings page", () => {
    const { router } = useSetup(() => {
      const { gotoSettings } = useGoto()
      gotoSettings()
    })
    expect(router.push).toBeCalledWith({ name: RouteNames.SETTINGS })
  })

  it("should be open github", () => {
    window.open = vi.fn()
    openGithub()
    expect(window.open).toBeCalledWith(GITHUB_URL)
  })
})
