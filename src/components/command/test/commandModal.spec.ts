import { fireEvent, useSetup } from "../../../tests/helper"
import { useCommandModal } from "../commandModal"
import * as misc from "../../../composables/misc"
import { computed } from "vue"

describe("command modal", () => {
  beforeEach(() => {
    const { resetCommandModal } = useCommandModal()
    resetCommandModal()
  })
  it("should be open command modal", () => {
    const { openCommandModal, showCommandModal } = useCommandModal()
    openCommandModal()
    expect(showCommandModal.value).toBe(true)
  })

  it("should be close command modal", () => {
    const { openCommandModal, closeCommandModal, showCommandModal } =
      useCommandModal()

    openCommandModal()
    closeCommandModal()
    expect(showCommandModal.value).toBe(false)
  })
  it("should be close command modal when press cmd+k on Mac", () => {
    vi.spyOn(misc, "useIsMac").mockImplementation(() => {
      return computed(() => true)
    })
    const { registerKeyboardShortcut, showCommandModal } = useCommandModal()
    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })
    fireEvent.keyDown({ metaKey: true, key: "k" })
    expect(showCommandModal.value).toBe(true)

    wrapper.unmount()
  })

  it("should be close command modal when press ctrl+k on Win", () => {
    vi.spyOn(misc, "useIsMac").mockImplementation(() => {
      return computed(() => false)
    })
    const { registerKeyboardShortcut, showCommandModal } = useCommandModal()
    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })
    fireEvent.keyDown({ ctrlKey: true, key: "k" })
    expect(showCommandModal.value).toBe(true)

    wrapper.unmount()
  })
})
