import { ref } from "vue"
import { ListProject } from "./listProjects"
import { SmartProject } from "./smartProject"

export type TasksSelector = ListProject | SmartProject
export enum TasksSelectorType {
  listProject = "listProject",
  smartProject = "smartProject",
}
const currentSelector = ref<TasksSelector>()
export function useTasksSelector() {
  async function setCurrentSelector(selector: TasksSelector) {
    currentSelector.value = selector
    // await updateTasks()
  }

  return {
    setCurrentSelector,
  }
}
