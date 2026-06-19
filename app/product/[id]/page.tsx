import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductDetailClient } from "@/components/product-detail-client"
import { PLATFORM_NAME } from "@/lib/platform"
import { getCatalogProductById, getCatalogProducts } from "@/lib/product-service"
import { products } from "@/lib/products"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = await getCatalogProductById(id)

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
  const [product, products] = await Promise.all([
    getCatalogProductById(id),
    getCatalogProducts(),
  ])

  if (!product) notFound()

  return <ProductDetailClient product={product} products={products} />
}
