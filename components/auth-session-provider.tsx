"use client"

import * as React from "react"
import type { ReactNode } from "react"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

export function AuthSessionProvider({
  children,
  session,
}: {
  children: ReactNode
  session?: Session | null
}) {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      <AuthUrlCleaner />
      {children}
    </SessionProvider>
  )
}

function AuthUrlCleaner() {
  React.useEffect(() => {
    const url = new URL(window.location.href)
    const hadAuthParams =
      url.searchParams.has("callbackUrl") || url.searchParams.has("error")

    if (!hadAuthParams) return

    url.searchParams.delete("callbackUrl")
    url.searchParams.delete("error")
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`)
  }, [])

  return null
}
