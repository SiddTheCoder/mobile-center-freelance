import type { Metadata } from "next"

import { AdminPortal } from "@/components/admin-portal"
import { PLATFORM_NAME } from "@/lib/platform"

export const metadata: Metadata = {
  title: `Admin | ${PLATFORM_NAME}`,
  description: `Admin portal for ${PLATFORM_NAME}.`,
}

export default function AdminPage() {
  return <AdminPortal />
}
