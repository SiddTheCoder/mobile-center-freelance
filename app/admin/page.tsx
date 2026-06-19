import type { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { AdminPortal } from "@/components/admin-portal"
import { PLATFORM_NAME } from "@/lib/platform"

export const metadata: Metadata = {
  title: `Admin | ${PLATFORM_NAME}`,
  description: `Admin portal for ${PLATFORM_NAME}.`,
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any).role !== "admin") {
    redirect("/")
  }

  return <AdminPortal />
}
