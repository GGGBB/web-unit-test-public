import { Task, TaskStatus } from "@/components/header/command/tasks"

export const tasks: Task[] = [
  {
    id: "1",
    title: "吃饭",
    content: "今天去哪吃",
    status: TaskStatus.ACTIVE,
    projectId: "1",
    position: 1,
  },
  {
    id: "2",
    title: "代码",
    content: "今天写代码了吗",
    status: TaskStatus.COMPLETED,
    projectId: "1",
    position: 1,
  },
]
