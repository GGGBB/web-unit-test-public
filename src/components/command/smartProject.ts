import { TasksSelectorType } from "./tasksSelector"

export interface SmartProject {
  name: string
  type: TasksSelectorType.smartProject
}

function createSmartProject(name: string): SmartProject {
  return {
    name,
    type: TasksSelectorType.smartProject,
  }
}
export enum SmartProjectName {
  Complete = "已完成",
  Trash = "垃圾桶",
}
export const completeSmartProject = createSmartProject(
  SmartProjectName.Complete
)
export function useSmartProject() {
  return {}
}
