import Dexie from "dexie"
// @ts-ignore
import { indexedDB, IDBKeyRange } from "fake-indexeddb"

export interface IFile {
  id?: string
  type: File["type"]
  bufferContentHashId: string
  bufferContent?: ArrayBuffer
}
export interface IBufferContent {
  id?: string
  content: ArrayBuffer
}

export interface TablesMap {
  files: Dexie.Table<IFile, string>
  bufferContents: Dexie.Table<IBufferContent, string>
}

export class DexieDB extends Dexie {
  tablesMap: TablesMap
  constructor() {
    super("DexieDB", { indexedDB: indexedDB, IDBKeyRange: IDBKeyRange })
    this.version(5).stores({
      files: "id, type, bufferContentHashId",
      bufferContents: "id, content",
    })
    // 初始化表映射
    this.tablesMap = {
      files: this.table("files"),
      bufferContents: this.table("bufferContents"),
    }
  }
}

let db: DexieDB

export function useDexieDB() {
  async function getDB() {
    if (!db) throw new Error("db is not setup")
    return db
  }

  async function setupDB() {
    if (!db) {
      db = new DexieDB()
    }
    await db.open()
  }

  async function clearAllTables() {
    const tableNames = Object.keys(db.tablesMap) as (keyof TablesMap)[]
    const clearTablePromises = tableNames.map((tableName) =>
      db.tablesMap[tableName].clear()
    )
    return Promise.all(clearTablePromises)
  }

  async function resetDB() {
    await clearAllTables()
  }
  async function closeDB() {
    await db.close()
  }

  return {
    getDB,
    setupDB,
    clearAllTables,
    closeDB,
    resetDB,
  }
}
