import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import { SiteLogo } from "@/components/site-logo"
import {
  PLATFORM_EMAIL,
  PLATFORM_GOOGLE_MAPS_EMBED_URL,
  PLATFORM_GOOGLE_MAPS_URL,
  PLATFORM_LOCATION,
  PLATFORM_NAME,
  PLATFORM_PHONE,
} from "@/lib/platform"

export function SiteFooter() {
  return (
    <footer id="footer" className="bg-[#171717] px-4 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="h-52 overflow-hidden rounded-[8px] border border-white/10 bg-[#e7eef7] text-slate-800 shadow-2xl shadow-black/25">
            <div className="relative h-full">
              <iframe
                title={`${PLATFORM_NAME} map`}
                src={PLATFORM_GOOGLE_MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,23,0.05),rgba(23,23,23,0.24))]" />
              <a
                href={PLATFORM_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="absolute left-1/2 top-1/2 flex max-w-[88%] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-[8px] bg-white/95 px-3 py-2 text-sm font-bold shadow-xl ring-1 ring-slate-900/10 backdrop-blur transition hover:text-[#f97316]"
              >
                <MapPin className="size-4 text-[#f97316]" />
                <span className="min-w-0">
                  <span className="block truncate">{PLATFORM_NAME}</span>
                  <span className="block truncate text-xs font-semibold text-slate-500">
                    {PLATFORM_LOCATION}
                  </span>
                </span>
              </a>
            </div>
          </div>
          <div className="mt-8">
            <SiteLogo textClassName="text-white" />
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
          <a
            href={PLATFORM_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2 py-1.5 text-sm text-white/80 transition hover:text-[#f97316]"
          >
            <MapPin className="mt-0.5 size-4 text-white" />
            <span>
              {PLATFORM_NAME}
              <span className="block text-white/60">{PLATFORM_LOCATION}</span>
            </span>
          </a>
          <a
            href={`tel:${PLATFORM_PHONE}`}
            className="flex gap-2 py-1.5 text-sm text-white/80 transition hover:text-[#f97316]"
          >
            <Phone className="mt-0.5 size-4 text-white" />
            {PLATFORM_PHONE}
          </a>
          <a
            href={`mailto:${PLATFORM_EMAIL}`}
            className="flex gap-2 py-1.5 text-sm text-white/80 transition hover:text-[#f97316]"
          >
            <Mail className="mt-0.5 size-4 text-white" />
            {PLATFORM_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  )
}
