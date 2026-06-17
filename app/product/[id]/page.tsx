import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductDetailClient } from "@/components/product-detail-client"
import { PLATFORM_NAME } from "@/lib/platform"
import { getProductById, products } from "@/lib/products"

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return {
      title: `Product not found | ${PLATFORM_NAME}`,
    }
  }

  return {
    title: `${product.name} | ${PLATFORM_NAME}`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) notFound()

  return <ProductDetailClient product={product} />
}
