import type { Metadata } from "next"

import { CategoriesClient } from "@/components/categories-client"
import { PLATFORM_NAME } from "@/lib/platform"

export const metadata: Metadata = {
  title: `All Categories | ${PLATFORM_NAME}`,
  description: `Browse product categories and their subcategories.`,
}

export default function CategoriesPage() {
  return <CategoriesClient />
}
