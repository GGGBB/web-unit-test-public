import { computed } from "vue"
export function useIsMac() {
  return computed(() => {
    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) || false
  })
}
