import { useIsMac } from "../../composables/misc"
import { onMounted, onUnmounted, ref } from "vue"

const showCommandModal = ref<boolean>(false)

export function useCommandModal() {
  function openCommandModal() {
    showCommandModal.value = true
  }
  function closeCommandModal() {
    resetCommandModal()
  }
  function resetCommandModal() {
    showCommandModal.value = false
  }
  function registerKeyboardShortcut() {
    const isMac = useIsMac()
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === "k" && (isMac.value ? e.metaKey : e.ctrlKey)) {
        e.preventDefault()
        openCommandModal()
      }
    }
    onMounted(() => {
      window.addEventListener("keydown", keydownHandler)
    })
    onUnmounted(() => {
      window.removeEventListener("keydown", keydownHandler)
    })
  }
  return {
    showCommandModal,
    openCommandModal,
    closeCommandModal,
    resetCommandModal,
    registerKeyboardShortcut,
  }
}
