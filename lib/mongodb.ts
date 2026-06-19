import { MongoClient, type Db } from "mongodb"

const uri = process.env.MONGODB_URI

declare global {
  var mobileCenterMongoClientPromise: Promise<MongoClient> | undefined
}

function getMongoUri() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.")
  }

  return uri
}

function getDatabaseName() {
  if (process.env.MONGODB_DB) return process.env.MONGODB_DB

  try {
    const pathName = new URL(getMongoUri()).pathname.replace(/^\//, "")
    if (pathName) return decodeURIComponent(pathName)
  } catch {}

  return "mobile_center"
}

export function getMongoClient() {
  const mongoUri = getMongoUri()

  if (!global.mobileCenterMongoClientPromise) {
    const client = new MongoClient(mongoUri)
    global.mobileCenterMongoClientPromise = client.connect()
  }

  return global.mobileCenterMongoClientPromise
}

export async function getMongoDb(): Promise<Db> {
  const client = await getMongoClient()
  return client.db(getDatabaseName())
}
