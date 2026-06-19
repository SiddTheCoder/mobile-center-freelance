import {
  type Product,
  type ProductDetailValue,
  type ProductDetails,
} from "@/lib/products"

export const VALID_PRODUCT_CATEGORIES = [
  "Smart Phone",
  "Accessories",
  "Earbuds",
] as const

const VALID_AVAILABILITY = ["In Stock", "Out of Stock", "Preorder"]
const PLACEHOLDER_IMAGE = "/demo-store-icon-big.png"

export type ProductInput = {
  id?: unknown
  sku?: unknown
  category?: unknown
  brand?: unknown
  name?: unknown
  price?: unknown
  sale?: unknown
  stock?: unknown
  availability?: unknown
  featured?: unknown
  status?: unknown
  model?: unknown
  variant?: unknown
  ram?: unknown
  storage?: unknown
  processor?: unknown
  color?: unknown
  colors?: unknown
  condition?: unknown
  oldPrice?: unknown
  originalPrice?: unknown
  warranty?: unknown
  shortDesc?: unknown
  description?: unknown
  image?: unknown
  images?: unknown
  gallery?: unknown
  supplier?: unknown
  supplierCode?: unknown
  tags?: unknown
  barcode?: unknown
  rawFields?: Record<string, unknown>
}

export type NormalizedProductResult = {
  product?: Product
  skuNormalized?: string
  errors: string[]
}

export type AdminProductRow = {
  _id: string
  id: string
  sku: string
  name: string
  category: string
  brand: string
  price: number
  sale: number
  stock: number
  status: string
  featured: boolean
  availability: string
  location: number
  image: string
  source: string
}

function text(value: unknown) {
  if (value === null || value === undefined) return ""
  return String(value).trim()
}

function numberValue(value: unknown) {
  const cleanValue = text(value).replace(/,/g, "")
  if (!cleanValue) return null

  const parsed = Number(cleanValue)
  return Number.isFinite(parsed) ? parsed : null
}

function booleanValue(value: unknown) {
  if (typeof value === "boolean") return value

  const normalized = text(value).toLowerCase()
  return ["1", "true", "yes", "y", "featured"].includes(normalized)
}

