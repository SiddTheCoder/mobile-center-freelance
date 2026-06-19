import { NextResponse } from "next/server"

import { bulkCreateAdminProducts } from "@/lib/product-service"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const products = Array.isArray(body?.products) ? body.products : []

    if (products.length === 0) {
      return NextResponse.json(
        { errors: [{ index: 0, sku: "MISSING", errors: ["No products were provided."] }] },
        { status: 400 }
      )
    }

    const result = await bulkCreateAdminProducts(products)

    return NextResponse.json({
      requested: result.requested,
      inserted: result.inserted,
      products: result.rows,
      errors: result.errors,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to import products.",
      },
      { status: 500 }
    )
  }
}
