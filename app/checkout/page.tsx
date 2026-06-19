"use client"

import * as React from "react"
import Link from "next/link"
import {
  CreditCard,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Store,
} from "lucide-react"

import { LoginDialog } from "@/components/login-dialog"
import { SiteFooter } from "@/components/site-footer"
import { StorefrontHeader } from "@/components/storefront-header"
import { Button } from "@/components/ui/button"
import { readCartItems, subscribeToCartChanges } from "@/lib/cart-store"
import {
  PLATFORM_GOOGLE_MAPS_URL,
  PLATFORM_LOCATION,
  PLATFORM_NAME,
  PLATFORM_PHONE,
} from "@/lib/platform"
import { formatPrice, type CartItem } from "@/lib/products"

export default function CheckoutPage() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [loginOpen, setLoginOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"login" | "signup">("login")

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setCartItems(readCartItems())
    }, 0)
    const unsubscribe = subscribeToCartChanges(setCartItems)

    return () => {
      window.clearTimeout(timer)
      unsubscribe()
    }
  }, [])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <main className="min-h-screen bg-[#fbfbfa] text-[#101322]">
      <StorefrontHeader
        totalItems={totalItems}
        onLoginOpen={() => setLoginOpen(true)}
      />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="overflow-hidden rounded-[16px] border border-[#ececf1] bg-white shadow-sm">
          <div className="bg-[linear-gradient(135deg,#101322,#2b0f52)] p-6 text-white md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-200">
                  Checkout
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                  Payment System Coming Soon
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                  Please visit our store once. We are currently building the
                  online payment system for {PLATFORM_NAME}.
                </p>
              </div>
              <div className="grid size-20 place-items-center rounded-[14px] bg-white/10 text-orange-200 ring-1 ring-white/15">
                <CreditCard className="size-10" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[1fr_320px] md:p-8">
            <section className="space-y-4">
              <div className="rounded-[12px] border border-orange-100 bg-orange-50 p-5">
                <div className="flex gap-3">
                  <Store className="mt-0.5 size-5 shrink-0 text-[#f97316]" />
                  <div>
                    <h2 className="font-black text-[#101322]">
                      Complete your purchase in store
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Your cart is ready. Bring your phone number or show this
                      cart at the counter and our team will help with cash,
                      transfer, EMI, pickup, and warranty details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[10px] border border-[#ececf1] bg-white p-4">
                  <ShoppingBag className="mb-3 size-5 text-[#f97316]" />
                  <p className="font-black">Cart saved</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {totalItems} item{totalItems === 1 ? "" : "s"} selected
                  </p>
                </div>
                <div className="rounded-[10px] border border-[#ececf1] bg-white p-4">
                  <ShieldCheck className="mb-3 size-5 text-[#f97316]" />
                  <p className="font-black">Warranty help</p>
                  <p className="mt-1 text-xs text-slate-500">
                    We verify product and warranty at the store.
                  </p>
                </div>
                <div className="rounded-[10px] border border-[#ececf1] bg-white p-4">
                  <CreditCard className="mb-3 size-5 text-[#f97316]" />
                  <p className="font-black">Online pay soon</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Payment gateway integration is in progress.
                  </p>
                </div>
              </div>

              <div className="rounded-[12px] border border-[#ececf1] bg-slate-50 p-5">
                <h2 className="font-black">Store details</h2>
                <div className="mt-4 space-y-3 text-sm">
                  <a
                    href={PLATFORM_GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 font-semibold text-slate-700 hover:text-[#f97316]"
                  >
                    <MapPin className="size-4 text-[#f97316]" />
                    {PLATFORM_LOCATION}
                  </a>
                  <a
                    href={`tel:${PLATFORM_PHONE}`}
                    className="flex items-center gap-2 font-semibold text-slate-700 hover:text-[#f97316]"
                  >
                    <Phone className="size-4 text-[#f97316]" />
                    {PLATFORM_PHONE}
                  </a>
                </div>
              </div>
            </section>

            <aside className="rounded-[12px] border border-[#ececf1] bg-white p-5 shadow-sm">
              <h2 className="font-black">Checkout Summary</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Items</span>
                  <span className="font-bold">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated total</span>
                  <span className="font-black text-[#2b0f52]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
              <div className="mt-5 grid gap-2">
                <a
                  href={PLATFORM_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-[8px] bg-[#f97316] px-4 text-sm font-bold text-white transition hover:bg-[#ea580c]"
                >
                  Open Store Location
                </a>
                <Link href="/cart">
                  <Button
                    variant="outline"
                    className="h-11 w-full rounded-[8px] border-slate-200"
                  >
                    Back to Cart
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <SiteFooter />
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </main>
  )
}
