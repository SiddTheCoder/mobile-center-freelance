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

const images = {
  drone: "/dji_drone.png",
  microphone: "/gaming_microphone.png",
  macbookAir:
    "https://www.apple.com/v/macbook-air/z/images/meta/macbook_air_mx__ez5y0k5yy7au_og.png?202605080834",
  iphone17Pro:
    "https://www.apple.com/v/iphone-17-pro/g/images/meta/iphone-17-pro_overview__eumhhclcpuaa_og.png?202606161406",
  iphone17:
    "https://www.apple.com/v/iphone-17/g/images/meta/iphone-17_overview__cg0rlzmbhl7m_og.png?202606161406",
  iphoneAir:
    "https://www.apple.com/v/iphone-air/g/images/meta/iphone-air_overview__dwhg6l117yqa_og.png?202606161406",
  samsungS26:
    "https://www.samsung.com/samsung/resources/global/galaxy-s26-ultra/common/images/galaxy-s26-ultra-thumbnail-image.jpg",
  samsungS26Hero:
    "https://image-us.samsung.com/us/smartphones/galaxy-s26-ultra/images/galaxy-s26-ultra-features-kv-mo.jpg?imbypass=true",
  honor600Pro:
    "https://www.honor.com/content/dam/honor/common/products/honor-600-pro/product/share.jpg",
  infinixNote60Pro:
    "https://d3o31au25zfcly.cloudfront.net/newfileadmin/usp/note/note-60-pro/sec1/regionKv/np_kv_mb.webp",
  xiaomi17:
    "https://i02.appmifile.com/513_operatorx_operatorx_xm/14/02/2026/7e83548bfc090e9eeaa224dc4bdae063.png",
  xiaomi17Alt:
    "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-17/pc/cbsuibuswegr87t387t76tfsvcshvaygu.png?q=100",
  oneplus15:
    "https://www.oneplus.com/content/dam/oneplus/2025/product-station/15/assets/images-kv-mo-phone-1-c46d36.png.webp",
  oppoFindX9Pro:
    "https://www.oppo.com/content/dam/oppo/common/mkt/v2-2/find-x9-series-en/listpage/find-x9-pro/480-600-white-v2.png",
  oppoFindX9Ultra:
    "https://www.oppo.com/content/dam/oppo_com/common/mkt/v2-2/find-x9-ultra-x9s-en/find-x9-ultra/list-page/480-600-brown.png",
  vivoX300Pro:
    "https://www.vivo.com/en/products/zip/img/pc/vivo-x300-pro.png",
  nothingPhone3:
    "https://cdn.shopify.com/s/files/1/0376/5420/0459/files/0000s_0011_Phone-3-white.png?v=1753434595",
  realmeGt8Pro:
    "https://image01.realme.net/general/20260507/1778148667036368eb467efee402ba73103155160d874.png?width=1080&height=1080&size=321173",
  tecnoCamon40Pro:
    "https://d13pvy8xd75yde.cloudfront.net/global/phones/camon40/camon-40-pro/white/assets/images-kv-7-bottom-pc-1.png",
  motorolaEdge70:
    "https://p1-ofp.static.pub/medias/27661657188_moto-edge-70-pdp-all-phones-color3-yo6jq2zi_202510110445001760437570956.png",
  rogPhone9:
    "https://dlcdnwebimgs.asus.com/gain/428A70F4-5A08-416A-8BDA-069DD27E28F4",
  logitechMxMaster3s:
    "https://resource.logitech.com/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png",
  sonyXm5:
    "https://d1ncau8tqf99kp.cloudfront.net/converted/103364_original_local_1200x1050_v3_converted.webp",
  sonicXenon2:
    "https://wifixlaptop.com.my/wp-content/uploads/2022/02/photo_2022-02-17_15-03-06-5.jpg",
  armaggeddonPulse7:
    "https://asianic.com.ph/products/i95qde1vqjxeq7yetqh1iv9db.gif",
  airpodsPro:
    "https://www.apple.com/v/airpods-pro/s/images/meta/og__c0ceegchesom_overview.png?202606102041",
  lgOled:
    "https://www.lg.com/us/images/tvs/md08003932/gallery/D-01.jpg",
  gopro:
    "https://static.gopro.com/assets/blta2b8522e5372af40/bltb1ec5bc1fd99f0b8/69ea22bfa8f0614ff4202202/09_dropdown-menu-mission1pro.png?width=768&quality=80&auto=webp&disable=upscale",
  fantechDesk:
    "https://fantechworld.com/cdn/shop/files/7ooEhcRs1634542321.png?v=1658886662",
  lenovoMonitor:
    "https://p4-ofp.static.pub/ShareResource/optimized/pdp/loq/loq-laptops/len101q0016/lenovo-loq-gen-11-15-ahp-bundle-series-tn.png?width=584&height=584",
  wanboProjector:
    "https://wanbo.cn/cdn/shop/files/Wanbo_brand_logo_on_blue_-_background_social_sharing_image_for_Wanbo_projector_website.png?v=1740919502",
  benqProjector:
    "https://image.benq.com/is/image/benqco/mh560-front?$ResponsivePreset$",
}

