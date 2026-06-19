"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type PrefetchLinkProps = React.ComponentProps<typeof Link>

export function PrefetchLink({
  href,
  onFocus,
  onMouseEnter,
  onTouchStart,
  ...props
}: PrefetchLinkProps) {
  const router = useRouter()

  const prefetch = React.useCallback(() => {
    const nextHref = typeof href === "string" ? href : href.toString()
    router.prefetch(nextHref)
  }, [href, router])

  return (
    <Link
      href={href}
      onFocus={(event) => {
        prefetch()
        onFocus?.(event)
      }}
      onMouseEnter={(event) => {
        prefetch()
        onMouseEnter?.(event)
      }}
      onTouchStart={(event) => {
        prefetch()
        onTouchStart?.(event)
      }}
      {...props}
    />
  )
}
