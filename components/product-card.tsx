"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Star } from "lucide-react"

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
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full flex flex-col"
    >
      <Link
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
      </Link>

      <div className="flex flex-col pt-2.5 px-1">
        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
          <Star className="size-3 fill-[#f97316] text-[#f97316] stroke-[#f97316]" />
          <span>
            {product.reviews === 0 ? "Be first to review" : `${product.rating} (${product.reviews})`}
          </span>
        </div>
        <Link
          href={`/product/${product.id}`}
          className="mt-1 line-clamp-2 min-h-[36px] text-[13px] font-medium leading-snug text-[#101322] hover:text-[#f97316] transition-colors"
        >
          {product.name}
        </Link>
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
      </div>
    </motion.div>
  )
}

