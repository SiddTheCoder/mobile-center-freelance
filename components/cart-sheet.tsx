"use client"

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { PLATFORM_NAME } from "@/lib/platform"
import { formatPrice, type CartItem } from "@/lib/products"

type CartSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
}

export function CartSheet({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
}: CartSheetProps) {
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const delivery = cartTotal > 0 && cartTotal < 5000 ? 150 : 0

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-full max-w-full gap-0 rounded-none p-0 sm:max-w-[480px]"
        data-lenis-prevent
      >
        <SheetHeader className="border-b bg-[#2b0f52] p-5 text-white">
          <SheetTitle className="flex items-center gap-2 text-white">
            <ShoppingBag className="size-5" />
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="text-white/70">
            {totalItems} item{totalItems === 1 ? "" : "s"} ready for checkout
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <ShoppingBag className="size-16 text-slate-200" />
              <h3 className="mt-5 text-xl font-black">Your cart is empty</h3>
              <p className="mt-2 max-w-xs text-sm text-slate-500">
                Search or browse the product rails to add gear to your setup.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-[8px] border border-[#eeeeef] bg-white p-3"
                >
                  <div className="grid size-20 shrink-0 place-items-center rounded-[8px] bg-[#f5f5f6]">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-bold">{item.name}</p>
                    <p className="mt-1 text-sm font-black text-[#2b0f52]">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-xs"
                        className="rounded-[8px]"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-5 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-xs"
                        className="rounded-[8px]"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="size-3" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        className="ml-auto rounded-[8px] text-slate-400 hover:text-rose-500"
                        onClick={() => onUpdateQuantity(item.id, 0)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <SheetFooter className="border-t bg-white p-5">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-bold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery charge</span>
                <span className="font-bold">
                  {delivery === 0 ? "FREE" : formatPrice(delivery)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-black">Grand Total</span>
                <span className="font-black">
                  {formatPrice(cartTotal + delivery)}
                </span>
              </div>
            </div>
            <Button className="h-12 rounded-[8px] bg-[#101322] text-white hover:bg-[#f97316]">
              Checkout
            </Button>
            <p className="text-xs text-slate-500">
              By placing an order, you agree to {PLATFORM_NAME} terms and privacy policy.
            </p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
