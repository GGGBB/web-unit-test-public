import { generateHashByBuffer, generateHashByString } from "../utils"
import { IBufferContent, IFile, useDexieDB } from "."
import { ref } from "vue"
import { getFileBufferByUrl } from "src/api"

export interface IPlayItem {
  videoId: string
  url: string
  hashId: string
  type: string
}

export interface IFilterPlayItem extends IPlayItem {
  localUrl: string
}

let filterPlayList = ref<IFilterPlayItem[]>([])

export function useFileRepository() {
  const { getDB } = useDexieDB()

  async function putBufferContent(content: ArrayBuffer) {
    const db = await getDB()
    const newBufferContent: IBufferContent = {
      content,
    }
    const hashId = generateHashByBuffer(content)
    await db.tablesMap.bufferContents.put({
      id: hashId,
      ...newBufferContent,
    })
    return hashId
  }

  async function getBufferContentByHashId(id: string) {
    const db = await getDB()
    const bufferContent = await db.tablesMap.bufferContents.get({ id })
    if (!bufferContent) throw new Error("buffer is not exist")
    return bufferContent
  }

  async function getAllBufferContents() {
    const db = await getDB()
    return await db.tablesMap.bufferContents.toArray()
  }

  async function findBufferContentHashId(content: ArrayBuffer) {
    const id = generateHashByBuffer(content)
    const allBufferContents = await getAllBufferContents()
    const bufferContent = allBufferContents.find((item) => item.id === id)
    if (bufferContent) {
      return bufferContent.id
    } else {
      return undefined
    }
  }

  async function putFile(
    videoId: string,
    content: ArrayBuffer,
    type: File["type"]
  ) {
    const db = await getDB()
    const bufferContentHashId = await putBufferContent(content)
    const newFile: IFile = {
      type,
      bufferContentHashId: bufferContentHashId,
    }
    return await db.tablesMap.files.put({
      id: videoId,
      ...newFile,
    })
  }

  async function getFileById(id: string) {
    const db = await getDB()
    const file = await db.tablesMap.files.get({ id })
    if (!file) throw new Error("file is not exist")
    return await filterFile(file)
  }

  function getFileUrl(file: IFile & { bufferContent: ArrayBuffer }) {
    if (!file.bufferContent) throw new Error("bufferContent is not exist")
    const blob = new Blob([file.bufferContent], { type: file.type })
    const url = URL.createObjectURL(blob)
    return url
  }

  async function filterFile(file: IFile) {
    const bufferContent = await getBufferContentByHashId(
      file.bufferContentHashId
    )
    if (!bufferContent) throw new Error("bufferContent is not exist")
    return {
      ...file,
      bufferContent: bufferContent.content,
    }
  }

  async function getAllFiles() {
    const db = await getDB()
    const files = await db.tablesMap.files.toArray()
    const filterFiles = await Promise.all(
      files.map(async (file) => {
        return await filterFile(file)
      })
    )
    return filterFiles
  }

  async function getAllBaseFiles() {
    const db = await getDB()
    const files = await db.tablesMap.files.toArray()
    return files
  }

  async function fileDownload(playItem: IPlayItem) {
    const fileBuffer = await getFileBufferByUrl(playItem.url)
    await putFile(playItem.videoId, fileBuffer, playItem.type)
    const file = await getFileById(playItem.videoId)
    filterPlayList.value.forEach((item) => {
      if (item.videoId === playItem.videoId) {
        item.localUrl = getFileUrl(file)
      }
    })
  }

  async function filterPlayLister(playList: IPlayItem[]) {
    const files = await getAllBaseFiles()
    const filterList = await Promise.all(
      playList.map(async (item) => {
        let localUrl = ""
        const file = files.find(
          (file) =>
            file.id === item.videoId && file.bufferContentHashId === item.hashId
        )
        if (!file) {
          fileDownload(item)
          localUrl = item.url
        } else {
          const { content } = await getBufferContentByHashId(
            file.bufferContentHashId
          )
          localUrl = getFileUrl({
            ...file,
            bufferContent: content,
          })
        }
        return {
          ...item,
          localUrl,
        }
      })
    )
    filterPlayList.value = filterList
  }

  return {
    putBufferContent,
    getBufferContentByHashId,
    getAllBufferContents,
    findBufferContentHashId,

    putFile,
    getFileById,
    getAllFiles,
    getFileUrl,
    fileDownload,

    filterPlayList,
    filterPlayLister,
  }
}
