import { ObjectId, type Collection, type WithId } from "mongodb"

import { getMongoDb } from "@/lib/mongodb"
import {
  normalizeProductInput,
  normalizeSku,
  toAdminProductRow,
  type AdminProductRow,
  type ProductInput,
} from "@/lib/product-normalizer"
import { products as staticProducts, type Product } from "@/lib/products"

type ProductDocument = Product & {
  _id?: ObjectId
  skuNormalized: string
  source: "seed" | "admin" | "override"
  createdAt: Date
  updatedAt: Date
}

type BulkImportError = {
  index: number
  sku: string
  errors: string[]
}

let indexPromise: Promise<void> | null = null
let seedPromise: Promise<void> | null = null

async function getProductsCollection(): Promise<Collection<ProductDocument>> {
  const db = await getMongoDb()
  const collection = db.collection<ProductDocument>("products")

  indexPromise ??= Promise.all([
    collection.createIndex({ skuNormalized: 1 }, { unique: true }),
    collection.createIndex({ id: 1 }),
    collection.createIndex({ status: 1 }),
  ]).then(() => undefined)

  await indexPromise
  await ensureSeedProducts(collection)
  return collection
}

function staticSkuFor(product: Product) {
  return normalizeSku(product.sku ?? product.id)
}

function staticProductToCatalogProduct(product: Product, index: number): Product {
  const stock = product.stock ?? (product.soldOut ? 0 : [16, 12, 9, 7, 5, 3][index % 6])
  const sku = staticSkuFor(product)

  return {
    ...product,
    sku,
    stock,
    availability: product.availability ?? (product.soldOut ? "Out of Stock" : "In Stock"),
    status: product.status ?? (product.soldOut ? "Sold Out" : stock <= 4 ? "Low Stock" : "Published"),
    featured: product.featured ?? ["Flagship", "New"].includes(product.badge ?? ""),
    warranty: product.warranty ?? "1 Year",
    details: {
      SKU: sku,
      Brand: product.brand,
      Category: product.category,
      "Price NPR": product.price,
      "Stock Quantity": stock,
      Availability: product.soldOut ? "Out of Stock" : "In Stock",
      ...(product.details ?? {}),
    },
  }
}

function getStaticCatalogProducts() {
  return staticProducts.map(staticProductToCatalogProduct)
}

function ensureSeedProducts(collection: Collection<ProductDocument>) {
  seedPromise ??= (async () => {
    const existingSeed = await collection.findOne(
      { source: "seed" },
      { projection: { _id: 1 } }
    )

    if (existingSeed) return

    const now = new Date()
    const seedOperations = getStaticCatalogProducts().map((product) => {
      const document = productToDocument(product, "seed", now)

      return {
        updateOne: {
          filter: { skuNormalized: document.skuNormalized },
          update: { $setOnInsert: document },
          upsert: true,
        },
      }
    })

    if (seedOperations.length > 0) {
      await collection.bulkWrite(seedOperations, { ordered: false })
    }
  })()

  return seedPromise
}

function isObjectId(value: string) {
  return ObjectId.isValid(value) && String(new ObjectId(value)) === value
}

function documentToProduct(document: WithId<ProductDocument>): Product {
  return {
    id: document.id,
    sku: document.sku,
    name: document.name,
    brand: document.brand,
    category: document.category,
    price: document.price,
    originalPrice: document.originalPrice,
    rating: document.rating,
    reviews: document.reviews,
    image: document.image,
    gallery: document.gallery,
    badge: document.badge,
    soldOut: document.soldOut,
    stock: document.stock,
    availability: document.availability,
    status: document.status,
    featured: document.featured,
    warranty: document.warranty,
    details: document.details,
    rawFields: document.rawFields,
    specs: document.specs,
    colors: document.colors,
    description: document.description,
  }
}

function productToDocument(
  product: Product,
  source: ProductDocument["source"],
  now = new Date()
): ProductDocument {
  return {
    ...product,
    skuNormalized: normalizeSku(product.sku ?? product.id),
    source,
    createdAt: now,
    updatedAt: now,
  }
}

