import { Command, useCommand } from "@/composables/command"
import { ref } from "vue"
import Fuse from "fuse.js"
const filteredCommands = ref<Command[]>([])
const fuse = new Fuse([] as Command[], {
  keys: ["name"],
})
export function useSearchCommands() {
  const { commands } = useCommand()
  function resetSearchCommands() {
    filteredCommands.value = []
  }
  function searchCommands(input: string) {
    if (!input) {
      searchAllCommands()
      return
    }
    fuse.setCollection(commands)
    filteredCommands.value = fuse.search(input).map((i) => i.item)
  }

  function searchAllCommands() {
    filteredCommands.value = commands
  }
  return { searchCommands, resetSearchCommands, filteredCommands }
}
