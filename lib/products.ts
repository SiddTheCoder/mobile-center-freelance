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
    "id": "apple-iphone-15",
    "name": "Apple iPhone 15 128GB",
    "brand": "Apple",
    "category": "Smart Phone",
    "price": 119499,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/iPhone%2015%20black(3).webp",
    "gallery": [
      "https://cdn.hukut.com/iPhone%2015%20black(3).webp",
      "https://cdn.hukut.com/iPhone%2015%20green(3).webp",
      "https://cdn.hukut.com/iPhone%2015%20blue(1).webp",
      "https://cdn.hukut.com/iPhone%2015%20yellow(1).webp",
      "https://cdn.hukut.com/iPhone%2015%20blue(3).webp",
      "https://cdn.hukut.com/iPhone%2015%20pink(1).webp",
      "https://cdn.hukut.com/iPhone%2015%20yellow(3).webp",
      "https://cdn.hukut.com/iPhone%2015%20pink(3).webp",
      "https://cdn.hukut.com/iPhone%2015%20green(1).webp",
      "https://cdn.hukut.com/iPhone%2015%20black(1).webp"
    ],
    "specs": [
      "48MP sensor, the primary shooter does, however, have a higher resolution this time",
      "As part of the Apple iPhone 15 series , this Apple iPhone 15 is powered by the A16 Bionic chip.",
      "Design and Display The iPhone 14 and the iPhone 15 have the same design.",
      "In addition, the rear panel has a textured matte appearance thanks to polishing with nanocrystalline particles."
    ],
    "colors": [
      "Black",
      "Blue",
      "Green",
      "Yellow",
      "Pink"
    ],
    "description": "Apple iPhone 15 128GB is an Apple smartphone listed in Nepal at Rs. 119,499. Highlights include 48MP sensor, the primary shooter does, however, have a higher resolution this time and As part of the Apple iPhone 15 series, this Apple iPhone 15 is powered by the A16 Bionic chip. Available colors include Black, Blue, Green, Yellow, Pink. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "apple-iphone-16e",
    "name": "Apple iPhone 16e 8GB/128GB",
    "brand": "Apple",
    "category": "Smart Phone",
    "price": 105999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/Apple-iphone-16e-Price-in-Nepal.png1744176698913",
    "gallery": [
      "https://cdn.hukut.com/Apple-iphone-16e-Price-in-Nepal.png1744176698913",
      "https://cdn.hukut.com/Apple-iphone-16e-Price-in-Nepal.png1744176698771",
      "https://cdn.hukut.com/iPhone-16e-Black-Price-in-Nepal.png1744176698433",
      "https://cdn.hukut.com/iPhone-16e-Black-Price-in-Nepal.png1744176698636",
      "https://cdn.hukut.com/Apple-iphone-16e-Price-in-Nepal.png1744176699046",
      "https://cdn.hukut.com/iPhone-16e-Black-Price-in-Nepal.png1744176697819"
    ],
    "specs": [
      "6.1-inch Super Retina XDR OLED display with a resolution of 2532×1170 pixels at 460ppi",
      "A18 chip",
      "48MP wide-angle camera with a 2x optical zoom telephoto option and an f/1",
      "5W, though it lacks MagSafe accessories and fast wireless charging"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Apple iPhone 16e 8GB/128GB is an Apple smartphone listed in Nepal at Rs. 105,999. Highlights include 6.1-inch Super Retina XDR OLED display with a resolution of 2532×1170 pixels at 460ppi and A18 chip. Available colors include Black, White. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "apple-iphone-16",
    "name": "Apple iPhone 16 8GB/128GB",
    "brand": "Apple",
    "category": "Smart Phone",
    "price": 146599,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/apple-iphone-16-white.webp1728295063554",
    "gallery": [
      "https://cdn.hukut.com/apple-iphone-16-white.webp1728295063554",
      "https://cdn.hukut.com/apple-iphone-16-ultramarine.webp1728295063970",
      "https://cdn.hukut.com/apple-iphone-16-teal.webp1728295064492",
      "https://cdn.hukut.com/apple-iphone-16-black.webp1728295063000",
      "https://cdn.hukut.com/apple-iphone-16-white.webp1728295064862",
      "https://cdn.hukut.com/apple-iphone-16-black.webp1728295064096",
      "https://cdn.hukut.com/apple-iphone-16-ultramarine.webp1728295065216",
      "https://cdn.hukut.com/apple-iphone-16-teal.webp1728295065099",
      "https://cdn.hukut.com/apple-iphone-16-teal.webp1728295063843",
      "https://cdn.hukut.com/apple-iphone-16-ultramarine.webp1728295064621",
      "https://cdn.hukut.com/apple-iphone-16-black.webp1728295064749",
      "https://cdn.hukut.com/apple-iphone-16-pink.webp1728295064356",
      "https://cdn.hukut.com/apple-iphone-16-pink.webp1728295064975",
      "https://cdn.hukut.com/apple-iphone-16-white.webp1728295064224",
      "https://cdn.hukut.com/apple-iphone-16-pink.webp1728295063717"
    ],
    "specs": [
      "A18 chip",
      "AMOLED display delivers stunning visuals with rich colors and deep blacks",
      "As part of the Apple iPhone 16 series , this Apple iPhone 16 is powered by the A18 chip.",
      "Design The Apple iPhone 16 is a testament to sleek elegance."
    ],
    "colors": [
      "White",
      "Black",
      "Pink",
      "Teal",
      "Ultramarine"
    ],
    "description": "Apple iPhone 16 8GB/128GB is an Apple smartphone listed in Nepal at Rs. 146,599. Highlights include A18 chip and AMOLED display delivers stunning visuals with rich colors and deep blacks. Available colors include White, Black, Pink, Teal, Ultramarine. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "apple-iphone-17",
    "name": "Apple iPhone 17 8GB/256GB",
    "brand": "Apple",
    "category": "Smart Phone",
    "price": 165499,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/apple-iphone-17-mist-blue.webp1758092962317",
    "gallery": [
      "https://cdn.hukut.com/apple-iphone-17-mist-blue.webp1758092962317",
      "https://cdn.hukut.com/apple-iphone-17-lavender.webp1758092961833",
      "https://cdn.hukut.com/apple-iphone-17-sage.webp1758092961673",
      "https://cdn.hukut.com/apple-iphone-17-mist-blue.webp1758092961529",
      "https://cdn.hukut.com/apple-iphone-17-white.webp1758092962153",
      "https://cdn.hukut.com/apple-iphone-17-sage.webp1758092962449",
      "https://cdn.hukut.com/apple-iphone-17-black.webp1758092960676",
      "https://cdn.hukut.com/apple-iphone-17-lavender.webp1758092962596",
      "https://cdn.hukut.com/apple-iphone-17-black.webp1758092961984",
      "https://cdn.hukut.com/apple-iphone-17-white.webp1758092961300"
    ],
    "specs": [
      "6.3-inch LTPO OLED display with 120Hz ProMotion ensures smooth performance and better ef",
      "A19 chip",
      "48MP camera setup",
      "3692mAh battery reliable enough to handle a full day of calls, streaming, and photograp"
    ],
    "colors": [
      "Black",
      "White",
      "Mist Blue",
      "Sage",
      "Lavender"
    ],
    "description": "Apple iPhone 17 8GB/256GB is an Apple smartphone listed in Nepal at Rs. 165,499. Highlights include 6.3-inch LTPO OLED display with 120Hz ProMotion ensures smooth performance and better ef and A19 chip. Available colors include Black, White, Mist Blue, Sage, Lavender. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "apple-iphone-17-pro",
    "name": "Apple iPhone 17 Pro 12GB/256GB",
    "brand": "Apple",
    "category": "Smart Phone",
    "price": 236899,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/apple-iphone-17-pro-deep-blue.webp1758095135987",
    "gallery": [
      "https://cdn.hukut.com/apple-iphone-17-pro-deep-blue.webp1758095135987",
      "https://cdn.hukut.com/apple-iphone-17-pro-cosmic-orange.webp1758095136746",
      "https://cdn.hukut.com/apple-iphone-17-pro-deep-blue.webp1758095136894",
      "https://cdn.hukut.com/apple-iphone-17-pro-deep-blue.webp1758095136441",
      "https://cdn.hukut.com/apple-iphone-17-pro-cosmic-orange.webp1758095136291",
      "https://cdn.hukut.com/apple-iphone-17-pro-silver.webp1758095136148",
      "https://cdn.hukut.com/apple-iphone-17-pro-cosmic-orange.webp1758095135731",
      "https://cdn.hukut.com/apple-iphone-17-pro-silver.webp1758095136601",
      "https://cdn.hukut.com/apple-iphone-17-pro-silver.webp1758095135138"
    ],
    "specs": [
      "6.3-inch Super Retina XDR OLED display is one of those things you have to see to believe",
      "A19 Pro chip",
      "48MP lenses work together beautifully the main lens for everyday shots that feel real and balanced, the",
      "4200mAh) holds steady through long commutes, video calls, and photo sessions"
    ],
    "colors": [
      "Cosmic Orange",
      "Silver",
      "Deep Blue"
    ],
    "description": "Apple iPhone 17 Pro 12GB/256GB is an Apple smartphone listed in Nepal at Rs. 236,899. Highlights include 6.3-inch Super Retina XDR OLED display is one of those things you have to see to believe and A19 Pro chip. Available colors include Cosmic Orange, Silver, Deep Blue. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "apple-iphone-17-pro-max",
    "name": "Apple iPhone 17 Pro Max 12GB/256GB",
    "brand": "Apple",
    "category": "Smart Phone",
    "price": 247999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/apple-iphone-17-pro-max-silver.webp1758095958195",
    "gallery": [
      "https://cdn.hukut.com/apple-iphone-17-pro-max-silver.webp1758095958195",
      "https://cdn.hukut.com/apple-iphone-17-pro-max-cosmic-orange.webp1758095958756",
      "https://cdn.hukut.com/apple-iphone-17-pro-max-deep-blue.webp1758095958969",
      "https://cdn.hukut.com/apple-iphone-17-pro-max-silver.webp1758095959126",
      "https://cdn.hukut.com/apple-iphone-17-pro-max-cosmic-orange.webp1758095959263",
      "https://cdn.hukut.com/apple-iphone-17-pro-max-deep-blue.webp1758095959418",
      "https://cdn.hukut.com/apple-iphone-17-pro-max-silver.webp1758095959574",
      "https://cdn.hukut.com/apple-iphone-17-pro-max-deep-blue.webp1758095959891",
      "https://cdn.hukut.com/apple-iphone-17-pro-max-cosmic-orange.webp1758095960187",
      "https://cdn.hukut.com/apple-iphone-17-pro-max-deep-blue.webp1758095960350",
      "https://cdn.hukut.com/apple-iphone-17-pro-max-cosmic-orange.webp1758095959729",
      "https://cdn.hukut.com/apple-iphone-17-pro-max-silver.webp1758095960030"
    ],
    "specs": [
      "6.9-inch Super Retina XDR display lights up, you’ll understand why people keep talking a",
      "A19 Pro chip built on advanced 3nm architecture",
      "48MP lenses working together to make your everyday moments look cinematic that’s the iPhone 17 Pro Max c",
      "5000mAh) feels reliable, not exaggerated"
    ],
    "colors": [
      "Cosmic Orange",
      "Silver",
      "Deep Blue"
    ],
    "description": "Apple iPhone 17 Pro Max 12GB/256GB is an Apple smartphone listed in Nepal at Rs. 247,999. Highlights include 6.9-inch Super Retina XDR display lights up, you’ll understand why people keep talking a and A19 Pro chip built on advanced 3nm architecture. Available colors include Cosmic Orange, Silver, Deep Blue. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "oneplus-nord-ce-5",
    "name": "OnePlus Nord CE 5 8GB/256GB",
    "brand": "OnePlus",
    "category": "Smart Phone",
    "price": 53999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/oneplus-nord-ce-5-marble-mist.webp1752045169603",
    "gallery": [
      "https://cdn.hukut.com/oneplus-nord-ce-5-marble-mist.webp1752045169603",
      "https://cdn.hukut.com/oneplus-nord-ce-5-black-infinity.webp1752045170097",
      "https://cdn.hukut.com/oneplus-nord-ce-5-nexus-blue.webp1752045170307"
    ],
    "specs": [
      "6.77-inch AMOLED display with a 120Hz refresh rate ensures smooth visuals and vibrant col",
      "Dimensity 8350 processor",
      "50MP main sensor makes this OnePlus mobile reliable for photography",
      "7100mAh battery and 80W fast charging, the OnePlus Nord CE 5 stands out for battery per"
    ],
    "colors": [
      "Marble Mist",
      "Black Infinity",
      "Nexus Blue"
    ],
    "description": "OnePlus Nord CE 5 8GB/256GB is an OnePlus smartphone listed in Nepal at Rs. 53,999. Highlights include 6.77-inch AMOLED display with a 120Hz refresh rate ensures smooth visuals and vibrant col and Dimensity 8350 processor. Available colors include Marble Mist, Black Infinity, Nexus Blue. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "oneplus-nord-5",
    "name": "OnePlus Nord 5 8GB/256GB",
    "brand": "OnePlus",
    "category": "Smart Phone",
    "price": 73999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/OnePlusNord5-black.png1751970739880",
    "gallery": [
      "https://cdn.hukut.com/OnePlusNord5-black.png1751970739880",
      "https://cdn.hukut.com/OnePlusNord5-white.png1751970738797",
      "https://cdn.hukut.com/OnePlusNord5-blue.png1751970739520",
      "https://cdn.hukut.com/OnePlusNord5-black.png1751970739730",
      "https://cdn.hukut.com/OnePlusNord5-blue.png1751970740016",
      "https://cdn.hukut.com/OnePlusNord5-white.png1751970740168"
    ],
    "specs": [
      "6.83-inch AMOLED display with 144Hz refresh rate ensures ultra-smooth visuals",
      "Snapdragon 8s Gen 3 processor",
      "50MP main sensor and high-resolution front camera, enhances photography and selfies",
      "6800mAh battery and 80W fast charging, this OnePlus mobile provides strong battery life"
    ],
    "colors": [
      "Marble Sands",
      "Dry Ice",
      "Phantom Grey"
    ],
    "description": "OnePlus Nord 5 8GB/256GB is an OnePlus smartphone listed in Nepal at Rs. 73,999. Highlights include 6.83-inch AMOLED display with 144Hz refresh rate ensures ultra-smooth visuals and Snapdragon 8s Gen 3 processor. Available colors include Marble Sands, Dry Ice, Phantom Grey. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "oneplus-13r",
    "name": "OnePlus 13R 12GB/256GB",
    "brand": "OnePlus",
    "category": "Smart Phone",
    "price": 83998,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/OnePlus-13R-Astral-Trail-Price-in-nepal.png1739873670935",
    "gallery": [
      "https://cdn.hukut.com/OnePlus-13R-Astral-Trail-Price-in-nepal.png1739873670935",
      "https://cdn.hukut.com/OnePlus-13R-Nebula-Noir-Price-in-Nepal.png1739873671808"
    ],
    "specs": [
      "6.78-inch ProXDR OLED panel with a 1",
      "Snapdragon 8 Gen 3 processor",
      "50MP Sony LYT-700 primary sensor with a 1/1",
      "6000mAh battery, the OnePlus 13R ensures long-lasting usage, making it ideal for users"
    ],
    "colors": [
      "Astral Trail",
      "Nebula Noir"
    ],
    "description": "OnePlus 13R 12GB/256GB is an OnePlus smartphone listed in Nepal at Rs. 83,998. Highlights include 6.78-inch ProXDR OLED panel with a 1 and Snapdragon 8 Gen 3 processor. Available colors include Astral Trail, Nebula Noir. Current listing status is sold out.",
    "badge": "New",
    "soldOut": true
  },
  {
    "id": "oneplus-15",
    "name": "OnePlus 15 16GB/512GB",
    "brand": "OnePlus",
    "category": "Smart Phone",
    "price": 169999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/oneplus%2015-02.png1764315969652",
    "gallery": [
      "https://cdn.hukut.com/oneplus%2015-02.png1764315969652",
      "https://cdn.hukut.com/oneplus%2015_bland%20and%20purple-02.png1764315743951",
      "https://cdn.hukut.com/oneplus%2015_bland%20and%20purple-02.png1764315745006",
      "https://cdn.hukut.com/oneplus%2015_bland%20and%20purple-03.png1764315969353",
      "https://cdn.hukut.com/oneplus%2015_bland%20and%20purple-03.png1764315968674",
      "https://cdn.hukut.com/oneplus%2015-02.png1764315969515"
    ],
    "specs": [
      "6.78-inch OLED display with 165Hz refresh rate delivers extremely smooth visuals",
      "Snapdragon 8 Elite Gen 5 processor",
      "50MP camera system and modern connectivity features",
      "7300mAh battery and advanced fast charging options, this OnePlus mobile is designed for"
    ],
    "colors": [
      "Mist Purple",
      "Absolute Black",
      "Sand Dune"
    ],
    "description": "OnePlus 15 16GB/512GB is an OnePlus smartphone listed in Nepal at Rs. 169,999. Highlights include 6.78-inch OLED display with 165Hz refresh rate delivers extremely smooth visuals and Snapdragon 8 Elite Gen 5 processor. Available colors include Mist Purple, Absolute Black, Sand Dune. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "nothing-cmf-phone-2-pro",
    "name": "Nothing CMF Phone 2 Pro 8GB/128GB",
    "brand": "CMF by Nothing",
    "category": "Smart Phone",
    "price": 38999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/nothing-cmf-phone-2-pro-orange.webp1747221548633",
    "gallery": [
      "https://cdn.hukut.com/nothing-cmf-phone-2-pro-orange.webp1747221548633",
      "https://cdn.hukut.com/nothing-cmf-phone-2-pro-orange.webp1750135335888",
      "https://cdn.hukut.com/nothing-cmf-phone-2-pro-orange.webp1750135743580",
      "https://cdn.hukut.com/Nothing-CMF-Phone-2-Pro-Price-in-Nepal.webp1747895468824",
      "https://cdn.hukut.com/nothing-cmf-phone-2-pro-white.webp1747221503642",
      "https://cdn.hukut.com/nothing-cmf-phone-2-pro-black.webp1747221503358",
      "https://cdn.hukut.com/nothing-cmf-phone-2-pro-orange.webp1747221502878",
      "https://cdn.hukut.com/nothing-cmf-phone-2-pro-black.webp1747221503946",
      "https://cdn.hukut.com/nothing-cmf-phone-2-pro-white.webp1747221503205",
      "https://cdn.hukut.com/Nothing-CMF-Phone-2-Pro-Price-in-Nepal.webp1747895469216",
      "https://cdn.hukut.com/nothing-cmf-phone-2-pro-black.webp1750135335350",
      "https://cdn.hukut.com/Nothing-CMF-Phone-2-Pro-Price-in-Nepal.webp1750135335755",
      "https://cdn.hukut.com/nothing-cmf-phone-2-pro-black.webp1750135743041",
      "https://cdn.hukut.com/Nothing-CMF-Phone-2-Pro-Price-in-Nepal.webp1750135743435"
    ],
    "specs": [
      "6.77-inch AMOLED display",
      "Dimensity 7300 Pro chip",
      "50MP main sensor, a 50MP telephoto lens with 2x optical zoom, and an 8MP ultrawide shooter",
      "5000mAh battery, which should comfortably last a full day"
    ],
    "colors": [
      "Black",
      "Orange",
      "White"
    ],
    "description": "Nothing CMF Phone 2 Pro 8GB/128GB is a CMF by Nothing smartphone listed in Nepal at Rs. 38,999. Highlights include 6.77-inch AMOLED display and Dimensity 7300 Pro chip. Available colors include Black, Orange, White. Current listing status is sold out.",
    "badge": "New",
    "soldOut": true
  },
  {
    "id": "nothing-phone-3a",
    "name": "Nothing Phone (3a) 8GB/128GB",
    "brand": "Nothing",
    "category": "Smart Phone",
    "price": 53999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/Nothing-Phone-3(a)-Price-in-Nepal.png1741074156630",
    "gallery": [
      "https://cdn.hukut.com/Nothing-Phone-3(a)-Price-in-Nepal.png1741074156630",
      "https://cdn.hukut.com/Nothing-Phone-3(a)-Price-in-Nepal.png1741074156985",
      "https://cdn.hukut.com/Nothing-Phone-3(a)-Blue-Price-in-Nepal%20(1).png1741090777347",
      "https://cdn.hukut.com/Nothing-phone-3a.png.png1741155970713",
      "https://cdn.hukut.com/Nothing-phone-3a.png.png1741155971507",
      "https://cdn.hukut.com/Nothing-Phone-3a%20(1).webp1744872875299",
      "https://cdn.hukut.com/Nothing-Phone-3(a)-white-Price-in-Nepal.png1741073782931",
      "https://cdn.hukut.com/Nothing-Phone-3(a)-white-Price-in-Nepal.png1741073782643",
      "https://cdn.hukut.com/Nothing-Phone-3a.png(1).png1741155971268",
      "https://cdn.hukut.com/Nothing-Phone-3(a)-Blue-Price-in-Nepal%2520(1).webp1744872875162",
      "https://cdn.hukut.com/Nothing-Phone-3(a)-Blue-Price-in-Nepal%20(1).png1741090714887",
      "https://cdn.hukut.com/Nothing-Phone-3a.png(1).png1741155971806",
      "https://cdn.hukut.com/Nothing-phone-3a.webp1744872874652"
    ],
    "specs": [
      "6.77-inch AMOLED display with a resolution of 1080 x 2412 pixels and a 20:9 aspect ratio",
      "Snapdragon 7s series processor",
      "5000mAh battery class, this Nothing mobile offers balanced performance",
      "50W wired charging, which can reach 50% in just 19 minutes and full charge in 56 mi"
    ],
    "colors": [
      "Black",
      "White",
      "Blue"
    ],
    "description": "Nothing Phone (3a) 8GB/128GB is a Nothing smartphone listed in Nepal at Rs. 53,999. Highlights include 6.77-inch AMOLED display with a resolution of 1080 x 2412 pixels and a 20:9 aspect ratio and Snapdragon 7s series processor. Available colors include Black, White, Blue. Current listing status is sold out.",
    "badge": "New",
    "soldOut": true
  },
  {
    "id": "nothing-phone-3a-pro",
    "name": "Nothing Phone (3a) Pro 12GB/256GB",
    "brand": "Nothing",
    "category": "Smart Phone",
    "price": 61999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/nothing-Phone-3a-pro.webp1741156653691",
    "gallery": [
      "https://cdn.hukut.com/nothing-Phone-3a-pro.webp1741156653691",
      "https://cdn.hukut.com/Nothing-Phone-3a-Pro-Gray-Price-in-Nepal.png1744874439306",
      "https://cdn.hukut.com/Nothing-Phone-3a-Pro-Gray-Price-in-Nepal.png1744874438464",
      "https://cdn.hukut.com/nothing-Phone-3a-pro.webp1744874439158"
    ],
    "specs": [
      "6.77-inch AMOLED display with a resolution of 1080 x 2412 pixels and a 20:9 aspect ratio",
      "Snapdragon 7s Gen 3 chipset",
      "50W wired charging, which can reach 50% in just 19 minutes and full charge in 56 mi",
      "AMOLED display and upgraded camera system, the Nothing Phone (3a) Pro targets users looking for better pho"
    ],
    "colors": [
      "Grey",
      "Black"
    ],
    "description": "Nothing Phone (3a) Pro 12GB/256GB is a Nothing smartphone listed in Nepal at Rs. 61,999. Highlights include 6.77-inch AMOLED display with a resolution of 1080 x 2412 pixels and a 20:9 aspect ratio and Snapdragon 7s Gen 3 chipset. Available colors include Grey, Black. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "nothing-phone-3",
    "name": "Nothing Phone (3) 12GB/256GB",
    "brand": "Nothing",
    "category": "Smart Phone",
    "price": 99999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/nothing-phone-(3)-white.webp1751630405457",
    "gallery": [
      "https://cdn.hukut.com/nothing-phone-(3)-white.webp1751630405457",
      "https://cdn.hukut.com/nothing-phone-(3)-black.webp1751630405159",
      "https://cdn.hukut.com/nothing-phone-(3)-black.webp1751630404793",
      "https://cdn.hukut.com/nothing-phone-(3)-white.webp1751630405313"
    ],
    "specs": [
      "Nothing Phone (3)"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Nothing Phone (3) 12GB/256GB is a Nothing smartphone listed in Nepal at Rs. 99,999. Highlights include Nothing Phone (3). Available colors include Black, White. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "redmi-15-4g",
    "name": "Redmi 15 4G 6GB/128GB",
    "brand": "Redmi",
    "category": "Smart Phone",
    "price": 24999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/redmi-15-4g-titan-gray.webp1756720452117",
    "gallery": [
      "https://cdn.hukut.com/redmi-15-4g-titan-gray.webp1756720452117",
      "https://cdn.hukut.com/redmi-15-4g-titan-gray.webp1756720452516",
      "https://cdn.hukut.com/redmi-15-4g-midnight-black.webp1756720451241",
      "https://cdn.hukut.com/redmi-15-4g-sandy-purple.webp1756720452655",
      "https://cdn.hukut.com/redmi-15-4g-midnight-black.webp1756720452379",
      "https://cdn.hukut.com/redmi-15-4g-sandy-purple.webp1756720452246"
    ],
    "specs": [
      "6.9-inch 144Hz Display The Redmi 15 4G features a huge 6",
      "Snapdragon 685 processor",
      "50MP AI Dual Camera System The Redmi 15 4G comes with a 50MP main camera that captures clear and detaile",
      "7000mAh Battery One of the standout features of the device is its huge 7000mAh battery"
    ],
    "colors": [
      "Midnight Black",
      "Titan Gray",
      "Sandy Purple"
    ],
    "description": "Redmi 15 4G 6GB/128GB is a Redmi smartphone listed in Nepal at Rs. 24,999. Highlights include 6.9-inch 144Hz Display The Redmi 15 4G features a huge 6 and Snapdragon 685 processor. Available colors include Midnight Black, Titan Gray, Sandy Purple. It is currently listed for Nepal buyers.",
    "badge": "Value"
  },
  {
    "id": "redmi-note-15-5g",
    "name": "Redmi Note 15 5G 8GB/256GB",
    "brand": "Redmi",
    "category": "Smart Phone",
    "price": 43999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/redmi-note-15-5g-glacier-blue.webp1768846567964",
    "gallery": [
      "https://cdn.hukut.com/redmi-note-15-5g-glacier-blue.webp1768846567964",
      "https://cdn.hukut.com/redmi-note-15-5g-black.webp1768846567186",
      "https://cdn.hukut.com/redmi-note-15-5g-black.webp1768846568468",
      "https://cdn.hukut.com/redmi-note-15-5g-glacier-blue.webp1768846568739",
      "https://cdn.hukut.com/redmi-note-15-5g-mist-purple.webp1768846568195",
      "https://cdn.hukut.com/redmi-note-15-5g-mist-purple.webp1768846568892"
    ],
    "specs": [
      "6.77-inch AMOLED display with a 120Hz refresh rate, delivering smooth scrolling and respo",
      "Snapdragon 6 Gen 3 chipset",
      "108MP camera system",
      "5520mAh silicon-carbon battery, delivering excellent endurance for all-day and multi-da"
    ],
    "colors": [
      "Black",
      "Glacier Blue",
      "Mist Purple"
    ],
    "description": "Redmi Note 15 5G 8GB/256GB is a Redmi smartphone listed in Nepal at Rs. 43,999. Highlights include 6.77-inch AMOLED display with a 120Hz refresh rate, delivering smooth scrolling and respo and Snapdragon 6 Gen 3 chipset. Available colors include Black, Glacier Blue, Mist Purple. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "redmi-note-15-pro",
    "name": "Redmi Note 15 Pro 8GB/256GB",
    "brand": "Redmi",
    "category": "Smart Phone",
    "price": 53999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/redmi-note-15-pro-mist-blue.webp1768848597277",
    "gallery": [
      "https://cdn.hukut.com/redmi-note-15-pro-mist-blue.webp1768848597277",
      "https://cdn.hukut.com/redmi-note-15-pro-titanium.webp1768848597658",
      "https://cdn.hukut.com/redmi-note-15-pro-mist-blue.webp1768848597969",
      "https://cdn.hukut.com/redmi-note-15-pro-mist-purple.webp1768848598111",
      "https://cdn.hukut.com/redmi-note-15-pro-black.webp1768848596713",
      "https://cdn.hukut.com/redmi-note-15-pro-mist-purple.webp1768848597432",
      "https://cdn.hukut.com/redmi-note-15-pro-titanium.webp1768848598278",
      "https://cdn.hukut.com/redmi-note-15-pro-black.webp1768848597816"
    ],
    "specs": [
      "6.83-inch AMOLED display with a sharp 1280 × 2772 resolution and an impressive ~447 PPI p",
      "Dimensity 7400 Ultra",
      "200MP camera with OIS, a powerful 4nm Dimensity chipset, and extreme durability with IP68/IP69K protectio",
      "6580mAh silicon-carbon battery, delivering exceptional endurance even for heavy users"
    ],
    "colors": [
      "Black",
      "Glacier Blue",
      "Mist Purple",
      "Titanium"
    ],
    "description": "Redmi Note 15 Pro 8GB/256GB is a Redmi smartphone listed in Nepal at Rs. 53,999. Highlights include 6.83-inch AMOLED display with a sharp 1280 × 2772 resolution and an impressive ~447 PPI p and Dimensity 7400 Ultra. Available colors include Black, Glacier Blue, Mist Purple, Titanium. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "xiaomi-17-ultra",
    "name": "Xiaomi 17 Ultra 16GB/512GB",
    "brand": "Xiaomi",
    "category": "Smart Phone",
    "price": 199999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/xiaomi-17-ultra-black.webp1774415208327",
    "gallery": [
      "https://cdn.hukut.com/xiaomi-17-ultra-black.webp1774415208327",
      "https://cdn.hukut.com/xiaomi-17-ultra-white.webp1774415208979",
      "https://cdn.hukut.com/xiaomi-17-ultra-starlit-green.webp1774415209137"
    ],
    "specs": [
      "6.9-inch LTPO AMOLED display with a 120Hz refresh rate delivers top-tier visuals",
      "Snapdragon 8 Elite Gen 5 processor",
      "200MP sensor and a 6000mAh battery, this Xiaomi mobile is built for photography and power users",
      "6000mAh battery, this Xiaomi mobile is built for photography and power users"
    ],
    "colors": [
      "Black",
      "White",
      "Green"
    ],
    "description": "Xiaomi 17 Ultra 16GB/512GB is a Xiaomi smartphone listed in Nepal at Rs. 199,999. Highlights include 6.9-inch LTPO AMOLED display with a 120Hz refresh rate delivers top-tier visuals and Snapdragon 8 Elite Gen 5 processor. Available colors include Black, White, Green. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "poco-x7-pro",
    "name": "Poco X7 Pro 12GB/512GB",
    "brand": "POCO",
    "category": "Smart Phone",
    "price": 59999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/xiaomi-poco-x7-pro-black.webp1770804681673",
    "gallery": [
      "https://cdn.hukut.com/xiaomi-poco-x7-pro-black.webp1770804681673",
      "https://cdn.hukut.com/xiaomi-poco-x7-pro-green.webp1770804682789",
      "https://cdn.hukut.com/xiaomi-poco-x7-pro-yellow.webp1770804682556"
    ],
    "specs": [
      "6.67-inch AMOLED display with a sharp 1220 × 2712 resolution and smooth 120Hz refresh rat",
      "Dimensity 8400 Ultra processor",
      "50MP OIS Camera with 4K 60fps Recording The dual rear camera setup includes: 50MP main sensor (OIS, f/1",
      "6000mAh It supports 90W wired charging, reaching 100% in around 42 minutes, along with"
    ],
    "colors": [
      "Black",
      "Yellow",
      "Green"
    ],
    "description": "Poco X7 Pro 12GB/512GB is a POCO smartphone listed in Nepal at Rs. 59,999. Highlights include 6.67-inch AMOLED display with a sharp 1220 × 2712 resolution and smooth 120Hz refresh rat and Dimensity 8400 Ultra processor. Available colors include Black, Yellow, Green. Current listing status is sold out.",
    "badge": "New",
    "soldOut": true
  },
  {
    "id": "poco-f8-pro",
    "name": "Poco F8 Pro 12GB/512GB",
    "brand": "POCO",
    "category": "Smart Phone",
    "price": 99999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/xiaomi-poco-f8-pro-blue.webp1770806357904",
    "gallery": [
      "https://cdn.hukut.com/xiaomi-poco-f8-pro-blue.webp1770806357904",
      "https://cdn.hukut.com/xiaomi-poco-f8-pro-black.webp1770806357102",
      "https://cdn.hukut.com/xiaomi-poco-f8-pro-titanium-silver.webp1770806357727"
    ],
    "specs": [
      "6.59-inch AMOLED display featuring: 120Hz refresh rate 2560Hz PWM dimming Dolby Vision &",
      "Snapdragon 8 Elite processor",
      "50MP Camera with 8K Video The Poco F8 Pro brings a versatile triple-camera setup: 50MP main camera (OIS,",
      "6210mAh Battery with 100W Charging Despite its compact build, the F8 Pro packs a large"
    ],
    "colors": [
      "Black",
      "Titanium Silver",
      "Blue"
    ],
    "description": "Poco F8 Pro 12GB/512GB is a POCO smartphone listed in Nepal at Rs. 99,999. Highlights include 6.59-inch AMOLED display featuring: 120Hz refresh rate 2560Hz PWM dimming Dolby Vision & and Snapdragon 8 Elite processor. Available colors include Black, Titanium Silver, Blue. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "oppo-reno14-f",
    "name": "Oppo Reno14 F 12GB/512GB",
    "brand": "OPPO",
    "category": "Smart Phone",
    "price": 57999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/oppo-reno14-f-glossy-pink.png1760616141640",
    "gallery": [
      "https://cdn.hukut.com/oppo-reno14-f-glossy-pink.png1760616141640",
      "https://cdn.hukut.com/oppo-reno14-f-luminous-green.png1760616142248",
      "https://cdn.hukut.com/oppo-reno14-f-opal-blue.png1760616142465"
    ],
    "specs": [
      "6.57-inch AMOLED panel with 1 billion colors and a smooth 120Hz refresh rate",
      "Snapdragon 6 Gen 1 processor",
      "50MP main (f/1",
      "6000mAh battery, ideal for long hours of use"
    ],
    "colors": [
      "Luminous Green",
      "Glossy Pink",
      "Opal Blue"
    ],
    "description": "Oppo Reno14 F 12GB/512GB is an OPPO smartphone listed in Nepal at Rs. 57,999. Highlights include 6.57-inch AMOLED panel with 1 billion colors and a smooth 120Hz refresh rate and Snapdragon 6 Gen 1 processor. Available colors include Luminous Green, Glossy Pink, Opal Blue. Current listing status is sold out.",
    "badge": "New",
    "soldOut": true
  },
  {
    "id": "oppo-find-n5",
    "name": "Oppo Find N5 16GB/512GB",
    "brand": "OPPO",
    "category": "Smart Phone",
    "price": 249999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/oppo-find-n5-cosmic-black.png1756113509541",
    "gallery": [
      "https://cdn.hukut.com/oppo-find-n5-cosmic-black.png1756113509541",
      "https://cdn.hukut.com/oppo-find-n5-misty-white.png1756113510324",
      "https://cdn.hukut.com/oppo-find-n5-dusk-purple.png1756113510469"
    ],
    "specs": [
      "Snapdragon 8 Elite processor",
      "5600mAh battery, this OPPO mobile combines performance, photography, and innovation",
      "120Hz refresh rate offers a next-level viewing experience",
      "The foldable LTPO OLED display with a 120Hz refresh rate offers a next-level viewing experience."
    ],
    "colors": [
      "Cosmic Black",
      "Misty White",
      "Dusk Purple"
    ],
    "description": "Oppo Find N5 16GB/512GB is an OPPO smartphone listed in Nepal at Rs. 249,999. Highlights include Snapdragon 8 Elite processor and 5600mAh battery, this OPPO mobile combines performance, photography, and innovation. Available colors include Cosmic Black, Misty White, Dusk Purple. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "vivo-v50-5g",
    "name": "Vivo V50 5G 12GB/256GB",
    "brand": "vivo",
    "category": "Smart Phone",
    "price": 67999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/vivo-v50-starry-blue-Price-in-Nepal.png1742279482424",
    "gallery": [
      "https://cdn.hukut.com/vivo-v50-starry-blue-Price-in-Nepal.png1742279482424",
      "https://cdn.hukut.com/Vivo-V50-Price-in-Nepal%20(1).png1742279532116"
    ],
    "specs": [
      "Snapdragon 7 Gen 3 chipset",
      "50MP primary sensor with OIS (Optical Image Stabilization) and a 50MP ultrawide lens, allowing you to ca",
      "5500mAh battery, ensuring even better battery life",
      "90W wired charging, which means you can quickly recharge your phone and get back to"
    ],
    "colors": [
      "Starry Blue",
      "Satin Black"
    ],
    "description": "Vivo V50 5G 12GB/256GB is a vivo smartphone listed in Nepal at Rs. 67,999. Highlights include Snapdragon 7 Gen 3 chipset and 50MP primary sensor with OIS (Optical Image Stabilization) and a 50MP ultrawide lens, allowing you to ca. Available colors include Starry Blue, Satin Black. Current listing status is sold out.",
    "badge": "New",
    "soldOut": true
  },
  {
    "id": "vivo-v60-5g",
    "name": "Vivo V60 5G 12GB/256GB",
    "brand": "vivo",
    "category": "Smart Phone",
    "price": 74999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/vivo-v60-5g-mist-grey.png1756624835832",
    "gallery": [
      "https://cdn.hukut.com/vivo-v60-5g-mist-grey.png1756624835832",
      "https://cdn.hukut.com/vivo-v60-5g-auspicious-gold.png1756624836882",
      "https://cdn.hukut.com/vivo-v60-5g-moonlit-blue.webp1756624836674",
      "https://cdn.hukut.com/vivo-v60-5g-berry-purple.png1756624837025",
      "https://cdn.hukut.com/vivo-v60-5g-mist-grey.png1756624837174",
      "https://cdn.hukut.com/vivo-v60-5g-moonlit-blue.webp1756624837312",
      "https://cdn.hukut.com/vivo-v60-5g-auspicious-gold.png1756624837452",
      "https://cdn.hukut.com/vivo-v60-5g-berry-purple.png1756624837599"
    ],
    "specs": [
      "Vivo V60 5G Price in Nepal The Vivo V60 5G is a premium Vivo mobile designed for performance and photography.",
      "As part of the Vivo V series, this Vivo V60 offers flagship-level features."
    ],
    "colors": [
      "Mist Grey",
      "Moonlit Blue",
      "Auspicious Gold",
      "Berry Purple"
    ],
    "description": "Vivo V60 5G 12GB/256GB is a vivo smartphone listed in Nepal at Rs. 74,999. Highlights include Vivo V60 5G Price in Nepal The Vivo V60 5G is a premium Vivo mobile designed for performance and photography and As part of the Vivo V series, this Vivo V60 offers flagship-level features. Available colors include Mist Grey, Moonlit Blue, Auspicious Gold, Berry Purple. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "vivo-x300-pro",
    "name": "Vivo X300 Pro 16GB/512GB",
    "brand": "vivo",
    "category": "Smart Phone",
    "price": 179999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/vivo-x300-pro-phantom-black.webp1765248239075",
    "gallery": [
      "https://cdn.hukut.com/vivo-x300-pro-phantom-black.webp1765248239075",
      "https://cdn.hukut.com/vivo-x300-pro-dune-brown.webp1765248239480"
    ],
    "specs": [
      "6.78-inch LTPO AMOLED panel hits up to 4500 nits peak brightness, making it easier to rea",
      "Dimensity 9500 (3nm) chipset",
      "50MP sensor delivers lifelike colors, while the enormous 200MP periscope telephoto brings unbelievable z",
      "6510mAh silicon-carbon battery (or 5440mAh in some regions) powers the device, ensuring"
    ],
    "colors": [
      "Dune Brown",
      "Phantom Black"
    ],
    "description": "Vivo X300 Pro 16GB/512GB is a vivo smartphone listed in Nepal at Rs. 179,999. Highlights include 6.78-inch LTPO AMOLED panel hits up to 4500 nits peak brightness, making it easier to rea and Dimensity 9500 (3nm) chipset. Available colors include Dune Brown, Phantom Black. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "realme-14t-5g",
    "name": "Realme 14T 5G 8GB/256GB",
    "brand": "realme",
    "category": "Smart Phone",
    "price": 36999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/realme-14t-5g-surf-green.webp1749978798308",
    "gallery": [
      "https://cdn.hukut.com/realme-14t-5g-surf-green.webp1749978798308",
      "https://cdn.hukut.com/realme-14t-5g-black.webp1749978798965",
      "https://cdn.hukut.com/realme-14t-5g-lightning-purple.webp1749978799114"
    ],
    "specs": [
      "6.67-inch AMOLED display with a 120Hz refresh rate and up to 2100 nits peak brightness",
      "Dimensity 6300",
      "50MP main sensor and a 2MP secondary lens, along with a 16MP front camera",
      "6000mAh battery with 45W fast charging support, and skips both the headphone jack and N"
    ],
    "colors": [
      "Surf Green",
      "Obsidian Black",
      "Lightning Purple"
    ],
    "description": "Realme 14T 5G 8GB/256GB is a realme smartphone listed in Nepal at Rs. 36,999. Highlights include 6.67-inch AMOLED display with a 120Hz refresh rate and up to 2100 nits peak brightness and Dimensity 6300. Available colors include Surf Green, Obsidian Black, Lightning Purple. Current listing status is sold out.",
    "badge": "New",
    "soldOut": true
  },
  {
    "id": "realme-15-pro",
    "name": "Realme 15 Pro 12GB/256GB",
    "brand": "realme",
    "category": "Smart Phone",
    "price": 66999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/realme-15-pro-velvet-green.webp1763487912079",
    "gallery": [
      "https://cdn.hukut.com/realme-15-pro-velvet-green.webp1763487912079",
      "https://cdn.hukut.com/realme-15-pro-silk-purple.webp1763487911836",
      "https://cdn.hukut.com/realme-15-pro-flowing-silver.webp1763487912247",
      "https://cdn.hukut.com/realme-15-pro-silk-purple.webp1763487912405",
      "https://cdn.hukut.com/realme-15-pro-velvet-green.webp1763487912570",
      "https://cdn.hukut.com/realme-15-pro-flowing-silver.webp1763487910786"
    ],
    "specs": [
      "6.8-inch OLED display with 1B colors, HDR10+, and an ultra-fluid 144Hz refresh rate",
      "Snapdragon 7 Gen 4",
      "Dimensity 7300 Energy processor",
      "50MP rear cameras deliver sharp, balanced photos with OIS on the main sensor for stable low-light shots"
    ],
    "colors": [
      "Flowing Silver",
      "Silk Purple",
      "Velvet Green"
    ],
    "description": "Realme 15 Pro 12GB/256GB is a realme smartphone listed in Nepal at Rs. 66,999. Highlights include 6.8-inch OLED display with 1B colors, HDR10+, and an ultra-fluid 144Hz refresh rate and Snapdragon 7 Gen 4. Available colors include Flowing Silver, Silk Purple, Velvet Green. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "infinix-smart-10",
    "name": "Infinix Smart 10 4GB/64GB",
    "brand": "Infinix",
    "category": "Smart Phone",
    "price": 12999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/infinix-smart-10-blue.png1751952642575",
    "gallery": [
      "https://cdn.hukut.com/infinix-smart-10-blue.png1751952642575",
      "https://cdn.hukut.com/Infinix-Smart-10-gold.png1751952642206",
      "https://cdn.hukut.com/Infinix-Smart-10-all-color.png1751952642448",
      "https://cdn.hukut.com/Infinix-Smart-10-all-color.png1751952642668",
      "https://cdn.hukut.com/Infinix-Smart-10-all-color.png1751952642056",
      "https://cdn.hukut.com/Infinix-Smart-10-Silver.png1751952642335",
      "https://cdn.hukut.com/Infinix-Smart-10-Black.png1751952641908",
      "https://cdn.hukut.com/Infinix-Smart-10-all-color.png1751952641280"
    ],
    "specs": [
      "6.67-inch HD+ LCD screen with a smooth 120Hz refresh rate rare in budget phones sold in N",
      "8MP rear and 8MP front camera—both can shoot up to 2K videos",
      "15W USB-C charging—faster than the usual 10W in most entry-level phones in Nepal",
      "120Hz refresh rate rare in budget phones sold in Nepal"
    ],
    "colors": [
      "Black",
      "Gold",
      "Silver",
      "Blue"
    ],
    "description": "Infinix Smart 10 4GB/64GB is an Infinix smartphone listed in Nepal at Rs. 12,999. Highlights include 6.67-inch HD+ LCD screen with a smooth 120Hz refresh rate rare in budget phones sold in N and 8MP rear and 8MP front camera—both can shoot up to 2K videos. Available colors include Black, Gold, Silver, Blue. Current listing status is sold out.",
    "badge": "Value",
    "soldOut": true
  },
  {
    "id": "infinix-gt-30-pro",
    "name": "Infinix GT 30 Pro 8GB/256GB",
    "brand": "Infinix",
    "category": "Smart Phone",
    "price": 47999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/Infinix-GT-30-Pro-Shadow-Ash.png1750656960846",
    "gallery": [
      "https://cdn.hukut.com/Infinix-GT-30-Pro-Shadow-Ash.png1750656960846",
      "https://cdn.hukut.com/Infinix-GT-30-Pro-Shadow-Ash.webp1754373433007",
      "https://cdn.hukut.com/Infinix-GT-30-Pro-blade-white.webp1750656960565",
      "https://cdn.hukut.com/infinix-gt-30-pro-5g-dark-flare.webp1762334830223",
      "https://cdn.hukut.com/Infinix-GT-30-Pro-Shadow-Ash.webp1752839217984",
      "https://cdn.hukut.com/infinix-gt-30-pro-5g-dark-flare.webp1762334830572",
      "https://cdn.hukut.com/Infinix-GT-30-Pro-Dark-Flare.webp1754373339826",
      "https://cdn.hukut.com/Infinix-GT-30-Pro-blade-white.webp1754373432583"
    ],
    "specs": [
      "6.78-inch LTPS AMOLED steals the show: 144 Hz refresh keeps animations liquid-smooth, whi",
      "Dimensity 8350 Ultimate",
      "AMOLED steals the show: 144 Hz refresh keeps animations liquid-smooth, while 2000-nit peak brightness stay",
      "Paired with 8 GB RAM (expandable to 12 GB via memory fusion) and fast UFS 4.0 storage, apps pop open in a blink."
    ],
    "colors": [
      "Dark Flare",
      "Blade White",
      "Shadow Ash"
    ],
    "description": "Infinix GT 30 Pro 8GB/256GB is an Infinix smartphone listed in Nepal at Rs. 47,999. Highlights include 6.78-inch LTPS AMOLED steals the show: 144 Hz refresh keeps animations liquid-smooth, whi and Dimensity 8350 Ultimate. Available colors include Dark Flare, Blade White, Shadow Ash. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "infinix-note-60-pro",
    "name": "Infinix Note 60 Pro 8GB/256GB",
    "brand": "Infinix",
    "category": "Smart Phone",
    "price": 59999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/infinix-note-60-pro-solar-orange.png1774174255403",
    "gallery": [
      "https://cdn.hukut.com/infinix-note-60-pro-solar-orange.png1774174255403",
      "https://cdn.hukut.com/infinix-note-60-pro-solar-orange.png1774174256532",
      "https://cdn.hukut.com/infinix-note-60-pro-deep-ocean-blue.png1774174254184",
      "https://cdn.hukut.com/infinix-note-60-pro-mist-titanium.png1774174255016",
      "https://cdn.hukut.com/infinix-note-60-pro-deep-ocean-blue.png1774174255965",
      "https://cdn.hukut.com/infinix-note-60-pro-mist-titanium.png1774174256254"
    ],
    "specs": [
      "6.78-inch AMOLED display that delivers vibrant colors and smooth performance",
      "Snapdragon chipset",
      "50MP wide sensor with PDAF and optical image stabilization, helping produce sharper photos and improved",
      "90W wired fast charging, which can charge the 6500 mAh battery to 50% in about 16 m"
    ],
    "colors": [
      "Blue",
      "Titanium",
      "Orange"
    ],
    "description": "Infinix Note 60 Pro 8GB/256GB is an Infinix smartphone listed in Nepal at Rs. 59,999. Highlights include 6.78-inch AMOLED display that delivers vibrant colors and smooth performance and Snapdragon chipset. Available colors include Blue, Titanium, Orange. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "honor-400",
    "name": "Honor 400 12GB/512GB",
    "brand": "HONOR",
    "category": "Smart Phone",
    "price": 67999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/Honor-400-Desert%20Gold-Price-in-Nepal.png1749358886404",
    "gallery": [
      "https://cdn.hukut.com/Honor-400-Desert%20Gold-Price-in-Nepal.png1749358886404",
      "https://cdn.hukut.com/Honor-400-midnight-black-Price-in-Nepal.webp1749358939117",
      "https://cdn.hukut.com/Honor-400-Tidal-Blue-Price-in-Nepal.png1749358887031"
    ],
    "specs": [
      "6.55-inch AMOLED curved screen, which offers a sharp resolution of 2736 x 1264 pixels",
      "Snapdragon 7 Gen 3 processor",
      "200MP main camera with OIS, perfect for detailed shots, and a 12MP ultrawide sensor that can also take cl",
      "6000mAh silicon-carbon battery, which easily lasts more than a day"
    ],
    "colors": [
      "Midnight Black",
      "Desert Gold",
      "Tidal Blue"
    ],
    "description": "Honor 400 12GB/512GB is a HONOR smartphone listed in Nepal at Rs. 67,999. Highlights include 6.55-inch AMOLED curved screen and Snapdragon 7 Gen 3 processor. Available colors include Midnight Black, Desert Gold, Tidal Blue. Current listing status is sold out.",
    "badge": "New",
    "soldOut": true
  },
  {
    "id": "honor-400-pro",
    "name": "Honor 400 Pro 12GB/512GB",
    "brand": "HONOR",
    "category": "Smart Phone",
    "price": 88480,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/Honor-400-Pro-Midnight-Black.png1749355866954",
    "gallery": [
      "https://cdn.hukut.com/Honor-400-Pro-Midnight-Black.png1749355866954",
      "https://cdn.hukut.com/Honor-400-Pro-Lunar-grey-Price-in-Nepal.png1749355687593"
    ],
    "specs": [
      "6.7-inch AMOLED display that’s sharp, colorful, and fluid thanks to its 1224 x 2700 reso",
      "Snapdragon 8 Gen 3 and 200MP camera system",
      "200MP camera system, the Honor 400 Pro is ideal for power users",
      "6000mAh battery that supports 100W fast charging and 50W wireless charging, the phone k"
    ],
    "colors": [
      "Lunar Grey",
      "Midnight Black"
    ],
    "description": "Honor 400 Pro 12GB/512GB is a HONOR smartphone listed in Nepal at Rs. 88,480. Highlights include 6.7-inch AMOLED display that’s sharp, colorful, and fluid thanks to its 1224 x 2700 reso and Snapdragon 8 Gen 3 and 200MP camera system. Available colors include Lunar Grey, Midnight Black. Current listing status is sold out.",
    "badge": "New",
    "soldOut": true
  },
  {
    "id": "motorola-moto-g85-5g",
    "name": "Motorola Moto G85 5g 12GB/256GB",
    "brand": "Motorola",
    "category": "Smart Phone",
    "price": 33999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/Motorola-Moto-G85-Olive-Green-2.png1736417450893",
    "gallery": [
      "https://cdn.hukut.com/Motorola-Moto-G85-Olive-Green-2.png1736417450893",
      "https://cdn.hukut.com/Magenta-2.png1736417451558",
      "https://cdn.hukut.com/Motorola-Moto-G85-Cobalt-Blue.png1736417450074",
      "https://cdn.hukut.com/Motorola-Moto-G85-Cobalt-Blue-2.png1736417450174",
      "https://cdn.hukut.com/Motorola-Moto-G85-Olive-Green.png1736417449362",
      "https://cdn.hukut.com/Motorola-Moto-G85-Cobalt-Blue-2.png1736417451118",
      "https://cdn.hukut.com/Motorola-Moto-G85-Urban-Grey-2.png1736417450421",
      "https://cdn.hukut.com/Motorola-Moto-G85-Urban-Grey.png1736417450307",
      "https://cdn.hukut.com/Motorola-Moto-G85-Olive-Green-2.png1736417449938",
      "https://cdn.hukut.com/Motorola-Moto-G85-Urban-Grey-2.png1736417451334",
      "https://cdn.hukut.com/Motorola-Moto-G85-Cobalt-Blue.png1736417451024",
      "https://cdn.hukut.com/Motorola-Moto-G85-Olive-Green.png1736417450788",
      "https://cdn.hukut.com/Motorola-Moto-G85-Urban-Grey.png1736417451242",
      "https://cdn.hukut.com/Magenta.png1736417450562",
      "https://cdn.hukut.com/Magenta.png1736417451462",
      "https://cdn.hukut.com/Magenta-2.png1736417450655"
    ],
    "specs": [
      "6.67-inch FHD+ pOLED display with a smooth 120Hz refresh rate, 240Hz touch sampling, and",
      "Snapdragon 6s Gen 3 chipset",
      "50MP primary lens with OIS for sharp, stable shots and an 8MP ultrawide lens that doubles as a macro sho",
      "30W fast charging for all-day usage"
    ],
    "colors": [
      "Olive Green",
      "Cobalt Blue",
      "Urban Grey",
      "Magenta"
    ],
    "description": "Motorola Moto G85 5g 12GB/256GB is a Motorola smartphone listed in Nepal at Rs. 33,999. Highlights include 6.67-inch FHD+ pOLED display with a smooth 120Hz refresh rate, 240Hz touch sampling and Snapdragon 6s Gen 3 chipset. Available colors include Olive Green, Cobalt Blue, Urban Grey, Magenta. Current listing status is sold out.",
    "badge": "New",
    "soldOut": true
  },
  {
    "id": "motorola-g96-5g",
    "name": "Motorola G96 5G 8GB/256GB",
    "brand": "Motorola",
    "category": "Smart Phone",
    "price": 44999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/motorola-g96-5g-ashleigh-blue.avif1765957927397",
    "gallery": [
      "https://cdn.hukut.com/motorola-g96-5g-ashleigh-blue.avif1765957927397",
      "https://cdn.hukut.com/motorola-g96-5g-green-pastures.avif1765957928148"
    ],
    "specs": [
      "6.67-inch pOLED display with a 144Hz refresh rate ensures smooth visuals and vibrant colo",
      "Snapdragon 7s Gen 2 processor",
      "50MP Sony camera with OIS enhances photography performance",
      "5500mAh battery and fast charging support, this Motorola mobile delivers strong battery"
    ],
    "colors": [
      "Pantone (Ashleigh Blue)",
      "Pantone (Greener Pastures)"
    ],
    "description": "Motorola G96 5G 8GB/256GB is a Motorola smartphone listed in Nepal at Rs. 44,999. Highlights include 6.67-inch pOLED display with a 144Hz refresh rate ensures smooth visuals and vibrant colo and Snapdragon 7s Gen 2 processor. Available colors include Pantone (Ashleigh Blue), Pantone (Greener Pastures). It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "motorola-edge-50-fusion",
    "name": "Motorola Edge 50 Fusion 12GB/256GB",
    "brand": "Motorola",
    "category": "Smart Phone",
    "price": 46499,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/Motorola-Edge-50-Fusion-forest-blue-2.png1736416331638",
    "gallery": [
      "https://cdn.hukut.com/Motorola-Edge-50-Fusion-forest-blue-2.png1736416331638",
      "https://cdn.hukut.com/Motorola-Edge-50-Fusion-hot-pink-2.png1736416332142",
      "https://cdn.hukut.com/Motorola-Edge-50-Fusion-marshmallow-blue.png1736416331797",
      "https://cdn.hukut.com/Motorola-Edge-50-Fusion-marshmallow-blue-2.png1736416331905",
      "https://cdn.hukut.com/Motorola-Edge-50-Fusion-hot-pink.png1736416332044",
      "https://cdn.hukut.com/Motorola-Edge-50-Fusion-forest-blue.png1736416331026"
    ],
    "specs": [
      "6.7-inch pOLED display with a 144Hz refresh rate ensures smooth visuals and a premium ex",
      "Snapdragon 7s Gen 2 processor",
      "5000mAh battery and 68W fast charging, this Motorola mobile delivers reliable performan",
      "68W fast charging, this Motorola mobile delivers reliable performance"
    ],
    "colors": [
      "Hot Pink",
      "Forest Blue",
      "Marshmallow Blue"
    ],
    "description": "Motorola Edge 50 Fusion 12GB/256GB is a Motorola smartphone listed in Nepal at Rs. 46,499. Highlights include 6.7-inch pOLED display with a 144Hz refresh rate ensures smooth visuals and a premium ex and Snapdragon 7s Gen 2 processor. Available colors include Hot Pink, Forest Blue, Marshmallow Blue. It is currently listed for Nepal buyers.",
    "badge": "New"
  },
  {
    "id": "samsung-galaxy-s25",
    "name": "Samsung Galaxy S25 12GB/128GB",
    "brand": "Samsung",
    "category": "Smart Phone",
    "price": 104999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/samsung-galaxy-s25-price-in-nepal-2.png1738228709245",
    "gallery": [
      "https://cdn.hukut.com/samsung-galaxy-s25-price-in-nepal-2.png1738228709245",
      "https://cdn.hukut.com/samsung-galaxy-s25-price-in-nepal.png1738228709493",
      "https://cdn.hukut.com/samsung-galaxy-s25-price-in-nepal-2.png1738228708334",
      "https://cdn.hukut.com/Samsung-Galaxy-S25.webp1736933593059",
      "https://cdn.hukut.com/samsung-galaxy-s25-price-in-nepal.png1738228708911",
      "https://cdn.hukut.com/Samsung-Galaxy-S25.webp1736933592926"
    ],
    "specs": [
      "6.2-inch 1080p+ LTPO OLED screen with a refresh rate of 1-120 Hz is featured in the Gala",
      "Snapdragon 8 Elite chipset",
      "50MP primary camera, a 10MP telephoto lens with 3x zoom, and a 12MP ultrawide camera are all features of",
      "25W cable charging"
    ],
    "colors": [
      "Icy Blue",
      "Silver Shadow"
    ],
    "description": "Samsung Galaxy S25 12GB/128GB is a Samsung smartphone listed in Nepal at Rs. 104,999. Highlights include 6.2-inch 1080p+ LTPO OLED screen with a refresh rate of 1-120 Hz is featured in the Gala and Snapdragon 8 Elite chipset. Available colors include Icy Blue, Silver Shadow. Current listing status is sold out.",
    "badge": "Flagship",
    "soldOut": true
  },
  {
    "id": "samsung-galaxy-s25-ultra",
    "name": "Samsung Galaxy S25 Ultra 12GB/256GB",
    "brand": "Samsung",
    "category": "Smart Phone",
    "price": 184999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/samsung-s25-ultra-price-in-nepal%20(1).png1744973443339",
    "gallery": [
      "https://cdn.hukut.com/samsung-s25-ultra-price-in-nepal%20(1).png1744973443339",
      "https://cdn.hukut.com/samsung-s25-ultra-price-in-nepal.png1738228459554",
      "https://cdn.hukut.com/samsung-s25-ultra-price-in-nepal-2%20(1).webp1744973497420",
      "https://cdn.hukut.com/Samsung-Galaxy-S25-Ultra-Price-in-Nepal.png1736936411880",
      "https://cdn.hukut.com/samsung-s25-ultra-price-in-nepal.png1738228460195",
      "https://cdn.hukut.com/samsung-s25-ultra-price-in-nepal-4.png1738228458837",
      "https://cdn.hukut.com/samsung-s25-ultra-price-in-nepal-2.png1738228459326",
      "https://cdn.hukut.com/Samsung-Galaxy-S25-Ultra-Price-in-Nepal.png1736936412969",
      "https://cdn.hukut.com/samsung-s25-ultra-price-in-nepal-4.png1738228459771",
      "https://cdn.hukut.com/samsung-s25-ultra-price-in-nepal-2.png1738228459985"
    ],
    "specs": [
      "6.9-inch QHD+ LTPO screen with a refresh rate of 1-120 Hz, which is a little larger than",
      "Snapdragon 8 Elite for Galaxy CPU powers the Galaxy S25 Ultra",
      "50MP telephoto lens with 5x optical zoom, a 10MP telephoto lens with 3x zoom, a 50MP ultrawide lens, and",
      "45W wired, 15W wireless, and 4"
    ],
    "colors": [
      "Titanium Black",
      "Titanium Whitesilver",
      "Titanium Silverblue"
    ],
    "description": "Samsung Galaxy S25 Ultra 12GB/256GB is a Samsung smartphone listed in Nepal at Rs. 184,999. Highlights include 6.9-inch QHD+ LTPO screen with a refresh rate of 1-120 Hz and Snapdragon 8 Elite for Galaxy CPU powers the Galaxy S25 Ultra. Available colors include Titanium Black, Titanium Whitesilver, Titanium Silverblue. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "samsung-galaxy-s26-ultra",
    "name": "Samsung Galaxy S26 Ultra 12GB/256GB",
    "brand": "Samsung",
    "category": "Smart Phone",
    "price": 202999,
    "rating": 4.7,
    "reviews": 0,
    "image": "https://cdn.hukut.com/samsung-galaxy-s26-ultra-sky-blue.webp1772799235056",
    "gallery": [
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-sky-blue.webp1772799235056",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-sky-blue.webp1772799235744",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-black.webp1772799234712",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-sky-blue.webp1772799234374",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-cobalt-violet.webp1772799234879",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-white.webp1772799235229",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-black.webp1772799235403",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-white.webp1772799234546",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-white.webp1772799235916",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-sky-blue.png1777102987506",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-sky-blue.png1777102988459",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-black.webp1772799236085",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-cobalt-violet.webp1772799235573",
      "https://cdn.hukut.com/samsung-galaxy-s26-ultra-cobalt-violet.webp1772799234085"
    ],
    "specs": [
      "6.9-inch AMOLED display and advanced camera system deliver premium experience",
      "Snapdragon 8 Elite Gen 5 Performance Powered by the Snapdragon 8 Elite Gen 5 processor bui",
      "200MP Quad Camera System The quad camera setup includes a 200MP main camera, 50MP periscope telephoto wit",
      "5000mAh battery powers the Galaxy S26 Ultra, providing all-day usage on a single charge"
    ],
    "colors": [
      "Cobalt Violet",
      "Black",
      "Sky Blue"
    ],
    "description": "Samsung Galaxy S26 Ultra 12GB/256GB is a Samsung smartphone listed in Nepal at Rs. 202,999. Highlights include 6.9-inch AMOLED display and advanced camera system deliver premium experience and Snapdragon 8 Elite Gen 5 Performance Powered by the Snapdragon 8 Elite Gen 5 processor bui. Available colors include Cobalt Violet, Black, Sky Blue. It is currently listed for Nepal buyers.",
    "badge": "Flagship"
  },
  {
    "id": "apple-20watt-usb-c-power-adapter",
    "name": "Apple 20Watt USB-C Power Adapter",
    "brand": "Apple",
    "category": "Accessories",
    "price": 4499,
    "rating": 4.6,
    "reviews": 0,
    "image": "https://cdn.hukut.com/apple-charger.png1738826457126",
    "gallery": [
      "https://cdn.hukut.com/apple-charger.png1738826457126"
    ],
    "specs": [
      "20W USB-C charging",
      "Apple accessory",
      "Nepal retailer listing"
    ],
    "colors": [
      "Default"
    ],
    "description": "Apple 20Watt USB-C Power Adapter is an Apple accessory listed in Nepal at Rs. 4,499. Highlights include 20W USB-C charging and Apple accessory. Available color: Default. Current listing status is sold out.",
    "badge": "Sold Out",
    "soldOut": true
  },
  {
    "id": "redmi-buds-6-play",
    "name": "Redmi Buds 6 Play",
    "brand": "Redmi",
    "category": "Earbuds",
    "price": 2499,
    "rating": 4.6,
    "reviews": 0,
    "image": "https://cdn.hukut.com/Redmi-Buds-6-Play-black.webp1740912882257",
    "gallery": [
      "https://cdn.hukut.com/Redmi-Buds-6-Play-black.webp1740912882257",
      "https://cdn.hukut.com/Redmi-Buds-6-Play-white.webp1740912883147",
      "https://cdn.hukut.com/Redmi-Buds-6-Play-pink.webp1740912883433",
      "https://cdn.hukut.com/Redmi-Buds-6-Play-blue.webp1740912972047"
    ],
    "specs": [
      "True wireless earbuds",
      "Nepal retailer listing",
      "Color variants available"
    ],
    "colors": [
      "Black",
      "White",
      "Blue",
      "Pink"
    ],
    "description": "Redmi Buds 6 Play is a Redmi wireless earbuds listed in Nepal at Rs. 2,499. Highlights include True wireless earbuds and Nepal retailer listing. Available colors include Black, White, Blue, Pink. Current listing status is sold out.",
    "badge": "Sold Out",
    "soldOut": true
  },
  {
    "id": "samsung-galaxy-buds-fe",
    "name": "Samsung Galaxy Buds FE",
    "brand": "Samsung",
    "category": "Earbuds",
    "price": 15999,
    "rating": 4.6,
    "reviews": 0,
    "image": "https://cdn.hukut.com/302219_zfohmx.webp",
    "gallery": [
      "https://cdn.hukut.com/302219_zfohmx.webp",
      "https://cdn.hukut.com/atp-samsung-galaxy-buds-fe-graphite-mobile-detail-1-Format-480.webp"
    ],
    "specs": [
      "True wireless earbuds",
      "Nepal retailer listing",
      "Color variants available"
    ],
    "colors": [
      "Graphite",
      "Mystic White"
    ],
    "description": "Samsung Galaxy Buds FE is a Samsung wireless earbuds listed in Nepal at Rs. 15,999. Highlights include True wireless earbuds and Nepal retailer listing. Available colors include Graphite, Mystic White. Current listing status is sold out.",
    "badge": "Sold Out",
    "soldOut": true
  },
  {
    "id": "cmf-watch-pro-3",
    "name": "CMF Watch Pro 3",
    "brand": "CMF by Nothing",
    "category": "Accessories",
    "price": 13999,
    "rating": 4.6,
    "reviews": 0,
    "image": "https://cdn.hukut.com/cmf-watch-3-pro-light-grey.webp1766309181507",
    "gallery": [
      "https://cdn.hukut.com/cmf-watch-3-pro-light-grey.webp1766309181507",
      "https://cdn.hukut.com/cmf-watch-3-pro-white.webp1767262533401",
      "https://cdn.hukut.com/cmf-watch-3-pro-orange.webp1767262532617",
      "https://cdn.hukut.com/cmf-watch-3-pro.webp1766309180902"
    ],
    "specs": [
      "Smartwatch accessory",
      "Nepal retailer listing",
      "Color variants available"
    ],
    "colors": [
      "Light Green",
      "Orange",
      "Light Grey"
    ],
    "description": "CMF Watch Pro 3 is a CMF by Nothing accessory listed in Nepal at Rs. 13,999. Highlights include Smartwatch accessory and Nepal retailer listing. Available colors include Light Green, Orange, Light Grey. It is currently listed for Nepal buyers.",
    "badge": "Accessory"
  }
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
  { slug: "oneplus", label: "OnePlus", brand: "OnePlus" },
  { slug: "nothing", label: "Nothing", brand: "Nothing" },
  { slug: "redmi", label: "Redmi", brand: "Redmi" },
  { slug: "xiaomi", label: "Xiaomi", brand: "Xiaomi" },
  { slug: "poco", label: "POCO", brand: "POCO" },
  { slug: "oppo", label: "OPPO", brand: "OPPO" },
  { slug: "vivo", label: "vivo", brand: "vivo" },
  { slug: "realme", label: "realme", brand: "realme" },
  { slug: "infinix", label: "Infinix", brand: "Infinix" },
  { slug: "honor", label: "HONOR", brand: "HONOR" },
  { slug: "motorola", label: "Motorola", brand: "Motorola" },
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
      ? "Browse real Nepal listings across iPhone, Samsung, OnePlus, Nothing, Redmi, Xiaomi, POCO, OPPO, vivo, realme, Infinix, HONOR, and Motorola."
      : `Explore the latest ${filter.label} phones from the real Nepal catalog.`,
  brand: "brand" in filter ? filter.brand : undefined,
}))