function mergeCatalogProducts(
  baseProducts: Product[],
  databaseProducts: WithId<ProductDocument>[]
) {
  const databaseCatalogProducts = databaseProducts.map(documentToProduct)
  const databaseKeys = new Set(
    databaseCatalogProducts.map((product) => normalizeSku(product.sku ?? product.id))
  )

  return [
    ...databaseCatalogProducts,
    ...baseProducts.filter(
      (product) => !databaseKeys.has(normalizeSku(product.sku ?? product.id))
    ),
  ]
}

async function getDatabaseProductDocuments() {
  const collection = await getProductsCollection()
  return collection.find({}).sort({ createdAt: -1 }).toArray()
}

export async function getCatalogProducts(options: { includeDraft?: boolean } = {}) {
  const baseProducts = getStaticCatalogProducts()
  const databaseProducts = await getDatabaseProductDocuments()
  const merged = mergeCatalogProducts(baseProducts, databaseProducts)

  if (options.includeDraft) return merged

  return merged.filter((product) => product.status !== "Draft")
}

export async function getCatalogProductById(id: string) {
  const products = await getCatalogProducts({ includeDraft: false })
  return products.find((product) => product.id === id)
}

export async function getAdminProductRows(): Promise<AdminProductRow[]> {
  const baseProducts = getStaticCatalogProducts()
  const databaseProducts = await getDatabaseProductDocuments()
  const databaseRows = databaseProducts.map((document) =>
    toAdminProductRow(documentToProduct(document), {
      rowId: document._id.toString(),
      source: document.source,
    })
  )
  const databaseKeys = new Set(
    databaseProducts.map((product) => normalizeSku(product.sku ?? product.id))
  )
  const staticRows = baseProducts
    .filter((product) => !databaseKeys.has(normalizeSku(product.sku ?? product.id)))
    .map((product) =>
      toAdminProductRow(product, {
        rowId: product.id,
        source: "static",
      })
    )

  return [...databaseRows, ...staticRows]
}

async function ensureSkuIsAvailable(
  collection: Collection<ProductDocument>,
  skuNormalized: string
) {
  const existing = await collection.findOne({ skuNormalized })
  return !existing
}

export async function createAdminProduct(input: ProductInput) {
  const result = normalizeProductInput(input)
  if (!result.product || !result.skuNormalized || result.errors.length > 0) {
    return { row: null, errors: result.errors }
  }

  const collection = await getProductsCollection()
  const isAvailable = await ensureSkuIsAvailable(collection, result.skuNormalized)

  if (!isAvailable) {
    return {
      row: null,
      errors: [`SKU '${result.product.sku}' already exists in the catalog.`],
    }
  }

  const now = new Date()
  const productId = new ObjectId()
  const document: ProductDocument = {
    _id: productId,
    ...productToDocument(result.product, "admin", now),
  }

  await collection.insertOne(document)

  return {
    row: toAdminProductRow(result.product, {
      rowId: productId.toString(),
      source: "admin",
    }),
    errors: [],
  }
}

