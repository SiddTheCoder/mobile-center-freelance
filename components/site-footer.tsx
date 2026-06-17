import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import { SiteLogo } from "@/components/site-logo"
import { PLATFORM_NAME } from "@/lib/platform"

export function SiteFooter() {
  return (
    <footer id="footer" className="bg-[#171717] px-4 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="h-44 overflow-hidden rounded-[8px] bg-[#e7eef7] p-4 text-slate-800">
            <div className="relative h-full rounded-[8px] bg-[linear-gradient(90deg,#dbeafe_1px,transparent_1px),linear-gradient(#dbeafe_1px,transparent_1px)] bg-[size:28px_28px]">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-[8px] bg-white px-3 py-2 text-sm font-bold shadow">
                <MapPin className="size-4 text-[#f97316]" />
                {PLATFORM_NAME}, Kathmandu
              </div>
            </div>
          </div>
          <div className="mt-8">
            <SiteLogo />
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-black">Navigation</h3>
          {["Homepage", "Trending", "Flash Sales", "New Arrival", "Blog"].map(
            (item) => (
              <Link
                key={item}
                href="/#home"
                className="block py-1.5 text-sm text-white/70 hover:text-[#f97316]"
              >
                {item}
              </Link>
            )
          )}
        </div>
        <div>
          <h3 className="mb-4 text-lg font-black">Legal</h3>
          {["About us", "Terms & Conditions", "Warranty Policy", "Privacy Policy"].map(
            (item) => (
              <Link
                key={item}
                href="/#home"
                className="block py-1.5 text-sm text-white/70 hover:text-[#f97316]"
              >
                {item}
              </Link>
            )
          )}
        </div>
        <div>
          <h3 className="mb-4 text-lg font-black">Contact</h3>
          <p className="flex gap-2 py-1.5 text-sm text-white/80">
            <MapPin className="mt-0.5 size-4 text-white" />
            {PLATFORM_NAME} Pvt. Ltd, Kathmandu 44600
          </p>
          <p className="flex gap-2 py-1.5 text-sm text-white/80">
            <Phone className="mt-0.5 size-4 text-white" />
            9708085445
          </p>
          <p className="flex gap-2 py-1.5 text-sm text-white/80">
            <Mail className="mt-0.5 size-4 text-white" />
            info@demostore.com
          </p>
        </div>
      </div>
    </footer>
  )
}
