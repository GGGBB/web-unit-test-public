import { delay } from "../../utils"

export enum TaskStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
}

export interface Task {
  id: string
  title: string
  content: string
  status: TaskStatus
  projectId: string
  position: number
}

const tasks: Task[] = [
  {
    id: "1",
    title: "吃饭",
    content: "今天吃什么饭",
    status: TaskStatus.ACTIVE,
    projectId: "1",
    position: 1,
  },
  {
    id: "2",
    title: "吃粥",
    content: "今天吃什么粥",
    status: TaskStatus.ACTIVE,
    projectId: "2",
    position: 2,
  },
]
export function useTasks() {
  async function findAllTasksNotRemoved() {
    await delay()
    return [...tasks]
  }
  return { findAllTasksNotRemoved }
}
