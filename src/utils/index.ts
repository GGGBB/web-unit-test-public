import SparkMD5 from "spark-md5"
export function delay(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("")
    }, ms)
  })
}

export function generateHashByString(data: string): string {
  const spark = new SparkMD5()
  spark.append(data)
  const hash = spark.end()
  return hash
}

export function generateHashByBuffer(data: ArrayBuffer): string {
  const spark = new SparkMD5.ArrayBuffer()
  spark.append(data)
  const hash = spark.end()
  return hash
}