export async function bulkCreateAdminProducts(inputs: ProductInput[]) {
  const collection = await getProductsCollection()
  const staticSkuSet = new Set(
    getStaticCatalogProducts().map((product) => normalizeSku(product.sku ?? product.id))
  )
  const normalizedRows = inputs.map((input, index) => ({
    index: index + 1,
    input,
    ...normalizeProductInput(input),
  }))
  const candidateSkus = normalizedRows
    .map((row) => row.skuNormalized)
    .filter((sku): sku is string => Boolean(sku))
  const existingProducts = candidateSkus.length
    ? await collection
        .find({ skuNormalized: { $in: candidateSkus } })
        .project<{ skuNormalized: string }>({ skuNormalized: 1 })
        .toArray()
    : []
  const existingSkuSet = new Set(existingProducts.map((product) => product.skuNormalized))
  const requestSkuSet = new Set<string>()
  const errors: BulkImportError[] = []
  const now = new Date()
  const documents: ProductDocument[] = []

  normalizedRows.forEach((row) => {
    const rowErrors = [...row.errors]
    const sku = row.skuNormalized ?? normalizeSku(String(row.input.sku ?? ""))

    if (sku) {
      if (requestSkuSet.has(sku)) {
        rowErrors.push(`Duplicate SKU '${sku}' inside this import.`)
      } else {
        requestSkuSet.add(sku)
      }

      if (staticSkuSet.has(sku) || existingSkuSet.has(sku)) {
        rowErrors.push(`SKU '${sku}' already exists in the catalog.`)
      }
    }

    if (!row.product || rowErrors.length > 0) {
      errors.push({
        index: row.index,
        sku: sku || "MISSING",
        errors: rowErrors,
      })
      return
    }

    documents.push({
      _id: new ObjectId(),
      ...productToDocument(row.product, "admin", now),
    })
  })

  if (documents.length > 0) {
    await collection.insertMany(documents)
  }

  return {
    requested: inputs.length,
    inserted: documents.length,
    rows: documents.map((document) =>
      toAdminProductRow(documentToProduct(document as WithId<ProductDocument>), {
        rowId: document._id?.toString(),
        source: "admin",
      })
    ),
    errors,
  }
}

function findStaticProductById(id: string) {
  return getStaticCatalogProducts().find(
    (product) => product.id === id || normalizeSku(product.sku ?? product.id) === normalizeSku(id)
  )
}

export async function updateAdminProduct(id: string, updates: ProductInput) {
  const collection = await getProductsCollection()
  const query = isObjectId(id) ? { _id: new ObjectId(id) } : { id }
  const existingDocument = await collection.findOne(query)
  const baseProduct = existingDocument ? documentToProduct(existingDocument) : findStaticProductById(id)

  if (!baseProduct) {
    return { row: null, errors: ["Product was not found."] }
  }

  const mergedInput: ProductInput = {
    ...baseProduct,
    ...updates,
    sku: baseProduct.sku,
    rawFields: {
      ...(baseProduct.rawFields ?? {}),
      ...(updates.rawFields ?? {}),
    },
  }
  const normalized = normalizeProductInput(mergedInput)

  if (!normalized.product || normalized.errors.length > 0) {
    return { row: null, errors: normalized.errors }
  }

  const now = new Date()
  const nextDocument = productToDocument(
    normalized.product,
    existingDocument?.source ?? "override",
    now
  )

  if (existingDocument) {
    await collection.updateOne(
      { _id: existingDocument._id },
      {
        $set: {
          ...nextDocument,
          createdAt: existingDocument.createdAt,
          updatedAt: now,
        },
      }
    )

    return {
      row: toAdminProductRow(normalized.product, {
        rowId: existingDocument._id.toString(),
        source: existingDocument.source,
      }),
      errors: [],
    }
  }

  const overrideId = new ObjectId()
  const document: ProductDocument = {
    _id: overrideId,
    ...nextDocument,
    createdAt: now,
    updatedAt: now,
  }

  await collection.insertOne(document)

  return {
    row: toAdminProductRow(normalized.product, {
      rowId: overrideId.toString(),
      source: "override",
    }),
    errors: [],
  }
}

export async function deleteAdminProduct(id: string) {
  if (!isObjectId(id)) {
    return {
      deleted: false,
      errors: ["Built-in catalog products cannot be deleted from MongoDB."],
    }
  }

  const collection = await getProductsCollection()
  const product = await collection.findOne({ _id: new ObjectId(id) })

  if (product?.source === "seed") {
    return {
      deleted: false,
      errors: ["Seeded Lotus catalog products can be updated, but not deleted."],
    }
  }

  const result = await collection.deleteOne({ _id: new ObjectId(id) })

  return {
    deleted: result.deletedCount > 0,
    errors: result.deletedCount > 0 ? [] : ["Product was not found."],
  }
}
