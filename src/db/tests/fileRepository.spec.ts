import { useDexieDB } from ".."
import { useFileRepository } from "../fileRepository"

describe("db fileRepository", () => {
  beforeEach(async () => {
    // 准备数据
    vi.useFakeTimers()
    const { setupDB } = useDexieDB()
    await setupDB()
  })
  afterEach(async () => {
    // 拆御
    const { resetDB, closeDB } = useDexieDB()
    await resetDB()
    await closeDB()
    vi.clearAllMocks()
    vi.useRealTimers()
  })
  it("should not be save bufferContent when is same", async () => {
    // 准备数据
    const { putBufferContent, getAllBufferContents } = useFileRepository()

    // 调用
    await putBufferContent(new ArrayBuffer(100))
    await putBufferContent(new ArrayBuffer(100))
    await putBufferContent(new ArrayBuffer(999))
    await putBufferContent(new ArrayBuffer(999))

    // 验证
    const allBufferContents = await getAllBufferContents()
    expect(allBufferContents.length).toBe(2)

    // 拆御
  })

  it("should be get bufferContent by hashId", async () => {
    // 准备数据
    const {
      findBufferContentHashId,
      getBufferContentByHashId: getBufferContent,
      putFile: putFile,
    } = useFileRepository()

    // 调用
    await putFile("file122", new ArrayBuffer(122), "image/png")
    const bufferContentId = await findBufferContentHashId(new ArrayBuffer(122))
    const bufferContent = await getBufferContent(bufferContentId!)

    // 验证
    expect(bufferContent?.content.byteLength).toBe(122)

    // 拆御
  })

  it("should be save files", async () => {
    // 准备数据
    const { putFile, getAllFiles, getFileById } = useFileRepository()

    // 调用
    const fileId = await putFile("file01", new ArrayBuffer(88), "image/png")

    // 验证
    const files = await getAllFiles()
    expect(files.length).toBe(1)
    const file = await getFileById(fileId)
    expect(file.id).toBe("file01")
    expect(file.bufferContent.byteLength).toBe(88)

    // 拆御
  })
})
