import { ShopifyProduct } from '@/lib/shopify/types'

const demoProducts: ShopifyProduct[] = [
  {
    id: "demo-1",
    title: "Essential Cotton Tee",
    description: "Premium heavyweight cotton t-shirt with a relaxed fit. Pre-shrunk and garment-dyed for a lived-in feel from day one.",
    descriptionHtml: "<p>Premium heavyweight cotton t-shirt with a relaxed fit. Pre-shrunk and garment-dyed for a lived-in feel from day one.</p>",
    handle: "essential-cotton-tee",
    availableForSale: true,
    productType: "Tees",
    options: [
      { id: "color", name: "Color", values: ["White", "Black", "Olive", "Navy"] },
      { id: "size", name: "Size", values: ["XS", "S", "M", "L", "XL", "XXL"] },
    ],
    images: { edges: [{ node: { url: "/images/products/tee-white.jpg", altText: "Essential Cotton Tee in White" } }] },
    priceRange: { minVariantPrice: { amount: "59.00", currencyCode: "AUD" } },
    compareAtPriceRange: null,
    variants: [
      { id: "v-1-1", title: "White / M", availableForSale: true, selectedOptions: [{ name: "Color", value: "White" }, { name: "Size", value: "M" }], price: { amount: "59.00", currencyCode: "AUD" } },
      { id: "v-1-2", title: "Black / M", availableForSale: true, selectedOptions: [{ name: "Color", value: "Black" }, { name: "Size", value: "M" }], price: { amount: "59.00", currencyCode: "AUD" } },
      { id: "v-1-3", title: "Olive / M", availableForSale: true, selectedOptions: [{ name: "Color", value: "Olive" }, { name: "Size", value: "M" }], price: { amount: "59.00", currencyCode: "AUD" } },
    ],
  },
  {
    id: "demo-2",
    title: "Heavyweight Hoodie",
    description: "Brushed fleece hoodie with kangaroo pocket and ribbed cuffs. 400gsm cotton blend for warmth without bulk.",
    descriptionHtml: "<p>Brushed fleece hoodie with kangaroo pocket and ribbed cuffs. 400gsm cotton blend for warmth without bulk.</p>",
    handle: "heavyweight-hoodie",
    availableForSale: true,
    productType: "Hoodies",
    options: [
      { id: "color", name: "Color", values: ["Grey Marle", "Cream", "Navy"] },
      { id: "size", name: "Size", values: ["S", "M", "L", "XL"] },
    ],
    images: { edges: [{ node: { url: "/images/products/hoodie-grey.jpg", altText: "Heavyweight Hoodie in Grey Marle" } }] },
    priceRange: { minVariantPrice: { amount: "129.00", currencyCode: "AUD" } },
    compareAtPriceRange: null,
    variants: [
      { id: "v-2-1", title: "Grey Marle / M", availableForSale: true, selectedOptions: [{ name: "Color", value: "Grey Marle" }, { name: "Size", value: "M" }], price: { amount: "129.00", currencyCode: "AUD" } },
    ],
  },
  {
    id: "demo-3",
    title: "Wool Blend Overcoat",
    description: "Tailored overcoat in Italian wool blend. Notch lapel, two-button closure, and fully lined interior.",
    descriptionHtml: "<p>Tailored overcoat in Italian wool blend. Notch lapel, two-button closure, and fully lined interior.</p>",
    handle: "wool-blend-overcoat",
    availableForSale: true,
    productType: "Jackets",
    options: [
      { id: "color", name: "Color", values: ["Camel", "Charcoal"] },
      { id: "size", name: "Size", values: ["S", "M", "L", "XL"] },
    ],
    images: { edges: [{ node: { url: "/images/products/overcoat-camel.jpg", altText: "Wool Blend Overcoat in Camel" } }] },
    priceRange: { minVariantPrice: { amount: "349.00", currencyCode: "AUD" } },
    compareAtPriceRange: { minVariantPrice: { amount: "449.00", currencyCode: "AUD" } },
    variants: [
      { id: "v-3-1", title: "Camel / M", availableForSale: true, selectedOptions: [{ name: "Color", value: "Camel" }, { name: "Size", value: "M" }], price: { amount: "349.00", currencyCode: "AUD" } },
    ],
  },
  {
    id: "demo-4",
    title: "Slim Tapered Chinos",
    description: "Stretch cotton chinos with a slim-tapered fit. Features a hidden coin pocket and reinforced belt loops.",
    descriptionHtml: "<p>Stretch cotton chinos with a slim-tapered fit. Features a hidden coin pocket and reinforced belt loops.</p>",
    handle: "slim-tapered-chinos",
    availableForSale: true,
    productType: "Pants",
    options: [
      { id: "color", name: "Color", values: ["Tan", "Olive", "Navy", "Black"] },
      { id: "size", name: "Size", values: ["28", "30", "32", "34", "36"] },
    ],
    images: { edges: [{ node: { url: "/images/products/chinos-tan.jpg", altText: "Slim Tapered Chinos in Tan" } }] },
    priceRange: { minVariantPrice: { amount: "99.00", currencyCode: "AUD" } },
    compareAtPriceRange: null,
    variants: [
      { id: "v-4-1", title: "Tan / 32", availableForSale: true, selectedOptions: [{ name: "Color", value: "Tan" }, { name: "Size", value: "32" }], price: { amount: "99.00", currencyCode: "AUD" } },
    ],
  },
  {
    id: "demo-5",
    title: "Running Sneakers",
    description: "Lightweight running sneakers with responsive cushioning and breathable mesh upper. EVA midsole for all-day comfort.",
    descriptionHtml: "<p>Lightweight running sneakers with responsive cushioning and breathable mesh upper. EVA midsole for all-day comfort.</p>",
    handle: "running-sneakers",
    availableForSale: true,
    productType: "Shoes",
    options: [
      { id: "color", name: "Color", values: ["White/Grey", "Black", "Navy/White"] },
      { id: "size", name: "Size", values: ["7", "8", "9", "10", "11", "12"] },
    ],
    images: { edges: [{ node: { url: "/images/products/sneakers-white.jpg", altText: "Running Sneakers in White/Grey" } }] },
    priceRange: { minVariantPrice: { amount: "120.00", currencyCode: "AUD" } },
    compareAtPriceRange: null,
    variants: [
      { id: "v-5-1", title: "White/Grey / 9", availableForSale: true, selectedOptions: [{ name: "Color", value: "White/Grey" }, { name: "Size", value: "9" }], price: { amount: "120.00", currencyCode: "AUD" } },
    ],
  },
  {
    id: "demo-6",
    title: "Wrap Midi Dress",
    description: "Flattering wrap silhouette in printed viscose. Adjustable tie waist and flutter sleeves.",
    descriptionHtml: "<p>Flattering wrap silhouette in printed viscose. Adjustable tie waist and flutter sleeves.</p>",
    handle: "wrap-midi-dress",
    availableForSale: true,
    productType: "Dresses",
    options: [
      { id: "color", name: "Color", values: ["Red Floral", "Navy Dot", "Black"] },
      { id: "size", name: "Size", values: ["XS", "S", "M", "L"] },
    ],
    images: { edges: [{ node: { url: "/images/products/dress-red.jpg", altText: "Wrap Midi Dress in Red Floral" } }] },
    priceRange: { minVariantPrice: { amount: "139.00", currencyCode: "AUD" } },
    compareAtPriceRange: null,
    variants: [
      { id: "v-6-1", title: "Red Floral / M", availableForSale: true, selectedOptions: [{ name: "Color", value: "Red Floral" }, { name: "Size", value: "M" }], price: { amount: "139.00", currencyCode: "AUD" } },
    ],
  },
  {
    id: "demo-7",
    title: "Denim Jacket",
    description: "Classic denim jacket in medium wash. Brass buttons, chest pockets, and adjustable waist tabs.",
    descriptionHtml: "<p>Classic denim jacket in medium wash. Brass buttons, chest pockets, and adjustable waist tabs.</p>",
    handle: "denim-jacket",
    availableForSale: true,
    productType: "Denim",
    options: [
      { id: "color", name: "Color", values: ["Medium Wash", "Dark Wash"] },
      { id: "size", name: "Size", values: ["XS", "S", "M", "L", "XL"] },
    ],
    images: { edges: [{ node: { url: "/images/products/denim-jacket.jpg", altText: "Denim Jacket in Medium Wash" } }] },
    priceRange: { minVariantPrice: { amount: "179.00", currencyCode: "AUD" } },
    compareAtPriceRange: null,
    variants: [
      { id: "v-7-1", title: "Medium Wash / M", availableForSale: true, selectedOptions: [{ name: "Color", value: "Medium Wash" }, { name: "Size", value: "M" }], price: { amount: "179.00", currencyCode: "AUD" } },
    ],
  },
  {
    id: "demo-8",
    title: "Pleated Mini Skirt",
    description: "Pleated mini skirt in structured crepe fabric. Concealed side zip and lined interior.",
    descriptionHtml: "<p>Pleated mini skirt in structured crepe fabric. Concealed side zip and lined interior.</p>",
    handle: "pleated-mini-skirt",
    availableForSale: true,
    productType: "Skirts",
    options: [
      { id: "color", name: "Color", values: ["Black", "Cream", "Olive"] },
      { id: "size", name: "Size", values: ["XS", "S", "M", "L"] },
    ],
    images: { edges: [{ node: { url: "/images/products/skirt-black.jpg", altText: "Pleated Mini Skirt in Black" } }] },
    priceRange: { minVariantPrice: { amount: "89.00", currencyCode: "AUD" } },
    compareAtPriceRange: null,
    variants: [
      { id: "v-8-1", title: "Black / M", availableForSale: true, selectedOptions: [{ name: "Color", value: "Black" }, { name: "Size", value: "M" }], price: { amount: "89.00", currencyCode: "AUD" } },
    ],
  },
  {
    id: "demo-9",
    title: "Performance Tank",
    description: "Moisture-wicking performance tank with mesh back panel. Four-way stretch for unrestricted movement.",
    descriptionHtml: "<p>Moisture-wicking performance tank with mesh back panel. Four-way stretch for unrestricted movement.</p>",
    handle: "performance-tank",
    availableForSale: true,
    productType: "Activewear",
    options: [
      { id: "color", name: "Color", values: ["White", "Black", "Sage"] },
      { id: "size", name: "Size", values: ["XS", "S", "M", "L", "XL"] },
    ],
    images: { edges: [{ node: { url: "/images/products/tank-white.jpg", altText: "Performance Tank in White" } }] },
    priceRange: { minVariantPrice: { amount: "49.00", currencyCode: "AUD" } },
    compareAtPriceRange: null,
    variants: [
      { id: "v-9-1", title: "White / M", availableForSale: true, selectedOptions: [{ name: "Color", value: "White" }, { name: "Size", value: "M" }], price: { amount: "49.00", currencyCode: "AUD" } },
    ],
  },
  {
    id: "demo-10",
    title: "Leather Belt",
    description: "Full-grain Italian leather belt with brushed nickel buckle. 35mm width, suitable for dress and casual wear.",
    descriptionHtml: "<p>Full-grain Italian leather belt with brushed nickel buckle. 35mm width, suitable for dress and casual wear.</p>",
    handle: "leather-belt",
    availableForSale: true,
    productType: "Accessories",
    options: [
      { id: "color", name: "Color", values: ["Brown", "Black"] },
      { id: "size", name: "Size", values: ["S", "M", "L"] },
    ],
    images: { edges: [{ node: { url: "/images/products/belt-brown.jpg", altText: "Leather Belt in Brown" } }] },
    priceRange: { minVariantPrice: { amount: "79.00", currencyCode: "AUD" } },
    compareAtPriceRange: null,
    variants: [
      { id: "v-10-1", title: "Brown / M", availableForSale: true, selectedOptions: [{ name: "Color", value: "Brown" }, { name: "Size", value: "M" }], price: { amount: "79.00", currencyCode: "AUD" } },
    ],
  },
]

export const staticProducts = demoProducts

export function getStaticProducts(): ShopifyProduct[] {
  return demoProducts
}

export function getStaticProduct(handle: string): ShopifyProduct | null {
  return demoProducts.find((p) => p.handle === handle) ?? null
}

export function getStaticProductsByType(type: string): ShopifyProduct[] {
  return demoProducts.filter((p) => p.productType === type)
}
