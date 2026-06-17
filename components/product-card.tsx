"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ChevronRight, Heart, ShoppingCart, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { discountFor, formatPrice, type Product } from "@/lib/products"

type ProductCardProps = {
  product: Product
  compact?: boolean
  onAdd?: (product: Product) => void
}

export function ProductCard({ product, compact = false, onAdd }: ProductCardProps) {
  const discount = discountFor(product)

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      className="h-full"
    >
      <Card
        className={cn(
          "h-full gap-0 rounded-[8px] border border-[#ececf1] bg-white py-0 shadow-sm ring-0 transition hover:border-[#f97316]/30 hover:shadow-lg",
          product.soldOut && "opacity-55 grayscale"
        )}
      >
        <Link
          href={`/product/${product.id}`}
          className={cn(
            "group relative flex w-full items-center justify-center overflow-hidden rounded-t-[8px] bg-[#f5f5f6]",
            compact ? "h-48" : "h-60 md:h-72"
          )}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-108"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {discount && (
              <Badge className="rounded-[6px] bg-[#f97316] text-white">
                {discount}% OFF
              </Badge>
            )}
            {product.badge && (
              <Badge className="rounded-[6px] bg-[#2b0f52] text-white">
                {product.badge}
              </Badge>
            )}
          </div>
          {product.soldOut && (
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-white/80 py-2 text-center text-lg font-black text-rose-400">
              Sold Out
            </span>
          )}
          <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-[8px] bg-white text-[#2b0f52] opacity-0 shadow-sm transition group-hover:opacity-100">
            <ChevronRight className="size-4" />
          </span>
        </Link>
        <CardContent className="flex flex-1 flex-col px-4 py-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f97316]">
              {product.brand}
            </p>
            <button
              type="button"
              aria-label={`Add ${product.name} to wishlist`}
              className="grid size-7 place-items-center rounded-[8px] text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
            >
              <Heart className="size-4" />
            </button>
          </div>
          <Link
            href={`/product/${product.id}`}
            className={cn(
              "line-clamp-2 min-h-11 font-semibold leading-snug text-[#101322] hover:text-[#f97316]",
              compact ? "text-sm" : "text-base"
            )}
          >
            {product.name}
          </Link>
          {!compact && (
            <div className="mt-3 flex flex-wrap gap-1">
              {product.specs.slice(0, 2).map((spec) => (
                <span
                  key={spec}
                  className="rounded-[6px] bg-[#f6f1ec] px-2 py-1 text-[11px] font-medium text-slate-600"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  "size-3.5",
                  index < Math.round(product.rating)
                    ? "fill-[#f97316] text-[#f97316]"
                    : "fill-slate-200 text-slate-200"
                )}
              />
            ))}
            <span className="ml-1 text-xs text-slate-400">
              ({product.reviews})
            </span>
          </div>
          <div className="mt-auto flex items-end justify-between gap-3 pt-3">
            <div>
              <p className={cn("font-black text-[#101322]", compact ? "text-lg" : "text-xl")}>
                {formatPrice(product.price)}
              </p>
              {product.originalPrice && (
                <p className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
            {onAdd && (
              <Button
                type="button"
                disabled={product.soldOut}
                onClick={() => onAdd(product)}
                size="icon"
                className="rounded-[8px] bg-[#2b0f52] text-white hover:bg-[#f97316]"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="size-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
