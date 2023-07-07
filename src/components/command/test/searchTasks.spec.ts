import { useSearchTasks } from "../searchTasks"
import { Task } from "../tasks"
import * as importTasks from "../tasks"
import * as importListProjects from "../listProjects"
import { completeSmartProject } from "../smartProject"
import { liveListProjects, tasks } from "../../../tests/fixture"

// 准备数据
const findAllTasksNotRemoved = vi.fn()
vi.mock("../tasks", async (importOriginal): Promise<typeof importTasks> => {
  const mod = (await importOriginal()) as typeof importTasks
  return {
    ...mod,
    useTasks: () => {
      return {
        findAllTasksNotRemoved,
      }
    },
  }
})
const findProject = vi.fn()
vi.mock(
  "../listProjects",
  async (importOriginal): Promise<typeof importListProjects> => {
    const mod = (await importOriginal()) as typeof importListProjects
    return {
      ...mod,
      useListProjects: () => {
        return {
          ...mod.useListProjects(),
          findProject,
        }
      },
    }
  }
)

describe("search tasks", () => {
  beforeEach(() => {
    // 准备数据
    vi.useFakeTimers()
    vi.mocked(findAllTasksNotRemoved).mockImplementation(
      (): Promise<Task[]> => {
        return Promise.resolve(tasks)
      }
    )
    vi.mocked(findProject).mockImplementation(
      (): importListProjects.ListProject => {
        return liveListProjects
      }
    )
  })
  afterEach(() => {
    // 拆御
    const { resetSearchTasks } = useSearchTasks()
    resetSearchTasks()
    vi.clearAllMocks()
    vi.useRealTimers()
  })
  it("should be search a task by title", async () => {
    // 准备数据
    const { searchTasks, filteredTasks } = useSearchTasks()

    // 调用
    searchTasks("吃饭")
    await vi.runAllTimersAsync()

    // 验证
    expect(filteredTasks.value.length).toBe(1)
    const item = filteredTasks.value[0].item
    expect(item.title).toBe("吃饭")
    expect(item).haveOwnProperty("id")
    expect(item).haveOwnProperty("desc")
    expect(item).haveOwnProperty("done")

    // 拆御
  })

  it("should be search a task by desc", async () => {
    // 准备数据
    const { searchTasks, filteredTasks } = useSearchTasks()

    // 调用
    searchTasks("去哪")
    await vi.runAllTimersAsync()

    // 验证
    expect(filteredTasks.value.length).toBe(1)

    // 拆御
  })
  it("should not be found when the task does not exist", async () => {
    // 准备数据
    const { searchTasks, filteredTasks } = useSearchTasks()

    // 调用
    searchTasks("运动")
    await vi.runAllTimersAsync()

    // 验证
    expect(filteredTasks.value.length).toBe(0)

    // 拆御
  })

  it("should be task's project is listProject when status is active", async () => {
    // 准备数据
    const { searchTasks, filteredTasks } = useSearchTasks()

    // 调用
    searchTasks("吃饭")
    await vi.runAllTimersAsync()

    // 验证
    expect(filteredTasks.value.length).toBe(1)
    expect(filteredTasks.value[0].item.done).toBe(false)
    expect(filteredTasks.value[0].item.from?.name).toBe("生活")

    // 拆御
  })

  it("should be task's project is completeSmartProject when status is complete", async () => {
    // 准备数据
    const { searchTasks, filteredTasks } = useSearchTasks()

    // 调用
    searchTasks("代码")
    await vi.runAllTimersAsync()

    // 验证
    expect(filteredTasks.value.length).toBe(1)
    expect(filteredTasks.value[0].item.done).toBe(true)
    expect(filteredTasks.value[0].item.from?.name).toBe(
      completeSmartProject.name
    )

    // 拆御
  })

  it("should be reset tasks", async () => {
    // 准备数据
    const { searchTasks, filteredTasks, resetSearchTasks } = useSearchTasks()

    // 调用
    searchTasks("代码")
    await vi.runAllTimersAsync()
    resetSearchTasks()

    // 验证
    expect(filteredTasks.value.length).toBe(0)

    // 拆御
  })
})
