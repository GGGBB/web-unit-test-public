import { useCommand } from "@/composables/command"
import { useSearchCommands } from "../searchCommands"

describe("search commands", () => {
  beforeEach(() => {
    // 准备数据
    const { addCommand } = useCommand()
    addCommand({
      name: "回到主页",
      execute: () => {},
    })
    addCommand({
      name: "切换皮肤",
      execute: () => {},
    })
  })
  afterEach(() => {
    // 拆御
    const { resetCommand } = useCommand()
    resetCommand()
  })
  it("should be search a command by name", () => {
    // 准备数据
    const { searchCommands, filteredCommands, resetSearchCommands } =
      useSearchCommands()

    // 调用
    searchCommands("主页")

    // 验证
    expect(filteredCommands.value.length).toBe(1)
    expect(filteredCommands.value[0].name).toBe("回到主页")

    // 拆御
    resetSearchCommands()
  })

  it("should be search all command", () => {
    // 准备数据
    const { searchCommands, filteredCommands, resetSearchCommands } =
      useSearchCommands()

    // 调用
    searchCommands("")

    // 验证
    expect(filteredCommands.value.length).toBe(2)

    // 拆御
    resetSearchCommands()
  })
})