function gallery(...urls: string[]) {
  return urls
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
    image: images.macbookAir,
    gallery: gallery(images.macbookAir),
    badge: "New",
    specs: ["M3 chip", "18hr battery", "Liquid Retina", "8GB unified memory"],
    colors: ["Midnight", "Silver", "Starlight"],
    description:
      "A thin, fast everyday laptop for study, office work, and creator workflows with all-day battery life.",
  },
  {
    id: "iphone-17-pro-max",
    name: "Apple iPhone 17 Pro Max 256GB Cosmic Orange",
    brand: "Apple",
    category: "Smart Phone",
    price: 244999,
    originalPrice: 264999,
    rating: 4.9,
    reviews: 126,
    image: images.iphone17Pro,
    gallery: gallery(images.iphone17Pro, images.iphone17, images.iphoneAir),
    badge: "Latest",
    specs: ["A19 Pro", "48MP Pro Fusion", "8x optical-quality zoom", "256GB storage"],
    colors: ["Cosmic Orange", "Deep Blue", "Silver"],
    description:
      "Apple's latest pro iPhone with A19 Pro power, a 48MP Pro Fusion camera system, and a large Super Retina XDR display.",
  },
  {
    id: "iphone-17",
    name: "Apple iPhone 17 256GB Lavender",
    brand: "Apple",
    category: "Smart Phone",
    price: 159999,
    originalPrice: 174999,
    rating: 4.8,
    reviews: 174,
    image: images.iphone17,
    gallery: gallery(images.iphone17, images.iphone17Pro, images.iphoneAir),
    badge: "New",
    specs: ["A19 chip", "48MP Dual Fusion", "6.3-inch display", "256GB storage"],
    colors: ["Lavender", "Sage", "White", "Black"],
    description:
      "The newest standard iPhone with a 48MP Dual Fusion camera system, A19 performance, and a brighter everyday display.",
  },
  {
    id: "iphone-air",
    name: "Apple iPhone Air 256GB Sky Blue",
    brand: "Apple",
    category: "Smart Phone",
    price: 189999,
    originalPrice: 204999,
    rating: 4.8,
    reviews: 92,
    image: images.iphoneAir,
    gallery: gallery(images.iphoneAir, images.iphone17Pro, images.iphone17),
    badge: "Thin",
    specs: ["A19 Pro", "5.6mm body", "6.5-inch display", "48MP Fusion"],
    colors: ["Sky Blue", "Light Gold", "Cloud White", "Space Black"],
    description:
      "A thin, light iPhone with A19 Pro performance, titanium build, and a 48MP Fusion camera for everyday flagship use.",
  },
  {
    id: "samsung-s26-ultra",
    name: "Samsung Galaxy S26 Ultra 512GB Titanium Gray",
    brand: "Samsung",
    category: "Smart Phone",
    price: 219999,
    originalPrice: 239999,
    rating: 4.9,
    reviews: 151,
    image: images.samsungS26,
    gallery: gallery(images.samsungS26, images.samsungS26Hero),
    badge: "AI",
    specs: ["Snapdragon 8 Elite Gen 5", "200MP camera", "Galaxy AI", "512GB storage"],
    colors: ["Titanium Gray", "Titanium Black", "Silverblue"],
    description:
      "Samsung's latest Ultra flagship with Galaxy AI, a 200MP camera system, S Pen productivity, and elite mobile performance.",
  },
  {
    id: "samsung-s26-plus",
    name: "Samsung Galaxy S26+ 256GB Navy",
    brand: "Samsung",
    category: "Smart Phone",
    price: 169999,
    originalPrice: 184999,
    rating: 4.8,
    reviews: 83,
    image: images.samsungS26Hero,
    gallery: gallery(images.samsungS26Hero, images.samsungS26),
    badge: "New",
    specs: ["Galaxy AI", "50MP main", "6.7-inch display", "256GB storage"],
    colors: ["Navy", "Silver", "Mint"],
    description:
      "A premium Galaxy with a bright large display, AI camera tools, fast everyday performance, and polished flagship design.",
  },
  {
    id: "honor-600-pro",
    name: "HONOR 600 Pro 512GB Midnight Black",
    brand: "HONOR",
    category: "Smart Phone",
    price: 99999,
    originalPrice: 114999,
    rating: 4.7,
    reviews: 68,
    image: images.honor600Pro,
    gallery: gallery(images.honor600Pro),
    badge: "New",
    specs: ["Snapdragon 8 Elite", "200MP night camera", "7000mAh battery", "8000 nits display"],
    colors: ["Midnight Black", "Moonlight White", "Ocean Cyan"],
    description:
      "A camera-focused HONOR flagship with a 200MP night camera, large battery, and a bright display for media-heavy use.",
  },
  {
    id: "infinix-note-60-pro",
    name: "Infinix NOTE 60 Pro 5G 256GB Titanium Silver",
    brand: "Infinix",
    category: "Smart Phone",
    price: 52999,
    originalPrice: 59999,
    rating: 4.6,
    reviews: 112,
    image: images.infinixNote60Pro,
    gallery: gallery(images.infinixNote60Pro),
    badge: "Value",
    specs: ["Snapdragon 7s Gen 4", "144Hz 1.5K display", "90W charging", "6500mAh battery"],
    colors: ["Titanium Silver", "Obsidian Black", "Aurora Green"],
    description:
      "A value flagship-style Infinix phone with a high-refresh 1.5K display, fast charging, and a large battery.",
  },
  {
    id: "xiaomi-17",
    name: "Xiaomi 17 512GB Black",
    brand: "Xiaomi",
    category: "Smart Phone",
    price: 124999,
    originalPrice: 139999,
    rating: 4.8,
    reviews: 95,
    image: images.xiaomi17,
    gallery: gallery(images.xiaomi17, images.xiaomi17Alt),
    badge: "Leica",
    specs: ["Leica Summilux", "Light Fusion 950", "6330mAh battery", "100W charging"],
    colors: ["Black", "White", "Blue"],
    description:
      "A compact Xiaomi flagship with Leica optics, a Light Fusion sensor, and a large fast-charging battery.",
  },
  {
    id: "oneplus-15",
    name: "OnePlus 15 512GB Infinite Black",
    brand: "OnePlus",
    category: "Smart Phone",
    price: 119999,
    originalPrice: 134999,
    rating: 4.8,
    reviews: 76,
    image: images.oneplus15,
    gallery: gallery(images.oneplus15),
    badge: "Power",
    specs: ["Snapdragon 8 Elite Gen 5", "165Hz display", "7300mAh battery", "Triple 50MP camera"],
    colors: ["Infinite Black", "Sand Storm", "Ultra Violet"],
    description:
      "A performance-focused OnePlus flagship with a huge battery, high-refresh display, and triple 50MP camera setup.",
  },
  {
    id: "oppo-find-x9-pro",
    name: "OPPO Find X9 Pro 512GB Titanium Charcoal",
    brand: "OPPO",
    category: "Smart Phone",
    price: 139999,
    originalPrice: 154999,
    rating: 4.7,
    reviews: 64,
    image: images.oppoFindX9Pro,
    gallery: gallery(images.oppoFindX9Pro, images.oppoFindX9Ultra),
    badge: "Camera",
    specs: ["Dimensity 9500", "200MP Hasselblad Telephoto", "7500mAh battery", "80W SUPERVOOC"],
    colors: ["Titanium Charcoal", "Silk White"],
    description:
      "A premium OPPO camera phone with Hasselblad telephoto imaging, a large battery, and fast ColorOS performance.",
  },
  {
    id: "oppo-find-x9-ultra",
    name: "OPPO Find X9 Ultra 512GB Canyon Orange",
    brand: "OPPO",
    category: "Smart Phone",
    price: 174999,
    originalPrice: 194999,
    rating: 4.8,
    reviews: 41,
    image: images.oppoFindX9Ultra,
    gallery: gallery(images.oppoFindX9Ultra, images.oppoFindX9Pro),
    badge: "Ultra",
    specs: ["Snapdragon 8 Elite Gen 5", "2K 144Hz display", "200MP camera", "7050mAh battery"],
    colors: ["Canyon Orange", "Tundra Umber"],
    description:
      "OPPO's Ultra camera flagship with a sharp 2K display, high-end Snapdragon performance, and a long-lasting battery.",
  },
  {
    id: "vivo-x300-pro",
    name: "vivo X300 Pro 512GB Black",
    brand: "vivo",
    category: "Smart Phone",
    price: 159999,
    originalPrice: 174999,
    rating: 4.8,
    reviews: 58,
    image: images.vivoX300Pro,
    gallery: gallery(images.vivoX300Pro),
    badge: "ZEISS",
    specs: ["Dimensity 9500", "200MP ZEISS APO Telephoto", "6510mAh battery", "90W FlashCharge"],
    colors: ["Black", "Brown", "White"],
    description:
      "A ZEISS-tuned vivo flagship with strong telephoto imaging, Dimensity 9500 performance, and fast charging.",
  },
  {
    id: "nothing-phone-3",
    name: "Nothing Phone (3) 512GB White",
    brand: "Nothing",
    category: "Smart Phone",
    price: 104999,
    originalPrice: 119999,
    rating: 4.6,
    reviews: 79,
    image: images.nothingPhone3,
    gallery: gallery(images.nothingPhone3),
    badge: "Glyph",
    specs: ["Snapdragon 8s Gen 4", "Four 50MP cameras", "AMOLED display", "Glyph Matrix"],
    colors: ["White", "Black"],
    description:
      "A distinctive Nothing flagship with a clean transparent design, Glyph Matrix notifications, and a strong 50MP camera system.",
  },
  {
    id: "realme-gt-8-pro",
    name: "realme GT 8 Pro 512GB White",
    brand: "realme",
    category: "Smart Phone",
    price: 92999,
    originalPrice: 104999,
    rating: 4.7,
    reviews: 54,
    image: images.realmeGt8Pro,
    gallery: gallery(images.realmeGt8Pro),
    badge: "RICOH",
    specs: ["Snapdragon 8 Elite Gen 5", "200MP telephoto", "7000mAh battery", "120W charge"],
    colors: ["White", "Black", "Green"],
    description:
      "realme's imaging flagship with a RICOH-tuned camera system, elite Snapdragon performance, and a huge fast-charging battery.",
  },
  {
    id: "tecno-camon-40-pro",
    name: "TECNO CAMON 40 Pro 5G 256GB White",
    brand: "TECNO",
    category: "Smart Phone",
    price: 42999,
    originalPrice: 49999,
    rating: 4.5,
    reviews: 61,
    image: images.tecnoCamon40Pro,
    gallery: gallery(images.tecnoCamon40Pro),
    badge: "AI",
    specs: ["50MP AF selfie", "5200mAh battery", "45W charge", "Curved AMOLED"],
    colors: ["White", "Black", "Green"],
    description:
      "A stylish TECNO phone focused on AI camera features, a curved screen, and strong battery life at a midrange price.",
  },
  {
    id: "motorola-edge-70",
    name: "motorola edge 70 512GB Cloud Dancer",
    brand: "Motorola",
    category: "Smart Phone",
    price: 84999,
    originalPrice: 94999,
    rating: 4.6,
    reviews: 48,
    image: images.motorolaEdge70,
    gallery: gallery(images.motorolaEdge70),
    badge: "Slim",
    specs: ["Snapdragon 7 Gen 4", "50MP triple camera", "512GB storage", "159g body"],
    colors: ["Cloud Dancer", "Lily Pad", "Gadget Gray"],
    description:
      "A slim Motorola phone with moto ai, a 50MP camera system, generous storage, and a lightweight body.",
  },
  {
    id: "asus-rog-phone-9",
    name: "ASUS ROG Phone 9 512GB Phantom Black",
    brand: "ASUS",
    category: "Smart Phone",
    price: 184999,
    originalPrice: 204999,
    rating: 4.7,
    reviews: 71,
    image: images.rogPhone9,
    gallery: gallery(images.rogPhone9),
    badge: "Gaming",
    specs: ["Snapdragon 8 Elite", "185Hz AMOLED", "5800mAh battery", "AirTrigger controls"],
    colors: ["Phantom Black", "Storm White"],
    description:
      "A gaming-first ASUS ROG phone with high-refresh visuals, shoulder controls, and flagship Snapdragon performance.",
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
    image: images.iphone17Pro,
    gallery: gallery(images.iphone17Pro, images.iphone17, images.iphoneAir),
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
    image: images.samsungS26,
    gallery: gallery(images.samsungS26, images.samsungS26Hero),
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
    image: images.sonyXm5,
    gallery: gallery(
      images.sonyXm5,
      "https://d1ncau8tqf99kp.cloudfront.net/PDP/Audio/Headphones/WH-1000XM5/v1/desktop/1.jpg",
      "https://d1ncau8tqf99kp.cloudfront.net/PDP/Audio/Headphones/WH-1000XM5/v1/desktop/4.jpg"
    ),
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
    gallery: gallery(
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_d206f02e72_6f218a20f0539554.png"
    ),
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
    image: images.logitechMxMaster3s,
    gallery: gallery(images.logitechMxMaster3s),
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
    image: images.lgOled,
    gallery: gallery(images.lgOled),
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
    image: images.airpodsPro,
    gallery: gallery(images.airpodsPro),
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
    image: images.rogPhone9,
    gallery: gallery(images.rogPhone9),
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
    image: images.gopro,
    gallery: gallery(images.gopro),
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
    image: images.infinixNote60Pro,
    gallery: gallery(images.infinixNote60Pro),
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
    image: images.fantechDesk,
    gallery: gallery(images.fantechDesk),
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
    image: images.lenovoMonitor,
    gallery: gallery(images.lenovoMonitor),
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
    image: images.lenovoMonitor,
    gallery: gallery(images.lenovoMonitor),
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
    image: images.lgOled,
    gallery: gallery(images.lgOled),
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
    image: images.sonicXenon2,
    gallery: gallery(images.sonicXenon2),
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
    image: images.armaggeddonPulse7,
    gallery: gallery(images.armaggeddonPulse7),
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
    image: images.benqProjector,
    gallery: gallery(images.benqProjector),
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
    image: images.wanboProjector,
    gallery: gallery(images.wanboProjector),
    specs: ["1080p Full HD", "Android OS built-in", "Keystone correction"],
    colors: ["White", "Black"],
    description: "Smart mini projector with Full HD resolution and built-in streaming apps.",
  },
  {
    id: "dji-lito-1",
    name: "DJI Lito 1 Fly More Combo with RC-N3 | Ultra-Light Foldable Drone | 48MP 1/2\" CMOS",
    brand: "DJI",
    category: "Drone",
    price: 76499,
    originalPrice: 81499,
    rating: 4.8,
    reviews: 43,
    image: images.drone,
    gallery: gallery(images.drone),
    badge: "6% OFF",
    specs: ["48MP 1/2\" CMOS", "Ultra-light foldable", "RC-N3 Remote", "34-min flight time"],
    colors: ["Gray"],
    description: "A compact, lightweight, and powerful foldable drone with a 48MP camera for stunning aerial shots."
  },
  {
    id: "dji-lito-x1",
    name: "DJI Lito X1 Fly More Combo with RC-N3 | 1/1.3\" 48MP CMOS f/1.7 | 4K/100fps",
    brand: "DJI",
    category: "Drone",
    price: 99499,
    originalPrice: 101499,
    rating: 4.9,
    reviews: 28,
    image: images.drone,
    gallery: gallery(images.drone),
    badge: "2% OFF",
    specs: ["1/1.3\" 48MP CMOS", "4K/100fps HDR Video", "Omnidirectional sensing", "45-min flight time"],
    colors: ["Gray"],
    description: "Next-gen DJI foldable drone with pro-grade low-light imaging and omnidirectional obstacle sensing."
  },
  {
    id: "dji-lito-x1-rc2",
    name: "DJI Lito X1 Fly More Combo with RC 2 Remote | 4K HDR Video | LiDAR obstacle sensing",
    brand: "DJI",
    category: "Drone",
    price: 113999,
    originalPrice: 117499,
    rating: 4.9,
    reviews: 35,
    image: images.drone,
    gallery: gallery(images.drone),
    badge: "3% OFF",
    specs: ["RC 2 Remote with screen", "LiDAR obstacle sensing", "4K HDR Video", "ActiveTrack 360"],
    colors: ["Gray"],
    description: "Equipped with the RC 2 screen remote, this DJI drone features advanced LiDAR sensing for total flight safety."
  },
  {
    id: "dji-lito-x1-plus",
    name: "DJI Lito X1 Fly More Combo Plus with RC 2 Remote| 48MP Camera | 4K/100fps HDR",
    brand: "DJI",
    category: "Drone",
    price: 128999,
    originalPrice: 131499,
    rating: 5.0,
    reviews: 17,
    image: images.drone,
    gallery: gallery(images.drone),
    badge: "2% OFF",
    specs: ["Flight battery plus", "RC 2 Remote", "48MP Camera", "51-min max flight time"],
    colors: ["Gray"],
    description: "The ultimate drone bundle featuring the DJI RC 2 and high-capacity batteries for extended flight sessions."
  },
  {
    id: "antigravity-a1",
    name: "ANTIGRAVITY A1 8K 360 Drone Standard Bundle | Dual-Lens 8K 360° Camera",
    brand: "ANTIGRAVITY",
    category: "Drone",
    price: 224999,
    originalPrice: 244999,
    rating: 5.0,
    reviews: 12,
    image: images.drone,
    gallery: gallery(images.drone),
    badge: "8% OFF",
    specs: ["Dual-Lens 8K Camera", "360° capture", "Active tracking", "Carbon fiber body"],
    colors: ["Carbon Black"],
    description: "A premium 8K 360-degree capture drone engineered by ANTIGRAVITY for high-end cinematography."
  },
  {
    id: "fifine-a6t",
    name: "FIFINE AmpliGame A6T | USB Condenser Gaming Microphone | Cardioid Polar Pattern | RGB Lighting | Boom Arm Stand",
    brand: "Fifine",
    category: "Microphone",
    price: 7999,
    originalPrice: 8499,
    rating: 4.8,
    reviews: 142,
    image: images.microphone,
    gallery: gallery(images.microphone),
    badge: "6% OFF",
    specs: ["USB plug & play", "Cardioid pattern", "RGB gradient", "Boom arm stand included"],
    colors: ["Black", "White", "Pink"],
    description: "An all-in-one USB microphone kit designed for gamers, streamers, and podcasters with plug-and-play simplicity and vibrant RGB lighting."
  },
  {
    id: "fifine-am8",
    name: "FIFINE AmpliGame AM8 | Dynamic USB/XLR Hybrid Microphone | Cardioid Polar Pattern | RGB Lighting | Desktop Stand",
    brand: "Fifine",
    category: "Microphone",
    price: 9999,
    originalPrice: 10999,
    rating: 4.7,
    reviews: 89,
    image: images.microphone,
    gallery: gallery(images.microphone),
    badge: "9% OFF",
    specs: ["USB & XLR outputs", "Dynamic capsule", "RGB base", "Tap-to-mute button"],
    colors: ["Black", "White"],
    description: "A hybrid USB/XLR dynamic microphone ideal for upgrading your recording setup with high quality sound."
  },
  {
    id: "fifine-k688",
    name: "FIFINE Amplitank K688 | Dynamic XLR/USB Hybrid Microphone | Cardioid Polar Pattern | Tap-to-Mute | Gain Control",
    brand: "Fifine",
    category: "Microphone",
    price: 12499,
    originalPrice: 13999,
    rating: 4.8,
    reviews: 57,
    image: images.microphone,
    gallery: gallery(images.microphone),
    badge: "10% OFF",
    specs: ["XLR/USB dynamic", "Gain controls", "Tap-to-mute", "Built-in shock mount"],
    colors: ["Black"],
    description: "A professional broadcast dynamic microphone offering clean audio capture, gain controls, and a metal build."
  },
  {
    id: "fantech-mcx01",
    name: "FANTECH MCX01 Leviosa Professional Condenser Microphone | Cardioid Pattern | USB Connection | Tripod Stand",
    brand: "Fantech",
    category: "Microphone",
    price: 4999,
    originalPrice: 5999,
    rating: 4.6,
    reviews: 74,
    image: images.microphone,
    gallery: gallery(images.microphone),
    badge: "16% OFF",
    specs: ["Cardioid pattern", "USB Connection", "Tripod stand", "Echo & volume control"],
    colors: ["Black"],
    description: "Leviosa professional condenser microphone with echo adjustment knobs, perfect for discord and voiceovers."
  },
  {
    id: "fantech-mcx03",
    name: "FANTECH MCX03 Leviosa Go | Portable USB Condenser Microphone | Noise Cancelling | Travel Pouch",
    brand: "Fantech",
    category: "Microphone",
    price: 5499,
    originalPrice: 6499,
    rating: 4.7,
    reviews: 38,
    image: images.microphone,
    gallery: gallery(images.microphone),
    badge: "15% OFF",
    specs: ["Noise reduction", "USB-C interface", "Travel pouch", "Mute button"],
    colors: ["Black"],
    description: "A compact and portable condenser microphone with built-in active noise reduction for recording on the go."
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

export const phoneBrandFilters = [
  { slug: "smart-phones", label: "All Phones", brand: undefined },
  { slug: "iphone", label: "iPhone", brand: "Apple" },
  { slug: "samsung", label: "Samsung", brand: "Samsung" },
  { slug: "infinix", label: "Infinix", brand: "Infinix" },
  { slug: "honor", label: "HONOR", brand: "HONOR" },
  { slug: "xiaomi", label: "Xiaomi", brand: "Xiaomi" },
  { slug: "oneplus", label: "OnePlus", brand: "OnePlus" },
  { slug: "oppo", label: "OPPO", brand: "OPPO" },
  { slug: "vivo", label: "vivo", brand: "vivo" },
  { slug: "nothing", label: "Nothing", brand: "Nothing" },
  { slug: "realme", label: "realme", brand: "realme" },
  { slug: "tecno", label: "TECNO", brand: "TECNO" },
  { slug: "motorola", label: "Motorola", brand: "Motorola" },
  { slug: "asus", label: "ASUS ROG", brand: "ASUS" },
] as const

export type PhoneBrandFilter = (typeof phoneBrandFilters)[number]

export type ProductSection = {
  slug: string
  label: string
  title: string
  eyebrow: string
  description: string
  brand?: string
  category?: string
  categories?: string[]
  productIds?: string[]
  dealOnly?: boolean
}

const phoneProductSections: ProductSection[] = phoneBrandFilters.map((filter) => ({
  slug: filter.slug,
  label: filter.label,
  title:
    filter.slug === "smart-phones"
      ? "Latest Phones"
      : `Latest ${filter.label} Phones`,
  eyebrow: filter.slug === "smart-phones" ? "All latest brands" : filter.label,
  description:
    filter.slug === "smart-phones"
      ? "Browse the newest phones across iPhone, Samsung, Infinix, HONOR, Xiaomi, OnePlus, OPPO, vivo, Nothing, realme, TECNO, Motorola, and ASUS ROG."
      : `Explore the latest ${filter.label} phones available in the current demo catalog.`,
  brand: "brand" in filter ? filter.brand : undefined,
}))

const categoryProductSections: ProductSection[] = [
  {
    slug: "laptops",
    label: "Laptops",
    title: "Laptops & Work Machines",
    eyebrow: "Computing",
    description:
      "Browse laptops and performance machines for office, study, gaming, and creator workflows.",
    category: "Laptop",
  },
  {
    slug: "tech-accessories",
    label: "Tech Accessories",
    title: "Tech Accessories",
    eyebrow: "Accessories",
    description:
      "Keyboards, mice, desks, cameras, audio gear, projectors, and useful setup upgrades.",
    categories: ["PC Components", "Accessories", "Camera", "Earbuds", "Headphone", "Projector"],
  },
  {
    slug: "audio",
    label: "Audio",
    title: "Audio Gear",
    eyebrow: "Audio",
    description:
      "Earbuds, headphones, and gaming headsets for calls, music, travel, and play.",
    categories: ["Earbuds", "Headphone"],
  },
  {
    slug: "monitors",
    label: "Monitors",
    title: "Monitors & Displays",
    eyebrow: "Displays",
    description:
      "Gaming monitors, OLED TVs, and everyday displays for desk and entertainment setups.",
    category: "Monitor",
  },
  {
    slug: "projectors",
    label: "Projectors",
    title: "Projectors",
    eyebrow: "Home theatre",
    description:
      "Portable and business projectors for meetings, football nights, and home cinema.",
    category: "Projector",
  },
  {
    slug: "world-cup",
    label: "World Cup",
    title: "World Cup Special Offer",
    eyebrow: "Bundle picks",
    description:
      "Projectors, screens, laptops, cameras, and setup gear selected for match-day viewing.",
    productIds: ["wanbo-t2-max", "benq-mh560", "lg-oled-55", "lenovo-gaming-24", "gopro-hero12"],
  },
  {
    slug: "deals",
    label: "Deals",
    title: "Limited Time Deals",
    eyebrow: "Offers",
    description:
      "Discounted phones, laptops, accessories, displays, and audio products available in the demo catalog.",
    dealOnly: true,
  },
  {
    slug: "drones",
    label: "Drones",
    title: "Cinematic Drones",
    eyebrow: "Flying Cameras",
    description: "Explore the skies with our selection of smart quadcopters and elite video drones.",
    category: "Drone",
  },
  {
    slug: "microphones",
    label: "Microphones",
    title: "Studio & Gaming Microphones",
    eyebrow: "Audio Recording",
    description: "High-fidelity USB and XLR microphones for streaming, voiceovers, podcasting, and gaming.",
    category: "Microphone",
  },
]

export const productSections: ProductSection[] = [
  ...phoneProductSections,
  ...categoryProductSections,
]

export function getPhoneProducts(brand?: string) {
  return products.filter(
    (product) =>
      product.category === "Smart Phone" &&
      (!brand || product.brand.toLowerCase() === brand.toLowerCase())
  )
}

export function getProductSectionBySlug(slug: string) {
  return productSections.find((section) => section.slug === slug)
}

export function getProductsForSection(slug: string) {
  const section = getProductSectionBySlug(slug)
  if (!section) return []

  if (section.productIds) {
    return section.productIds
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product))
  }

  if (section.dealOnly) {
    return products.filter((product) => product.originalPrice && !product.soldOut)
  }

  if (section.category) {
    return products.filter((product) => product.category === section.category)
  }

  if (section.categories) {
    return products.filter((product) => section.categories?.includes(product.category))
  }

  return getPhoneProducts(section.brand)
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
