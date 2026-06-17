export type Product = {
  id: string
  name: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  gallery: string[]
  badge?: string
  soldOut?: boolean
  specs: string[]
  colors: string[]
  description: string
}

export type CartItem = Product & {
  quantity: number
}

export const products: Product[] = [
  {
    id: "macbook-air-m3",
    name: "Apple MacBook Air 13-inch M3 8GB/256GB Midnight",
    brand: "Apple",
    category: "Laptop",
    price: 189999,
    originalPrice: 209999,
    rating: 4.9,
    reviews: 218,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_7d413a689e_a024efb545f5da31.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_7d413a689e_a024efb545f5da31.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_eedd1c3a7a_bbcfc0bf587cf19a.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_408f420852_70cb10d2e94bd351.png",
    ],
    badge: "New",
    specs: ["M3 chip", "18hr battery", "Liquid Retina", "8GB unified memory"],
    colors: ["Midnight", "Silver", "Starlight"],
    description:
      "A thin, fast everyday laptop for study, office work, and creator workflows with all-day battery life.",
  },
  {
    id: "iphone-15-pro",
    name: "Apple iPhone 15 Pro 256GB Natural Titanium",
    brand: "Apple",
    category: "Smart Phone",
    price: 179999,
    originalPrice: 199999,
    rating: 4.8,
    reviews: 412,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fc51d7952f_5e8b3ea510d43dbe.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fc51d7952f_5e8b3ea510d43dbe.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_752aa93e4a_958ba13686c6d1a9.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_567c9a899e_ea4e8707e7287e30.png",
    ],
    badge: "Hot",
    specs: ["A17 Pro", "48MP camera", "USB-C", "Titanium build"],
    colors: ["Natural", "Blue", "Black"],
    description:
      "A flagship iPhone with titanium construction, fast A17 Pro performance, and a flexible pro camera system.",
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 512GB Titanium Black",
    brand: "Samsung",
    category: "Smart Phone",
    price: 189999,
    originalPrice: 214999,
    rating: 4.7,
    reviews: 328,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_24b8334659_e5c018b3c994b65e.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_24b8334659_e5c018b3c994b65e.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_24b8334659_4b0e170beb7a7f21.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_500c85ec9a_df8c697c7085429d.png",
    ],
    badge: "AI",
    specs: ["Galaxy AI", "200MP", "S Pen", "512GB storage"],
    colors: ["Black", "Violet", "Gray"],
    description:
      "Samsung's premium Android flagship with built-in AI tools, S Pen precision, and a high-resolution camera.",
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    brand: "Sony",
    category: "Headphone",
    price: 49999,
    originalPrice: 62999,
    rating: 4.8,
    reviews: 856,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_9e9d822318_955d2557e14ff237.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_9e9d822318_955d2557e14ff237.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_b43c84dc39_dcd9928f1e0e36a6.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_261628f51b_c81c7a0967fe9dea.png",
    ],
    badge: "ANC",
    specs: ["30hr battery", "Hi-Res audio", "Multipoint", "Adaptive ANC"],
    colors: ["Black", "Silver"],
    description:
      "Premium wireless headphones with excellent noise cancellation and comfort for travel, focus, and calls.",
  },
  {
    id: "dell-xps-15",
    name: "Dell XPS 15 9530 Core i7 16GB/512GB OLED",
    brand: "Dell",
    category: "Laptop",
    price: 249999,
    originalPrice: 279999,
    rating: 4.7,
    reviews: 134,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_d206f02e72_6f218a20f0539554.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_d206f02e72_6f218a20f0539554.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_02ac9eb80c_fd8ffad814b6707e.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_46d1c684b4_87ab3e0d0341f134.png",
    ],
    badge: "Premium",
    specs: ["OLED 3.5K", "Intel i7", "RTX graphics", "16GB RAM"],
    colors: ["Graphite", "Silver"],
    description:
      "A premium Windows laptop for creative workloads, display-sensitive work, and productivity.",
  },
  {
    id: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S Wireless Performance Mouse",
    brand: "Logitech",
    category: "PC Components",
    price: 12999,
    originalPrice: 16999,
    rating: 4.9,
    reviews: 2341,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2d5fbac152_464b19ac3186b14e.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2d5fbac152_464b19ac3186b14e.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_831577449e_6ac0756b45b93f74.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_119853faf6_22d9f2fe35fe8ed5.png",
    ],
    badge: "Flash",
    specs: ["8000 DPI", "Ergonomic", "70-day battery", "Quiet clicks"],
    colors: ["Graphite", "Pale Gray"],
    description:
      "An ergonomic productivity mouse with precise tracking, quiet clicks, and multi-device workflow support.",
  },
  {
    id: "lg-oled-55",
    name: "LG 55-inch C3 OLED evo 4K Smart TV",
    brand: "LG",
    category: "Monitor",
    price: 299999,
    originalPrice: 349999,
    rating: 4.8,
    reviews: 89,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c3f124c435_27aba7988df0bb3a.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c3f124c435_27aba7988df0bb3a.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_500c85ec9a_df8c697c7085429d.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_02ac9eb80c_fd8ffad814b6707e.png",
    ],
    badge: "4K",
    specs: ["OLED evo", "120Hz", "Dolby Vision", "Smart TV"],
    colors: ["Black"],
    description:
      "A high-end OLED screen for cinematic entertainment, gaming, and premium living-room setups.",
  },
  {
    id: "airpods-pro-2",
    name: "Apple AirPods Pro 2nd Generation with MagSafe",
    brand: "Apple",
    category: "Earbuds",
    price: 39999,
    originalPrice: 44999,
    rating: 4.8,
    reviews: 623,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_181a2f3663_0d08569ab5b28569.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_181a2f3663_0d08569ab5b28569.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_51be60b676_a8a3ef079bcd5619.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_b43c84dc39_dcd9928f1e0e36a6.png",
    ],
    specs: ["H2 chip", "Adaptive audio", "USB-C case", "MagSafe charging"],
    colors: ["White"],
    description:
      "Compact Apple earbuds with adaptive audio, strong ANC, and easy switching across Apple devices.",
  },
  {
    id: "asus-rog-phone-8",
    name: "ASUS ROG Phone 8 Pro 512GB Phantom Black",
    brand: "ASUS",
    category: "Gaming",
    price: 199999,
    originalPrice: 219999,
    rating: 4.7,
    reviews: 203,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_a3aed3a62d_e2c79f33261ed0d6.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_a3aed3a62d_e2c79f33261ed0d6.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_46d1c684b4_87ab3e0d0341f134.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_408f420852_70cb10d2e94bd351.png",
    ],
    badge: "Gaming",
    specs: ["165Hz", "Snapdragon 8 Gen 3", "Aero cooling", "512GB storage"],
    colors: ["Black"],
    description:
      "A powerful gaming phone with high refresh visuals, cooling-focused design, and flagship performance.",
  },
  {
    id: "gopro-hero12",
    name: "GoPro HERO12 Black 5.3K Action Camera",
    brand: "GoPro",
    category: "Camera",
    price: 69999,
    originalPrice: 79999,
    rating: 4.6,
    reviews: 289,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_119853faf6_22d9f2fe35fe8ed5.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_119853faf6_22d9f2fe35fe8ed5.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_35c3609dd5_55694a8b53d1833e.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_261628f51b_c81c7a0967fe9dea.png",
    ],
    badge: "Creator",
    specs: ["5.3K video", "27MP", "HyperSmooth 6.0", "Waterproof"],
    colors: ["Black"],
    description:
      "A compact action camera for creators, travel, outdoor footage, and stabilized high-resolution video.",
  },
  {
    id: "infinix-smart-10",
    name: "Infinix Smart 10 | 6.67\" HD+ (720x1600) Display | Unisoc T7250 Chipset | 4GB RAM + 64GB Storage | 8MP Main Camera | 5000mAh Battery",
    brand: "Infinix",
    category: "Smart Phone",
    price: 12999,
    originalPrice: 14999,
    rating: 4.5,
    reviews: 128,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fc51d7952f_5e8b3ea510d43dbe.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fc51d7952f_5e8b3ea510d43dbe.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_752aa93e4a_958ba13686c6d1a9.png",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_567c9a899e_ea4e8707e7287e30.png",
    ],
    badge: "Sold Out",
    soldOut: true,
    specs: ["6.67\" HD+ (720x1600) Display", "Unisoc T7250 Chipset", "4GB RAM + 64GB Storage", "8MP Main Camera", "5000mAh Battery"],
    colors: ["Black", "Blue", "Gold", "Grey"],
    description: "A budget-friendly smartphone with a large display, long-lasting battery, and reliable performance.",
  },
  {
    id: "fantech-wgd01",
    name: "FANTECH WGD01 Electric Adjustable Standing Desk",
    brand: "Fantech",
    category: "Accessories",
    price: 25499,
    originalPrice: 29999,
    rating: 4.8,
    reviews: 45,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2d5fbac152_464b19ac3186b14e.png",
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2d5fbac152_464b19ac3186b14e.png",
    ],
    specs: ["140x60cm Carbon Fiber Surface", "Height Adjustable 73-118cm", "2 Memory Buttons", "Single Motor"],
    colors: ["Black", "White"],
    description: "FANTECH WGD01 Electric Adjustable Standing Desk with premium carbon fiber top, height presets, and stable lifting.",
  },
  {
    id: "lenovo-gaming-24",
    name: "Lenovo 24-inch Gaming Monitor",
    brand: "Lenovo",
    category: "Monitor",
    price: 25000,
    originalPrice: 28000,
    rating: 4.7,
    reviews: 96,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c3f124c435_27aba7988df0bb3a.png",
    gallery: ["https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c3f124c435_27aba7988df0bb3a.png"],
    specs: ["24\" display", "144Hz refresh rate", "1ms response time"],
    colors: ["Black"],
    description: "High refresh rate gaming monitor with fast response time and vibrant colors.",
  },
  {
    id: "lenovo-gaming-27",
    name: "Lenovo 27-inch Gaming Monitor",
    brand: "Lenovo",
    category: "Monitor",
    price: 30000,
    originalPrice: 35000,
    rating: 4.8,
    reviews: 142,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c3f124c435_27aba7988df0bb3a.png",
    gallery: ["https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c3f124c435_27aba7988df0bb3a.png"],
    specs: ["27\" QHD display", "165Hz refresh rate", "IPS panel"],
    colors: ["Black"],
    description: "27-inch QHD gaming monitor with 165Hz refresh rate and IPS technology.",
  },
  {
    id: "acer-monitor-22",
    name: "Acer 21.5-inch Monitor",
    brand: "Acer",
    category: "Monitor",
    price: 15000,
    originalPrice: 18000,
    rating: 4.5,
    reviews: 88,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c3f124c435_27aba7988df0bb3a.png",
    gallery: ["https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c3f124c435_27aba7988df0bb3a.png"],
    specs: ["21.5\" Full HD", "IPS display", "Flicker-less"],
    colors: ["Black"],
    description: "Everyday monitor with Full HD resolution and eyesafe screen features.",
  },
  {
    id: "sonic-gear-xenon-2",
    name: "Sonic Gear Xenon 2 Headphone",
    brand: "Sonic Gear",
    category: "Headphone",
    price: 2000,
    originalPrice: 2500,
    rating: 4.4,
    reviews: 67,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_9e9d822318_955d2557e14ff237.png",
    gallery: ["https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_9e9d822318_955d2557e14ff237.png"],
    specs: ["Stereo audio", "Built-in mic", "Comfort pads"],
    colors: ["Black", "Grey"],
    description: "Budget stereo headphones with microphone for calls and casual listing.",
  },
  {
    id: "armaggeddon-pulse-7",
    name: "Armaggeddon Pulse 7 Gaming Headset",
    brand: "Armaggeddon",
    category: "Headphone",
    price: 2500,
    originalPrice: 3200,
    rating: 4.5,
    reviews: 119,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_9e9d822318_955d2557e14ff237.png",
    gallery: ["https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_9e9d822318_955d2557e14ff237.png"],
    specs: ["7.1 Surround sound", "RGB lighting", "Noise isolation mic"],
    colors: ["Black"],
    description: "Gaming headset with RGB lighting effects and surround sound audio.",
  },
  {
    id: "benq-mh560",
    name: "BenQ MH560 Projector",
    brand: "BenQ",
    category: "Projector",
    price: 95000,
    originalPrice: 110000,
    rating: 4.8,
    reviews: 54,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_119853faf6_22d9f2fe35fe8ed5.png",
    gallery: ["https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_119853faf6_22d9f2fe35fe8ed5.png"],
    specs: ["3800 ANSI Lumens", "Full HD resolution", "SmartEco mode"],
    colors: ["White"],
    description: "High brightness business and home projector with crisp Full HD image.",
  },
  {
    id: "wanbo-t2-max",
    name: "Wanbo T2 Max Projector",
    brand: "Wanbo",
    category: "Projector",
    price: 22000,
    originalPrice: 25000,
    rating: 4.6,
    reviews: 198,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_119853faf6_22d9f2fe35fe8ed5.png",
    gallery: ["https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_119853faf6_22d9f2fe35fe8ed5.png"],
    specs: ["1080p Full HD", "Android OS built-in", "Keystone correction"],
    colors: ["White", "Black"],
    description: "Smart mini projector with Full HD resolution and built-in streaming apps.",
  },
]

export function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-NP")}`
}

export function discountFor(product: Product) {
  if (!product.originalPrice) return null
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(product: Product, limit = 5) {
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        (candidate.category === product.category ||
          candidate.brand === product.brand)
    )
    .concat(products.filter((candidate) => candidate.id !== product.id))
    .filter(
      (candidate, index, list) =>
        list.findIndex((item) => item.id === candidate.id) === index
    )
    .slice(0, limit)
}
