import Link from "next/link"

import { PLATFORM_NAME } from "@/lib/platform"

export function SiteLogo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2">
      <span className="relative grid size-9 place-items-center rounded-full bg-[#2b0f52]">
        <span className="absolute size-5 rounded-full border-[6px] border-[#f97316] border-r-transparent" />
      </span>
      <span className="text-xl font-black tracking-[0.01em] text-[#2b0f52] md:text-2xl">
        {PLATFORM_NAME}
      </span>
    </Link>
  )
}
