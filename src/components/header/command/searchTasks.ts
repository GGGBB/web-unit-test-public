import { ref } from "vue"
import Fuse from "fuse.js"
import { TaskStatus, useTasks } from "@/components/header/command/tasks"
import { TasksSelector } from "./tasksSelector"
import { useListProjects } from "./listProjects"
import { completeSmartProject } from "./smartProject"

interface SearchTaskItem {
  id: string
  title: string
  desc: string
  done: boolean
  from: TasksSelector | undefined
}
const fuse = new Fuse([] as SearchTaskItem[], {
  keys: ["title", "desc"],
})
const filteredTasks = ref<Fuse.FuseResult<SearchTaskItem>[]>([])
export function useSearchTasks() {
  async function searchTasks(input: string) {
    const { findAllTasksNotRemoved } = useTasks()
    const { findProject } = useListProjects()
    const tasks = await findAllTasksNotRemoved()
    const fuseTasks = tasks.map((task): SearchTaskItem => {
      const done = task.status === TaskStatus.COMPLETED
      const from = done ? completeSmartProject : findProject(task.projectId)
      return {
        id: task.id,
        title: task.title,
        desc: task.content,
        done,
        from: from,
      }
    })
    fuse.setCollection(fuseTasks)
    filteredTasks.value = fuse.search(input)
  }
  function resetSearchTasks() {
    filteredTasks.value = []
  }
  return { searchTasks, resetSearchTasks, filteredTasks }
}
