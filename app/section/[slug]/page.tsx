import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductSectionClient } from "@/components/product-section-client"
import { PLATFORM_NAME } from "@/lib/platform"
import { getCatalogProducts } from "@/lib/product-service"
import {
  getProductSectionBySlug,
  getProductsForSectionFrom,
  productSections,
} from "@/lib/products"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return productSections.map((section) => ({ slug: section.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const section = getProductSectionBySlug(slug)

  if (!section) {
    return {
      title: `Section not found | ${PLATFORM_NAME}`,
    }
  }

  return {
    title: `${section.title} | ${PLATFORM_NAME}`,
    description: section.description,
  }
}

export default async function ProductSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const section = getProductSectionBySlug(slug)

  if (!section) notFound()

  const products = await getCatalogProducts()

  return (
    <ProductSectionClient
      section={section}
      sectionProducts={getProductsForSectionFrom(products, slug)}
    />
  )
}
