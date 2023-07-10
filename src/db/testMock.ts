import { ref } from "vue"

const count = ref(0)

export function useTestMock() {
  function addCount() {
    return 1
  }
  function addMessage() {
    count.value += addCount()
  }
  return {
    addMessage,
    addCount,
    count,
  }
}
