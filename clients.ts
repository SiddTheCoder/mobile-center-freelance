export type Client = {
  shopName: string
  location: string
  icon: string
  googleMapsUrl: string
  googleMapsEmbedUrl: string
  phone: string
  email: string
}

export const clients: { [key: number]: Client } = {
  0: {
    shopName: "Lotus Point Mobile",
    location: "M8HX+QQ2, Kathmandu 44600",
    icon: "/lotus-point-icon-big.png",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=M8HX%2BQQ2%2C%20Kathmandu%2044600",
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=M8HX%2BQQ2%2C%20Kathmandu%2044600&z=17&output=embed",
    phone: "9708085445",
    email: "info@lotuspointmobile.com",
  },

  1: {
    shopName: "Demo Store",
    location: "M8HX+QQ2, Kathmandu 44600",
    icon: "/demo-store-icon-big.png",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=M8HX%2BQQ2%2C%20Kathmandu%2044600",
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=M8HX%2BQQ2%2C%20Kathmandu%2044600&z=17&output=embed",
    phone: "97080000000",
    email: "demo@online.com",
  }
  // Add more client shops here. The first object is used by the website.
}

export const activeClient = clients[1]
