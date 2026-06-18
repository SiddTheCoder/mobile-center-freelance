import Link from "next/link"
import Image from "next/image"

import { PLATFORM_LOGO_SRC, PLATFORM_NAME } from "@/lib/platform"
import { cn } from "@/lib/utils"

type SiteLogoProps = {
  className?: string
  textClassName?: string
}

export function SiteLogo({ className, textClassName }: SiteLogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${PLATFORM_NAME} home`}
      className={cn("flex shrink-0 items-center gap-2", className)}
    >
      <span className="relative block h-10 w-[62px] overflow-hidden rounded-[6px]">
        <Image
          src={PLATFORM_LOGO_SRC}
          alt=""
          width={870}
          height={565}
          sizes="62px"
          className="h-full w-full object-contain"
        />
      </span>
      <span
        className={cn(
          "text-xl font-black tracking-[0.01em] text-[#2b0f52] md:text-2xl",
          textClassName
        )}
      >
        {PLATFORM_NAME}
      </span>
    </Link>
  )
}
