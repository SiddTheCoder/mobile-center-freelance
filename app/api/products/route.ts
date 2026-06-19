import { NextResponse } from "next/server"

import { getCatalogProducts } from "@/lib/product-service"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const products = await getCatalogProducts()
    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load products.",
      },
      { status: 500 }
    )
  }
}
