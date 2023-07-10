import * as ImportTest from "../testMock"
vi.mock("../testMock", async (importOriginal): Promise<typeof ImportTest> => {
  const mod = (await importOriginal()) as typeof ImportTest
  return {
    ...mod,
    useTestMock: () => {
      return {
        ...mod.useTestMock(),
        addCount: () => {
          return 3
        },
      }
    },
  }
})
describe("testMock", () => {
  it("should be ok", () => {
    const { addMessage, count } = ImportTest.useTestMock()
    addMessage()
    expect(count.value).toBe(3)
  })
})