function normalizedKey(key: string) {
  return key.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function findRawValue(rawFields: Record<string, unknown>, aliases: string[]) {
  const aliasSet = new Set(aliases.map(normalizedKey))
  const match = Object.entries(rawFields).find(([key]) =>
    aliasSet.has(normalizedKey(key))
  )

  return match?.[1]
}

function readField(
  input: ProductInput,
  rawFields: Record<string, unknown>,
  ownKeys: (keyof ProductInput)[],
  aliases: string[]
) {
  for (const key of ownKeys) {
    const value = input[key]
    if (text(value)) return value
  }

  return findRawValue(rawFields, aliases)
}

function splitList(value: unknown) {
  return text(value)
    .split(/\r?\n|[|;,]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function normalizeSku(value: string) {
  return value.trim().toUpperCase()
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function cleanRawFields(rawFields?: Record<string, unknown>) {
  const cleaned: Record<string, string> = {}

  Object.entries(rawFields ?? {}).forEach(([key, value]) => {
    const cleanKey = key.trim()
    const cleanValue = text(value)
    if (cleanKey && cleanValue) cleaned[cleanKey] = cleanValue
  })

  return cleaned
}

function addDetail(
  details: ProductDetails,
  label: string,
  value: ProductDetailValue | null | undefined
) {
  if (value === null || value === undefined || value === "") return
  details[label] = value
}

function createDetails(
  input: ProductInput,
  rawFields: Record<string, string>,
  values: {
    sku: string
    category: string
    brand: string
    price: number
    stock: number
    availability: string
  }
) {
  const details: ProductDetails = { ...rawFields }

  addDetail(details, "SKU", values.sku)
  addDetail(details, "Brand", values.brand)
  addDetail(details, "Category", values.category)
  addDetail(details, "Price NPR", values.price)
  addDetail(details, "Stock Quantity", values.stock)
  addDetail(details, "Availability", values.availability)
  addDetail(details, "Model", text(input.model))
  addDetail(details, "Variant", text(input.variant))
  addDetail(details, "RAM", text(input.ram))
  addDetail(details, "Storage", text(input.storage))
  addDetail(details, "Processor", text(input.processor))
  addDetail(details, "Condition", text(input.condition))
  addDetail(details, "Warranty", text(input.warranty))
  addDetail(details, "Supplier", text(input.supplier))
  addDetail(details, "Supplier Code", text(input.supplierCode))
  addDetail(details, "Tags", text(input.tags))
  addDetail(details, "Barcode", text(input.barcode))

  return details
}

function createSpecs(input: ProductInput, rawFields: Record<string, string>) {
  const explicitSpecs = splitList(findRawValue(rawFields, ["Specs", "Specifications", "Key Specs"]))
  if (explicitSpecs.length > 0) return explicitSpecs.slice(0, 8)

  const specs = [
    text(findRawValue(rawFields, ["Display", "Screen", "Screen Size"])),
    text(input.processor) || text(findRawValue(rawFields, ["Processor", "Chipset", "CPU"])),
    text(findRawValue(rawFields, ["Camera", "Main Camera", "Rear Camera"])),
    text(findRawValue(rawFields, ["Battery", "Battery Capacity"])),
    [text(input.ram), text(input.storage)].filter(Boolean).join(" / "),
    text(input.variant),
    text(input.condition),
    text(input.warranty),
  ].filter(Boolean)

  return specs.length > 0 ? specs.slice(0, 8) : ["Official Nepal retailer listing"]
}

function createDescription(input: ProductInput, values: {
  name: string
  brand: string
  category: string
  price: number
  colors: string[]
  availability: string
}) {
  const manualDescription = text(input.description) || text(input.shortDesc)
  if (manualDescription) return manualDescription

  const colorsText =
    values.colors.length > 0 && values.colors[0] !== "Default"
      ? ` Available colors include ${values.colors.join(", ")}.`
      : ""

  return `${values.name} is a ${values.brand} ${values.category.toLowerCase()} listed in Nepal at Rs. ${values.price.toLocaleString("en-NP")}.${colorsText} Current availability is ${values.availability}.`
}

export function normalizeProductInput(input: ProductInput): NormalizedProductResult {
  const rawFields = cleanRawFields(input.rawFields)

  const sku = normalizeSku(text(readField(input, rawFields, ["sku"], ["SKU", "Product SKU"])))
  const category = text(readField(input, rawFields, ["category"], ["Category", "Product Category"]))
  const brand = text(readField(input, rawFields, ["brand"], ["Brand", "Manufacturer"]))
  const name = text(readField(input, rawFields, ["name"], ["Product_Name", "Product Name", "Name", "Title", "Item"]))
  const price = numberValue(readField(input, rawFields, ["price"], ["Price_NPR", "Price", "MRP", "Cost"]))
  const sale = numberValue(readField(input, rawFields, ["sale"], ["Sale_Price_NPR", "Sale Price", "Offer Price"]))
  const currentPrice = sale && sale > 0 ? sale : price
  const stock = numberValue(readField(input, rawFields, ["stock"], ["Stock_Quantity", "Stock Quantity", "Stock", "Qty", "Quantity"]))
  const availability = text(readField(input, rawFields, ["availability"], ["Availability"])) || "In Stock"
  const status = text(readField(input, rawFields, ["status"], ["Product_Status", "Product Status", "Status", "State"])) || "Published"
  const featured = booleanValue(readField(input, rawFields, ["featured"], ["Featured", "Featured On Site"]))
  const errors: string[] = []

  if (!sku) errors.push("SKU is required.")
  if (!name) errors.push("Product name is required.")
  if (!brand) errors.push("Brand is required.")

  if (!category) {
    errors.push("Category is required.")
  } else if (!VALID_PRODUCT_CATEGORIES.includes(category as (typeof VALID_PRODUCT_CATEGORIES)[number])) {
    errors.push(`Category must be one of: ${VALID_PRODUCT_CATEGORIES.join(", ")}.`)
  }

  if (currentPrice === null || currentPrice <= 0) {
    errors.push("Price must be greater than 0.")
  }

  if (stock === null || stock < 0 || !Number.isInteger(stock)) {
    errors.push("Stock must be an integer greater than or equal to 0.")
  }

  if (!VALID_AVAILABILITY.includes(availability)) {
    errors.push("Availability must be In Stock, Out of Stock, or Preorder.")
  }

  const originalPrice = numberValue(
    readField(input, rawFields, ["oldPrice", "originalPrice"], [
      "Old_Price_NPR",
      "Old Price",
      "Original Price",
      "Original_Price_NPR",
    ])
  )

  if (originalPrice !== null && currentPrice !== null && originalPrice < currentPrice) {
    errors.push("Old price should be greater than or equal to the current price.")
  }

  if (errors.length > 0 || currentPrice === null || stock === null) {
    return { skuNormalized: sku, errors }
  }

  const imageValues = [
    ...splitList(readField(input, rawFields, ["images", "gallery"], ["Images", "Image URLs", "Gallery"])),
    ...splitList(readField(input, rawFields, ["image"], ["Image", "Image URL", "Photo", "Thumbnail"])),
  ]
  const gallery = Array.from(new Set(imageValues)).filter(Boolean)
  const image = gallery[0] ?? PLACEHOLDER_IMAGE
  const colors = splitList(readField(input, rawFields, ["colors", "color"], ["Colors", "Color", "Colour"]))
  const finalColors = colors.length > 0 ? colors : ["Default"]
  const isSoldOut =
    stock === 0 ||
    availability === "Out of Stock" ||
    ["sold out", "out of stock"].includes(status.toLowerCase())
  const badge = isSoldOut
    ? "Sold Out"
    : featured
      ? "Featured"
      : category === "Smart Phone"
        ? "New"
        : category === "Accessories"
          ? "Accessory"
          : "Audio"

  const id = slugify(text(input.id) || sku || name)
  const details = createDetails(input, rawFields, {
    sku,
    category,
    brand,
    price: currentPrice,
    stock,
    availability,
  })
  const specs = createSpecs(input, rawFields)

  return {
    skuNormalized: sku,
    errors,
    product: {
      id,
      sku,
      name,
      brand,
      category,
      price: currentPrice,
      originalPrice: originalPrice && originalPrice > currentPrice ? originalPrice : undefined,
      rating: 4.7,
      reviews: 0,
      image,
      gallery: gallery.length > 0 ? gallery : [image],
      badge,
      soldOut: isSoldOut,
      stock,
      availability,
      status,
      featured,
      warranty: text(input.warranty) || text(rawFields.Warranty) || "1 Year",
      details,
      rawFields,
      specs,
      colors: finalColors,
      description: createDescription(input, {
        name,
        brand,
        category,
        price: currentPrice,
        colors: finalColors,
        availability,
      }),
    },
  }
}

export function toAdminProductRow(
  product: Product,
  options: { rowId?: string; source?: string } = {}
): AdminProductRow {
  const stock = product.stock ?? (product.soldOut ? 0 : 1)
  const status =
    product.status ??
    (product.soldOut ? "Sold Out" : stock <= 4 ? "Low Stock" : "Published")

  return {
    _id: options.rowId ?? product.id,
    id: product.id,
    sku: product.sku ?? normalizeSku(product.id),
    name: product.name,
    category: product.category,
    brand: product.brand,
    price: product.originalPrice ?? product.price,
    sale: product.price,
    stock,
    status,
    featured: Boolean(product.featured),
    availability: product.availability ?? (product.soldOut ? "Out of Stock" : "In Stock"),
    location: product.soldOut ? 0 : 1,
    image: product.image,
    source: options.source ?? "static",
  }
}
