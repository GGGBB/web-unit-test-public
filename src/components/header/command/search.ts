import { delay } from "@/utils"
import { watchDebounced } from "@vueuse/core"
import { computed, ref, watch } from "vue"
import { useSearchTasks } from "./searchTasks"
import { useSearchCommands } from "./searchCommands"

const search = ref<string>("")
const loading = ref<boolean>(false)
const searching = ref<boolean>(false)
let isInitialized = false
export function useSearch() {
  const { searchTasks, resetSearchTasks } = useSearchTasks()
  const { searchCommands, resetSearchCommands } = useSearchCommands()
  function init() {
    if (isInitialized) return
    isInitialized = true
    watchDebounced(
      () => search.value,
      async (v) => {
        if (v) {
          loading.value = true
          await handleSearch(search.value)
          loading.value = false
          searching.value = true
        }
      },
      {
        debounce: 500,
      }
    )
    watch(
      () => search.value,
      (v) => {
        if (v.trim() === "") {
          resetSearch()
          resetSearchTasks()
          resetSearchCommands()
        }
      }
    )
  }

  const isSearchCommand = computed(() => search.value.trim().startsWith(">"))

  async function handleSearch(input: string) {
    if (isSearchCommand.value) {
      searchCommands(input.trim().slice(1))
    } else {
      await delay(2000)
      await searchTasks(input.trim())
    }
  }

  function resetSearch() {
    search.value = ""
    loading.value = false
    searching.value = false
  }
  init()
  return {
    search,
    loading,
    searching,
    resetSearch,
  }
}
