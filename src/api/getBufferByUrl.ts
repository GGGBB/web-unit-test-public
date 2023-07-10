import axios, { AxiosProgressEvent } from "axios"
export * from "./projects"

function extractFilename(url: string): string {
  const pattern = /(?<=\/)[^\/]+\.\w+$/
  const match = url.match(pattern)
  if (match) {
    return match[0]
  }
  return ""
}

export async function getFileBufferByUrl(url: string) {
  try {
    let p = 0
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          )
          if (progress !== p && progress % 100 === 0) {
            p = progress
            console.log(`${extractFilename(url)} ---- progress: ${progress}% `)
          }
        }
      },
    })
    return response.data
  } catch (error) {
    console.error("请求发生错误:", error)
    throw error
  }
}
