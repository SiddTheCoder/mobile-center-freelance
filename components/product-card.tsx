"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Check, ShoppingCart, Star } from "lucide-react"

import { PrefetchLink } from "@/components/prefetch-link"
import { discountFor, formatPrice, type Product } from "@/lib/products"

type ProductCardProps = {
  product: Product
  compact?: boolean
  onAdd?: (product: Product) => void
}

export function ProductCard({ product, compact = false, onAdd }: ProductCardProps) {
  const discount = discountFor(product)
  const [justAdded, setJustAdded] = React.useState(false)
  const addedTimer = React.useRef<number | null>(null)

  React.useEffect(
    () => () => {
      if (addedTimer.current) window.clearTimeout(addedTimer.current)
    },
    []
  )

  const handleAdd = () => {
    if (!onAdd || product.soldOut) return

    onAdd(product)
    setJustAdded(true)
    if (addedTimer.current) window.clearTimeout(addedTimer.current)
    addedTimer.current = window.setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full flex flex-col"
    >
      <PrefetchLink
        href={`/product/${product.id}`}
        className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[16px] bg-[#f5f5f6] transition duration-300 hover:bg-[#ececf0]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
        />
        {discount && (
          <div className="absolute right-3 bottom-3 z-10">
            <span className="rounded-[6px] bg-white px-2 py-1 text-[10px] font-black text-[#f97316] shadow-sm tracking-wide">
              {discount}% OFF
            </span>
          </div>
        )}
        {product.soldOut && (
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-white/80 py-1.5 text-center text-xs font-black text-rose-500">
            Sold Out
          </span>
        )}
      </PrefetchLink>

      <div className="flex flex-col pt-2.5 px-1">
        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
          <Star className="size-3 fill-[#f97316] text-[#f97316] stroke-[#f97316]" />
          <span>
            {product.reviews === 0 ? "Be first to review" : `${product.rating} (${product.reviews})`}
          </span>
        </div>
        <PrefetchLink
          href={`/product/${product.id}`}
          className="mt-1 line-clamp-2 min-h-[36px] text-[13px] font-medium leading-snug text-[#101322] hover:text-[#f97316] transition-colors"
        >
          {product.name}
        </PrefetchLink>
        <div className="mt-2 flex flex-col gap-0.5">
          <p className="text-sm font-extrabold text-[#101322]">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-[11px] text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
        {onAdd && (
          <button
            type="button"
            onClick={handleAdd}
            disabled={product.soldOut}
            className="mt-2 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-[8px] bg-[#101322] px-3 text-xs font-black text-white shadow-sm transition hover:bg-[#f97316] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            {justAdded ? (
              <>
                <Check className="size-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="size-3.5" />
                {compact ? "Add" : "Add to Cart"}
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  )
}
