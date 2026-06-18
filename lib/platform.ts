import { activeClient } from "@/clients"

export const PLATFORM_NAME = activeClient.shopName

export const PLATFORM_LOGO_SRC = activeClient.icon

export const PLATFORM_LOCATION = activeClient.location

export const PLATFORM_GOOGLE_MAPS_URL = activeClient.googleMapsUrl

export const PLATFORM_GOOGLE_MAPS_EMBED_URL = activeClient.googleMapsEmbedUrl

export const PLATFORM_PHONE = activeClient.phone

export const PLATFORM_EMAIL = activeClient.email

export const CART_STORAGE_KEY = "demo_store_cart"
