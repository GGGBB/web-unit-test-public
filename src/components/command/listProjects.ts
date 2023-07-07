import { ref } from "vue"
import { TasksSelectorType, useTasksSelector } from "./tasksSelector"
import { fetchAllProjects } from "../../api"
import { ProjectResponse } from "../../api/types"
export interface ListProject {
  id: string
  name: string
  type: TasksSelectorType.listProject
}
const projects = ref<ListProject[]>([])

export function useListProjects() {
  const { setCurrentSelector } = useTasksSelector()
  async function init() {
    const rawProjects = await fetchAllProjects()
    projects.value = rawProjects.map(mapProjectResponseToProject)
    if (projects.value.length > 0) {
      setCurrentSelector(projects.value[0])
    }
  }
  function findProject(projectIdOrName: string): ListProject | undefined {
    return projects.value.find(
      (p) => p.name === projectIdOrName || p.id === projectIdOrName
    )
  }
  function mapProjectResponseToProject(
    rawProject: ProjectResponse
  ): ListProject {
    return {
      id: `${rawProject._id}`,
      name: rawProject.name,
      type: TasksSelectorType.listProject,
    }
  }
  return {
    init,
    findProject,
  }
}
