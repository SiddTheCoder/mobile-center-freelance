{
"image_data_patch_scope": "Batch 1 products from previous catalog output. Overwrite only images.main_image_url, images.gallery_image_urls, images.color_variant_image_urls, images.official_brand_image_urls, and variants[].image_url.",
"last_checked_date": "2026-06-19",
"rules_applied": [
"Removed product-page URLs from image fields.",
"Removed reused color images where the image did not exactly match the selected color.",
"Kept only direct image-file/CDN URLs in image fields.",
"Set variant image_url to null where exact color image could not be confirmed.",
"Used clean product render images where available; avoided obvious lifestyle images as main images."
],
"products": [
{
"slug": "apple-iphone-16",
"product_name": "Apple iPhone 16",
"images": {
"main_image_url": "https://cdn2.blanxer.com/uploads/682feff88c633f25b4c7ce32/product_image-img_0672-7304.webp",
"gallery_image_urls": [
"https://cdn2.blanxer.com/uploads/682feff88c633f25b4c7ce32/product_image-img_0672-7304.webp"
],
"color_variant_image_urls": [],
"official_brand_image_urls": []
},
"variants": [
{
"variant_sku": "APPLE-IPHONE16-128GB-WHITE",
"color_name": "White",
"image_url": null
},
{
"variant_sku": "APPLE-IPHONE16-128GB-TEAL",
"color_name": "Teal",
"image_url": null
},
{
"variant_sku": "APPLE-IPHONE16-128GB-ULTRAMARINE",
"color_name": "Ultramarine",
"image_url": null
},
{
"variant_sku": "APPLE-IPHONE16-256GB",
"color_name": null,
"image_url": "https://cdn2.blanxer.com/uploads/682feff88c633f25b4c7ce32/product_image-img_0672-7304.webp"
},
{
"variant_sku": "APPLE-IPHONE16-512GB",
"color_name": null,
"image_url": "https://cdn2.blanxer.com/uploads/682feff88c633f25b4c7ce32/product_image-img_0672-7304.webp"
}
],
"research_notes": "Main image is a verified direct product render showing all iPhone 16 colors. Exact separate White, Teal, and Ultramarine variant images were not confirmed as direct image URLs, so color-specific image_url values are null to avoid reusing the wrong image."
},
{
"slug": "samsung-galaxy-s25-ultra",
"product_name": "Samsung Galaxy S25 Ultra",
"images": {
"main_image_url": null,
"gallery_image_urls": [],
"color_variant_image_urls": [],
"official_brand_image_urls": []
},
"variants": [
{
"variant_sku": "SAMSUNG-GALAXYS25ULTRA-12GB-256GB",
"color_name": null,
"image_url": null
},
{
"variant_sku": "SAMSUNG-GALAXYS25ULTRA-12GB-512GB",
"color_name": null,
"image_url": null
},
{
"variant_sku": "SAMSUNG-GALAXYS25ULTRA-12GB-1TB",
"color_name": null,
"image_url": null
}
],
"research_notes": "Samsung pages exposed image placeholders/lazy-loaded assets, but a clean direct product render URL could not be reliably confirmed. Product-page URLs were removed from image fields."
},
{
"slug": "samsung-galaxy-a37-5g",
"product_name": "Samsung Galaxy A37 5G",
"images": {
"main_image_url": null,
"gallery_image_urls": [],
"color_variant_image_urls": [],
"official_brand_image_urls": []
},
"variants": [
{
"variant_sku": "SAMSUNG-GALAXYA37-5G-8GB-128GB-DARKGREEN",
"color_name": "Dark Green",
"image_url": null
},
{
"variant_sku": "SAMSUNG-GALAXYA37-5G-8GB-256GB-LIGHTVIOLET",
"color_name": "Light Violet",
"image_url": null
},
{
"variant_sku": "SAMSUNG-GALAXYA37-5G-12GB-256GB-GRAY",
"color_name": "Gray",
"image_url": null
}
],
"research_notes": "A visual product render exists on SamsungPlaza/Samsung pages, but no verified direct CDN image URL was extracted. Color images are null to prevent mismatched reuse."
},
{
"slug": "xiaomi-15-ultra",
"product_name": "Xiaomi 15 Ultra",
"images": {
"main_image_url": "https://i02.appmifile.com/493_operator_sg/06/03/2025/b51fb671f59cb6bc3d81368a8744b532.jpg",
"gallery_image_urls": [
"https://i02.appmifile.com/493_operator_sg/06/03/2025/b51fb671f59cb6bc3d81368a8744b532.jpg"
],
"color_variant_image_urls": [
"https://i02.appmifile.com/493_operator_sg/06/03/2025/b51fb671f59cb6bc3d81368a8744b532.jpg"
],
"official_brand_image_urls": [
"https://i02.appmifile.com/493_operator_sg/06/03/2025/b51fb671f59cb6bc3d81368a8744b532.jpg"
]
},
"variants": [
{
"variant_sku": "XIAOMI-15ULTRA-16GB-512GB-BLACK",
"color_name": "Black",
"image_url": "https://i02.appmifile.com/493_operator_sg/06/03/2025/b51fb671f59cb6bc3d81368a8744b532.jpg"
},
{
"variant_sku": "XIAOMI-15ULTRA-16GB-1TB-WHITE",
"color_name": "White",
"image_url": null
}
],
"research_notes": "Verified direct Xiaomi CDN image shows the Black Xiaomi 15 Ultra. A separate exact White product render URL was not confirmed; White variant image_url is null."
},
{
"slug": "redmi-note-15-pro-plus-5g",
"product_name": "Redmi Note 15 Pro+ 5G",
"images": {
"main_image_url": "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-note-15-pro-plus-5g/pc/1e62d6973df9124095c38d8ed31b142a.jpg",
"gallery_image_urls": [
"https://i02.appmifile.com/mi-com-product/fly-birds/redmi-note-15-pro-plus-5g/pc/1e62d6973df9124095c38d8ed31b142a.jpg"
],
"color_variant_image_urls": [],
"official_brand_image_urls": [
"https://i02.appmifile.com/mi-com-product/fly-birds/redmi-note-15-pro-plus-5g/pc/1e62d6973df9124095c38d8ed31b142a.jpg"
]
},
"variants": [
{
"variant_sku": "REDMI-NOTE15PROPLUS-5G-8GB-256GB",
"color_name": null,
"image_url": "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-note-15-pro-plus-5g/pc/1e62d6973df9124095c38d8ed31b142a.jpg"
},
{
"variant_sku": "REDMI-NOTE15PROPLUS-5G-12GB-512GB",
"color_name": null,
"image_url": "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-note-15-pro-plus-5g/pc/1e62d6973df9124095c38d8ed31b142a.jpg"
}
],
"research_notes": "Direct Xiaomi CDN product image is used only for non-color-specific variants. No color-specific variant image was assigned."
},
{
"slug": "poco-f7",
"product_name": "POCO F7",
"images": {
"main_image_url": "https://i02.appmifile.com/mi-com-product/fly-birds/poco-f7/pc/837222dcf1c0c4a47659f44e9ac81b2a.jpg",
"gallery_image_urls": [
"https://i02.appmifile.com/mi-com-product/fly-birds/poco-f7/pc/837222dcf1c0c4a47659f44e9ac81b2a.jpg"
],
"color_variant_image_urls": [],
"official_brand_image_urls": [
"https://i02.appmifile.com/mi-com-product/fly-birds/poco-f7/pc/837222dcf1c0c4a47659f44e9ac81b2a.jpg"
]
},
"variants": [
{
"variant_sku": "POCO-F7-12GB-256GB-WHITE",
"color_name": "White",
"image_url": null
},
{
"variant_sku": "POCO-F7-12GB-512GB-BLACK",
"color_name": "Black",
"image_url": null
},
{
"variant_sku": "POCO-F7-12GB-512GB-SILVER",
"color_name": "Silver",
"image_url": null
}
],
"research_notes": "Main image is a direct Xiaomi/POCO CDN image. Exact White, Black, and Silver variant image URLs were not confirmed separately, so variant image_url values are null."
},
{
"slug": "oneplus-nord-5",
"product_name": "OnePlus Nord 5",
"images": {
"main_image_url": "https://www.oneplus.com/content/dam/oneplus/2025/product-station/nord-5/assets/images-kv-phone-pc-1-95-642748.png.webp",
"gallery_image_urls": [
"https://www.oneplus.com/content/dam/oneplus/2025/product-station/nord-5/assets/images-kv-phone-pc-1-95-642748.png.webp"
],
"color_variant_image_urls": [],
"official_brand_image_urls": [
"https://www.oneplus.com/content/dam/oneplus/2025/product-station/nord-5/assets/images-kv-phone-pc-1-95-642748.png.webp"
]
},
"variants": [
{
"variant_sku": "ONEPLUS-NORD5-8GB-256GB",
"color_name": null,
"image_url": "https://www.oneplus.com/content/dam/oneplus/2025/product-station/nord-5/assets/images-kv-phone-pc-1-95-642748.png.webp"
},
{
"variant_sku": "ONEPLUS-NORD5-12GB-512GB",
"color_name": null,
"image_url": "https://www.oneplus.com/content/dam/oneplus/2025/product-station/nord-5/assets/images-kv-phone-pc-1-95-642748.png.webp"
}
],
"research_notes": "Verified direct OnePlus CDN render showing Nord 5 color lineup. Variants do not specify color, so the same product-line image is acceptable. If color-specific variants are added later, separate exact images should be used."
},
{
"slug": "oppo-reno14-f-5g",
"product_name": "OPPO Reno14 F 5G",
"images": {
"main_image_url": "https://www.oppo.com/content/dam/oppo/common/mkt/v2-2/reno14-series/specs/reno14-f/blue-green.png",
"gallery_image_urls": [
"https://www.oppo.com/content/dam/oppo/common/mkt/v2-2/reno14-series/specs/reno14-f/blue-green.png"
],
"color_variant_image_urls": [],
"official_brand_image_urls": [
"https://www.oppo.com/content/dam/oppo/common/mkt/v2-2/reno14-series/specs/reno14-f/blue-green.png"
]
},
"variants": [
{
"variant_sku": "OPPO-RENO14F-5G-12GB-512GB-OPALBLUE",
"color_name": "Opal Blue",
"image_url": null
},
{
"variant_sku": "OPPO-RENO14F-5G-12GB-512GB-LUMINOUSGREEN",
"color_name": "Luminous Green",
"image_url": null
}
],
"research_notes": "Main image is a verified direct OPPO image showing both color options. It must not be reused as an exact variant image for Opal Blue or Luminous Green; variant image_url values are null until separate exact color renders are confirmed."
},
{
"slug": "vivo-v50",
"product_name": "vivo V50",
"images": {
"main_image_url": "https://www.vivo.com/np/products/zip/img/pc/vivo-v50-in-ancora-red.png",
"gallery_image_urls": [
"https://www.vivo.com/np/products/zip/img/pc/vivo-v50-in-ancora-red.png",
"https://www.vivo.com/np/products/zip/img/wap/vivo-v50-in-starry-night-color.png",
"https://www.vivo.com/np/products/zip/img/wap/vivo-v50-in-stain-black-color.png"
],
"color_variant_image_urls": [
"https://www.vivo.com/np/products/zip/img/pc/vivo-v50-in-ancora-red.png",
"https://www.vivo.com/np/products/zip/img/wap/vivo-v50-in-starry-night-color.png",
"https://www.vivo.com/np/products/zip/img/wap/vivo-v50-in-stain-black-color.png"
],
"official_brand_image_urls": [
"https://www.vivo.com/np/products/zip/img/pc/vivo-v50-in-ancora-red.png",
"https://www.vivo.com/np/products/zip/img/wap/vivo-v50-in-starry-night-color.png",
"https://www.vivo.com/np/products/zip/img/wap/vivo-v50-in-stain-black-color.png"
]
},
"variants": [
{
"variant_sku": "VIVO-V50-12GB-256GB-ANCORARED",
"color_name": "Ancora Red",
"image_url": "https://www.vivo.com/np/products/zip/img/pc/vivo-v50-in-ancora-red.png"
},
{
"variant_sku": "VIVO-V50-12GB-256GB-STARRYBLUE",
"color_name": "Starry Blue",
"image_url": "https://www.vivo.com/np/products/zip/img/wap/vivo-v50-in-starry-night-color.png"
},
{
"variant_sku": "VIVO-V50-12GB-256GB-SATINBLACK",
"color_name": "Satin Black",
"image_url": "https://www.vivo.com/np/products/zip/img/wap/vivo-v50-in-stain-black-color.png"
}
],
"research_notes": "Direct vivo Nepal image paths were extracted from official image links. The Satin Black source path uses vivo's page spelling 'stain-black-color'."
},
{
"slug": "realme-14t-5g",
"product_name": "realme 14T 5G",
"images": {
"main_image_url": "https://static2.realme.net/images/realme-14t-5g-vn/1744074589208454cb38c8d0a4ea7a108bf98f1a6a7b8.webp",
"gallery_image_urls": [
"https://static2.realme.net/images/realme-14t-5g-vn/1744074589208454cb38c8d0a4ea7a108bf98f1a6a7b8.webp",
"https://static2.realme.net/images/realme-14t-5g-vn/17440745612674cae43c115f44f4aad6a2e40430279bc.webp"
],
"color_variant_image_urls": [
"https://static2.realme.net/images/realme-14t-5g-vn/1744074589208454cb38c8d0a4ea7a108bf98f1a6a7b8.webp",
"https://static2.realme.net/images/realme-14t-5g-vn/17440745612674cae43c115f44f4aad6a2e40430279bc.webp"
],
"official_brand_image_urls": [
"https://static2.realme.net/images/realme-14t-5g-vn/1744074589208454cb38c8d0a4ea7a108bf98f1a6a7b8.webp",
"https://static2.realme.net/images/realme-14t-5g-vn/17440745612674cae43c115f44f4aad6a2e40430279bc.webp"
]
},
"variants": [
{
"variant_sku": "REALME-14T-5G-8GB-256GB-LIGHTNINGPURPLE",
"color_name": "Lightning Purple",
"image_url": "https://static2.realme.net/images/realme-14t-5g-vn/1744074589208454cb38c8d0a4ea7a108bf98f1a6a7b8.webp"
},
{
"variant_sku": "REALME-14T-5G-8GB-256GB-OBSIDIANBLACK",
"color_name": "Obsidian Black",
"image_url": "https://static2.realme.net/images/realme-14t-5g-vn/17440745612674cae43c115f44f4aad6a2e40430279bc.webp"
}
],
"research_notes": "Direct realme CDN URLs are exact color renders from the official realme Nepal product page."
},
{
"slug": "nothing-phone-3",
"product_name": "Nothing Phone (3)",
"images": {
"main_image_url": "https://cdn.shopify.com/s/files/1/0585/2479/5086/files/0000s_0011_Phone-3-white.png?v=1753757231",
"gallery_image_urls": [
"https://cdn.shopify.com/s/files/1/0585/2479/5086/files/0000s_0011_Phone-3-white.png?v=1753757231"
],
"color_variant_image_urls": [
"https://cdn.shopify.com/s/files/1/0585/2479/5086/files/0000s_0011_Phone-3-white.png?v=1753757231"
],
"official_brand_image_urls": [
"https://cdn.shopify.com/s/files/1/0585/2479/5086/files/0000s_0011_Phone-3-white.png?v=1753757231"
]
},
"variants": [
{
"variant_sku": "NOTHING-PHONE3-12GB-256GB-WHITE",
"color_name": "White",
"image_url": "https://cdn.shopify.com/s/files/1/0585/2479/5086/files/0000s_0011_Phone-3-white.png?v=1753757231"
},
{
"variant_sku": "NOTHING-PHONE3-16GB-512GB-BLACK",
"color_name": "Black",
"image_url": null
}
],
"research_notes": "Verified direct Shopify/Nothing image is White only. The previous Black variant reused the White image; that has been removed and set to null."
},
{
"slug": "cmf-phone-2-pro",
"product_name": "CMF Phone 2 Pro",
"images": {
"main_image_url": "https://cdn.shopify.com/s/files/1/0585/2479/5086/files/0000s_0054_CMF-Phone-2-Pro-Orange.png?v=1753757234",
"gallery_image_urls": [
"https://cdn.shopify.com/s/files/1/0585/2479/5086/files/0000s_0054_CMF-Phone-2-Pro-Orange.png?v=1753757234"
],
"color_variant_image_urls": [
"https://cdn.shopify.com/s/files/1/0585/2479/5086/files/0000s_0054_CMF-Phone-2-Pro-Orange.png?v=1753757234"
],
"official_brand_image_urls": [
"https://cdn.shopify.com/s/files/1/0585/2479/5086/files/0000s_0054_CMF-Phone-2-Pro-Orange.png?v=1753757234"
]
},
"variants": [
{
"variant_sku": "CMF-PHONE2PRO-8GB-128GB-ORANGE",
"color_name": "Orange",
"image_url": "https://cdn.shopify.com/s/files/1/0585/2479/5086/files/0000s_0054_CMF-Phone-2-Pro-Orange.png?v=1753757234"
},
{
"variant_sku": "CMF-PHONE2PRO-8GB-256GB-BLACK",
"color_name": "Black",
"image_url": null
}
],
"research_notes": "Verified direct Shopify/Nothing image is Orange only. The previous Black variant reused the Orange image; that has been removed and set to null."
},
{
"slug": "apple-usb-c-20w-power-adapter",
"product_name": "Apple USB-C 20W Power Adapter",
"images": {
"main_image_url": "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MWVV3?.v=ZGMwamVQM3NMNFF3dllBOFdrb0RHV2orYzFkTG5HaE9wejd5WUxYZjRMK0xZRW05UENvR2I1ditwQTlTUkJwZHVBYVpQODZ2VDA1a1lBSm83UHYrTWc&fmt=jpeg&hei=2000&qlt=90&wid=2000",
"gallery_image_urls": [
"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MWVV3?.v=ZGMwamVQM3NMNFF3dllBOFdrb0RHV2orYzFkTG5HaE9wejd5WUxYZjRMK0xZRW05UENvR2I1ditwQTlTUkJwZHVBYVpQODZ2VDA1a1lBSm83UHYrTWc&fmt=jpeg&hei=2000&qlt=90&wid=2000",
"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MWVV3?.v=Z0NhK081OTZRcVdjS2kxLys5ZGpDUWtuVHYzMERCZURia3c5SzJFOTlPaUxZRW05UENvR2I1ditwQTlTUkJwZHVBYVpQODZ2VDA1a1lBSm83UHYrTWc&fmt=jpeg&hei=1144&qlt=90&wid=1144"
],
"color_variant_image_urls": [
"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MWVV3?.v=ZGMwamVQM3NMNFF3dllBOFdrb0RHV2orYzFkTG5HaE9wejd5WUxYZjRMK0xZRW05UENvR2I1ditwQTlTUkJwZHVBYVpQODZ2VDA1a1lBSm83UHYrTWc&fmt=jpeg&hei=2000&qlt=90&wid=2000"
],
"official_brand_image_urls": [
"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MWVV3?.v=ZGMwamVQM3NMNFF3dllBOFdrb0RHV2orYzFkTG5HaE9wejd5WUxYZjRMK0xZRW05UENvR2I1ditwQTlTUkJwZHVBYVpQODZ2VDA1a1lBSm83UHYrTWc&fmt=jpeg&hei=2000&qlt=90&wid=2000",
"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MWVV3?.v=Z0NhK081OTZRcVdjS2kxLys5ZGpDUWtuVHYzMERCZURia3c5SzJFOTlPaUxZRW05UENvR2I1ditwQTlTUkJwZHVBYVpQODZ2VDA1a1lBSm83UHYrTWc&fmt=jpeg&hei=1144&qlt=90&wid=1144"
]
},
"variants": [
{
"variant_sku": "APPLE-USB-C-20W-ADAPTER-3PIN",
"color_name": "White",
"image_url": "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MWVV3?.v=ZGMwamVQM3NMNFF3dllBOFdrb0RHV2orYzFkTG5HaE9wejd5WUxYZjRMK0xZRW05UENvR2I1ditwQTlTUkJwZHVBYVpQODZ2VDA1a1lBSm83UHYrTWc&fmt=jpeg&hei=2000&qlt=90&wid=2000"
},
{
"variant_sku": "APPLE-USB-C-20W-ADAPTER-2PIN",
"color_name": "White",
"image_url": null
}
],
"research_notes": "Verified direct Apple Store image represents the 2-flat-pin Apple adapter render. The Nepal listing included 3-pin and 2-pin variants, but an exact Apple official 3-pin render was not confirmed; use this only if the sold Nepal unit visually matches. Otherwise keep variant image_url null for 3-pin."
},
{
"slug": "samsung-galaxy-buds3-fe",
"product_name": "Samsung Galaxy Buds3 FE",
"images": {
"main_image_url": "https://images.samsung.com/is/image/samsung/assets/us/mobile-audio/galaxy-buds3-fe/08282025/Buds3FE_HD01_KV_PC.jpg?imwidth=1366",
"gallery_image_urls": [
"https://images.samsung.com/is/image/samsung/assets/us/mobile-audio/galaxy-buds3-fe/08282025/Buds3FE_HD01_KV_PC.jpg?imwidth=1366"
],
"color_variant_image_urls": [
"https://images.samsung.com/is/image/samsung/assets/us/mobile-audio/galaxy-buds3-fe/08282025/Buds3FE_HD01_KV_PC.jpg?imwidth=1366"
],
"official_brand_image_urls": [
"https://images.samsung.com/is/image/samsung/assets/us/mobile-audio/galaxy-buds3-fe/08282025/Buds3FE_HD01_KV_PC.jpg?imwidth=1366"
]
},
"variants": [
{
"variant_sku": "SAMSUNG-GALAXYBUDS3-FE-BLACK",
"color_name": "Black",
"image_url": "https://images.samsung.com/is/image/samsung/assets/us/mobile-audio/galaxy-buds3-fe/08282025/Buds3FE_HD01_KV_PC.jpg?imwidth=1366"
},
{
"variant_sku": "SAMSUNG-GALAXYBUDS3-FE-GRAY",
"color_name": "Gray",
"image_url": null
}
],
"research_notes": "Verified direct Samsung image shows Black Galaxy Buds3 FE. Exact Gray image URL was not confirmed; Gray variant image_url is null."
},
{
"slug": "redmi-buds-6-play",
"product_name": "Redmi Buds 6 Play",
"images": {
"main_image_url": "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-buds-6-play/pc/986265a974c3e717dc1f9e045158962c.jpg",
"gallery_image_urls": [
"https://i02.appmifile.com/mi-com-product/fly-birds/redmi-buds-6-play/pc/986265a974c3e717dc1f9e045158962c.jpg"
],
"color_variant_image_urls": [],
"official_brand_image_urls": [
"https://i02.appmifile.com/mi-com-product/fly-birds/redmi-buds-6-play/pc/986265a974c3e717dc1f9e045158962c.jpg"
]
},
"variants": [
{
"variant_sku": "REDMI-BUDS6-PLAY-DEFAULT",
"color_name": null,
"image_url": "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-buds-6-play/pc/986265a974c3e717dc1f9e045158962c.jpg"
}
],
"research_notes": "Direct Xiaomi CDN image is used for the non-color-specific default variant."
},
{
"slug": "cmf-watch-3-pro",
"product_name": "CMF Watch 3 Pro",
"images": {
"main_image_url": "https://cdn.shopify.com/s/files/1/0585/2479/5086/files/2_157feacd-8caa-4a70-9ce5-fedcd50a7b0f.png?v=1759142565",
"gallery_image_urls": [
"https://cdn.shopify.com/s/files/1/0585/2479/5086/files/2_157feacd-8caa-4a70-9ce5-fedcd50a7b0f.png?v=1759142565"
],
"color_variant_image_urls": [
"https://cdn.shopify.com/s/files/1/0585/2479/5086/files/2_157feacd-8caa-4a70-9ce5-fedcd50a7b0f.png?v=1759142565"
],
"official_brand_image_urls": [
"https://cdn.shopify.com/s/files/1/0585/2479/5086/files/2_157feacd-8caa-4a70-9ce5-fedcd50a7b0f.png?v=1759142565"
]
},
"variants": [
{
"variant_sku": "CMF-WATCH3-PRO-LIGHTGREEN",
"color_name": "Light Green",
"image_url": "https://cdn.shopify.com/s/files/1/0585/2479/5086/files/2_157feacd-8caa-4a70-9ce5-fedcd50a7b0f.png?v=1759142565"
},
{
"variant_sku": "CMF-WATCH3-PRO-ORANGE",
"color_name": "Orange",
"image_url": null
}
],
"research_notes": "Verified direct image is Light Green only. The previous Orange variant reused the Light Green image; that has been removed and set to null."
}
]
}


