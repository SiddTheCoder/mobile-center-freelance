import { NextResponse } from "next/server"

import {
  createAdminProduct,
  getAdminProductRows,
} from "@/lib/product-service"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const products = await getAdminProductRows()
    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load admin products.",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createAdminProduct(body)

    if (!result.row) {
      return NextResponse.json({ errors: result.errors }, { status: 400 })
    }

    return NextResponse.json({ product: result.row }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create product.",
      },
      { status: 500 }
    )
  }
}
