import { activeClient } from "@/clients"

const FALLBACK_LOGO_SRC = "/lotus-point-icon-nobg.png"

const availableLogoSources = new Set([
  "/demo-store-icon-big.png",
  "/lotus-point-icon-big.png",
  "/lotus-point-icon-nobg.png",
])

export const PLATFORM_NAME = activeClient.shopName

export const PLATFORM_LOGO_SRC = availableLogoSources.has(activeClient.icon)
  ? activeClient.icon
  : FALLBACK_LOGO_SRC

export const PLATFORM_LOCATION = activeClient.location

export const PLATFORM_GOOGLE_MAPS_URL = activeClient.googleMapsUrl

export const PLATFORM_GOOGLE_MAPS_EMBED_URL = activeClient.googleMapsEmbedUrl

export const PLATFORM_PHONE = activeClient.phone

export const PLATFORM_EMAIL = activeClient.email

export const CART_STORAGE_KEY = "lotus_mobile_point_cart"
