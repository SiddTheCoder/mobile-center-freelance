import { Suspense } from "react"

import { StorefrontSkeleton } from "@/components/route-skeletons"
import Storefront from "@/components/storefront"
import { getCatalogProducts } from "@/lib/product-service"

export const dynamic = "force-dynamic"

async function StorefrontData() {
  const products = await getCatalogProducts()

  return <Storefront initialProducts={products} />
}

export default function Home() {
  return (
    <Suspense fallback={<StorefrontSkeleton />}>
      <StorefrontData />
    </Suspense>
  )
}
