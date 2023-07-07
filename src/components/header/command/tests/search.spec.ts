import { useSearch } from "../search"
import * as importSearchTasks from "../searchTasks"
import * as importSearchCommands from "../searchCommands"

// 准备数据
const searchTasks = vi.fn()
const resetSearchTasks = vi.fn()
vi.mock(
  "../searchTasks",
  async (importOriginal): Promise<typeof importSearchTasks> => {
    const mod = (await importOriginal()) as typeof importSearchTasks
    return {
      useSearchTasks: () => {
        return {
          ...mod.useSearchTasks(),
          searchTasks,
          resetSearchTasks,
        }
      },
    }
  }
)
const searchCommands = vi.fn()
const resetSearchCommands = vi.fn()
vi.mock("../searchCommands", async (): Promise<typeof importSearchCommands> => {
  return {
    useSearchCommands: () => {
      return {
        searchCommands,
        resetSearchCommands,
      }
    },
  }
})

describe("search", () => {
  beforeEach(async () => {
    // 准备数据
    vi.useFakeTimers()
  })
  afterEach(async () => {
    // 拆御
    const { resetSearch } = useSearch()
    resetSearch()
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  it("should be loading is true when search is start", async () => {
    // 准备数据
    const { search, loading, resetSearch } = useSearch()

    // 调用
    search.value = "吃饭"
    await vi.advanceTimersToNextTimerAsync()

    // 验证
    expect(loading.value).toBe(true)

    // 拆御
    resetSearch()
  })

  it("should be loading is false when search is complete", async () => {
    // 准备数据
    const { search, loading, resetSearch } = useSearch()

    // 调用
    search.value = "吃饭"
    await vi.runAllTimersAsync()

    // 验证
    expect(loading.value).toBe(false)

    // 拆御
    resetSearch()
  })

  it("should be searching is true when search is complete", async () => {
    // 准备数据
    const { search, searching, resetSearch } = useSearch()

    // 调用
    search.value = "吃饭"
    await vi.runAllTimersAsync()

    // 验证
    expect(searching.value).toBe(true)

    // 拆御
    resetSearch()
  })

  it("should be search tasks  and Removes the trailing white space", async () => {
    // 准备数据
    const { search, resetSearch } = useSearch()

    // 调用
    search.value = "吃饭"
    await vi.runAllTimersAsync()

    // 验证
    expect(searchTasks).toBeCalledWith("吃饭")
    expect(searchTasks).toBeCalledTimes(1)

    // 拆御
    resetSearch()
  })

  it("should be search commands and Removes the trailing white space", async () => {
    // 准备数据
    const { search, resetSearch } = useSearch()

    // 调用
    search.value = ">主页"
    await vi.runAllTimersAsync()

    // 验证
    expect(searchCommands).toBeCalledWith("主页")
    expect(searchCommands).toBeCalledTimes(1)

    // 拆御
    resetSearch()
  })

  it("should be reset when search is empty", async () => {
    // 准备数据
    const { search, loading, searching, resetSearch } = useSearch()
    // // 调用
    search.value = "吃饭"
    await vi.runAllTimersAsync()
    expect(resetSearchTasks).toBeCalledTimes(0)
    search.value = ""
    await vi.runAllTimersAsync()

    // 验证
    expect(loading.value).toBe(false)
    expect(searching.value).toBe(false)
    expect(resetSearchTasks).toBeCalledTimes(1)
    expect(resetSearchCommands).toBeCalledTimes(1)

    // 拆御
    resetSearch()
  })
})
