// import { http } from './http'
import { delay } from "@/utils"
import type { ProjectResponse } from "./types"

export async function fetchAllProjects(): Promise<ProjectResponse[]> {
  // return http.get<ProjectResponse[], ProjectResponse[]>('/projects')
  await delay()
  return Promise.resolve([
    {
      _id: "1",
      name: "Project 1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "2",
      name: "Project 2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ])
}

export function fetchCreateProject(name: string) {
  // return http.post<ProjectResponse, ProjectResponse>('/projects', {
  //   name,
  // })
}
