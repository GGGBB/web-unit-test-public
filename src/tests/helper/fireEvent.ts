export const fireEvent = {
  keyDown: (keyboardEventInit: KeyboardEventInit) => {
    window.dispatchEvent(new KeyboardEvent("keydown", keyboardEventInit))
  },
}
