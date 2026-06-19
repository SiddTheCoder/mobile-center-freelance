import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto"
import { promisify } from "util"
import { ObjectId, type Collection } from "mongodb"

import { getMongoDb } from "@/lib/mongodb"

const scrypt = promisify(scryptCallback)
const PASSWORD_KEY_LENGTH = 64

type CredentialAccountDocument = {
  _id?: ObjectId
  name: string
  email: string
  passwordHash: string
  provider: "credentials"
  createdAt: Date
  updatedAt: Date
}

type CredentialAuthInput = {
  mode?: string
  name?: string
  email?: string
  password?: string
}

type CredentialAuthUser = {
  id: string
  name: string
  email: string
  role?: string
}

function normalizeEmail(email?: string) {
  return email?.trim().toLowerCase() ?? ""
}

function normalizeName(name?: string, email?: string) {
  const trimmedName = name?.trim()

  if (trimmedName) return trimmedName

  return email?.split("@")[0] || "Lotus customer"
}

async function getCredentialAccounts() {
  const db = await getMongoDb()
  const collection = db.collection<CredentialAccountDocument>(
    "credential_accounts"
  )

  await collection.createIndex({ email: 1 }, { unique: true })

  return collection
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const key = (await scrypt(password, salt, PASSWORD_KEY_LENGTH)) as Buffer

  return `scrypt:${salt}:${key.toString("hex")}`
}

async function verifyPassword(password: string, storedHash: string) {
  const [scheme, salt, keyHex] = storedHash.split(":")

  if (scheme !== "scrypt" || !salt || !keyHex) return false

  const storedKey = Buffer.from(keyHex, "hex")
  const candidateKey = (await scrypt(
    password,
    salt,
    storedKey.length
  )) as Buffer

  if (storedKey.length !== candidateKey.length) return false

  return timingSafeEqual(storedKey, candidateKey)
}

function toAuthUser(account: CredentialAccountDocument): CredentialAuthUser {
  return {
    id: String(account._id),
    name: account.name,
    email: account.email,
  }
}

async function findByEmail(
  collection: Collection<CredentialAccountDocument>,
  email: string
) {
  return collection.findOne({ email })
}

export async function authorizeCredentials({
  mode = "login",
  name,
  email: rawEmail,
  password = "",
}: CredentialAuthInput) {
  const email = normalizeEmail(rawEmail)
  const passwordValue = password.trim()

  if (!email || !passwordValue) {
    throw new Error("Enter your email and password.")
  }

  if (email === "admin@admin.com") {
    if (mode === "signup") {
      throw new Error("Signup is not allowed for the admin account.")
    }
    if (passwordValue === "admin") {
      return {
        id: "admin",
        name: "Admin",
        email: "admin@admin.com",
        role: "admin",
      }
    } else {
      throw new Error("Invalid email or password.")
    }
  }

  if (passwordValue.length < 6) {
    throw new Error("Password must be at least 6 characters.")
  }

  const collection = await getCredentialAccounts()
  const existingAccount = await findByEmail(collection, email)

  if (mode === "signup") {
    if (existingAccount) {
      throw new Error("An account already exists for this email.")
    }

    const now = new Date()
    const insertResult = await collection.insertOne({
      name: normalizeName(name, email),
      email,
      passwordHash: await hashPassword(passwordValue),
      provider: "credentials",
      createdAt: now,
      updatedAt: now,
    })

    return toAuthUser({
      _id: insertResult.insertedId,
      name: normalizeName(name, email),
      email,
      passwordHash: "",
      provider: "credentials",
      createdAt: now,
      updatedAt: now,
    })
  }

  if (!existingAccount) {
    throw new Error("No account found for this email.")
  }

  const passwordMatches = await verifyPassword(
    passwordValue,
    existingAccount.passwordHash
  )

  if (!passwordMatches) {
    throw new Error("Invalid email or password.")
  }

  await collection.updateOne(
    { _id: existingAccount._id },
    { $set: { updatedAt: new Date() } }
  )

  return toAuthUser(existingAccount)
}