const categoryProductSections: ProductSection[] = [
  {
    slug: "featured-phones",
    label: "Featured Phones",
    title: "Featured Phones",
    eyebrow: "Real Nepal prices",
    description:
      "A curated mix of in-stock flagship and value phones from the real Nepal product catalog.",
    productIds: [
      "apple-iphone-17-pro-max",
      "samsung-galaxy-s26-ultra",
      "oneplus-15",
      "xiaomi-17-ultra",
      "nothing-phone-3",
      "redmi-note-15-pro",
      "vivo-x300-pro",
      "infinix-gt-30-pro",
    ],
  },
  {
    slug: "tech-accessories",
    label: "Tech Accessories",
    title: "Tech Accessories",
    eyebrow: "Accessories",
    description:
      "Chargers, smart watches, and earbuds from the researched Nepal catalog.",
    categories: ["Accessories", "Earbuds"],
  },
  {
    slug: "audio",
    label: "Audio",
    title: "Audio Gear",
    eyebrow: "Audio",
    description:
      "Earbuds and portable audio products from real Nepal listings.",
    categories: ["Earbuds"],
  },
  {
    slug: "world-cup",
    label: "Launch Offers",
    title: "Launch Offer Picks",
    eyebrow: "Bundle picks",
    description:
      "Popular in-stock phones and accessories selected for campaign shelves.",
    productIds: [
      "apple-iphone-17",
      "samsung-galaxy-s25-ultra",
      "oneplus-nord-5",
      "redmi-note-15-5g",
      "cmf-watch-pro-3",
    ],
  },
  {
    slug: "deals",
    label: "Trending",
    title: "Trending Nepal Picks",
    eyebrow: "Fresh picks",
    description:
      "Freshly researched products that are useful for home page deal-style shelves.",
    productIds: [
      "redmi-15-4g",
      "motorola-g96-5g",
      "poco-f8-pro",
      "realme-15-pro",
      "apple-iphone-16e",
      "cmf-watch-pro-3",
    ],
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
