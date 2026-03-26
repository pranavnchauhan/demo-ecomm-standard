import {
  ProductCollectionSortKey,
  ProductSortKey,
  ShopifyCart,
  ShopifyCollection,
  ShopifyProduct,
} from './types'

import { parseShopifyDomain } from './parse-shopify-domain'

function sanitizeText(text: string | null | undefined): string {
  if (!text) return ''
  return text
    .replace(/—/g, ': ')
    .replace(/–/g, ' to ')
    .replace(/ +/g, ' ')
    .trim()
}

const rawStoreDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const SHOPIFY_STORE_DOMAIN = rawStoreDomain
  ? parseShopifyDomain(rawStoreDomain)
  : 'demo-store.myshopify.com'

const API_VERSION = '2025-07'
const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`

let storefrontToken: string | null = null

async function getStorefrontToken(): Promise<string | null> {
  if (storefrontToken) return storefrontToken
  if (process.env.SHOPIFY_STOREFRONT_TOKEN) {
    storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN
    return storefrontToken
  }
  return null
}

async function shopifyFetch<T = any>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T | null> {
  const sfToken = await getStorefrontToken()
  if (!sfToken) return null

  try {
    const res = await fetch(STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': sfToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    })

    if (!res.ok) return null
    const json = await res.json()
    if (!json.data) return null
    return json as T
  } catch {
    return null
  }
}

function normalizeProduct(raw: any): ShopifyProduct {
  return {
    ...raw,
    title: sanitizeText(raw.title),
    description: sanitizeText(raw.description),
    descriptionHtml: raw.descriptionHtml?.replace(/—/g, ': ').replace(/–/g, ' to '),
    variants: raw.variants?.edges
      ? raw.variants.edges.map((e: any) => ({
          ...e.node,
          title: sanitizeText(e.node.title),
        }))
      : raw.variants || [],
  }
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    description
    descriptionHtml
    handle
    availableForSale
    productType
    options { id name values }
    images(first: 10) { edges { node { url altText } } }
    priceRange { minVariantPrice { amount currencyCode } }
    compareAtPriceRange { minVariantPrice { amount currencyCode } }
    variants(first: 30) {
      edges {
        node {
          id title availableForSale
          selectedOptions { name value }
          price { amount currencyCode }
        }
      }
    }
  }
`

export async function getProducts(opts: {
  first?: number
  sortKey?: ProductSortKey
  reverse?: boolean
} = {}): Promise<ShopifyProduct[]> {
  const { first = 12, sortKey = 'RELEVANCE', reverse = false } = opts
  const result = await shopifyFetch<any>(
    `query ($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges { node { ...ProductFields } }
      }
    }
    ${PRODUCT_FRAGMENT}`,
    { first, sortKey, reverse },
  )

  if (!result) {
    const { getStaticProducts } = await import('@/lib/product-data')
    return getStaticProducts().slice(0, first)
  }
  return result.data.products.edges.map((e: any) => normalizeProduct(e.node))
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const result = await shopifyFetch<any>(
    `query ($handle: String!) {
      product(handle: $handle) { ...ProductFields }
    }
    ${PRODUCT_FRAGMENT}`,
    { handle },
  )

  if (!result || !result.data.product) {
    const { getStaticProduct } = await import('@/lib/product-data')
    return getStaticProduct(handle)
  }
  return normalizeProduct(result.data.product)
}

export async function getCollections(first = 20): Promise<ShopifyCollection[]> {
  const result = await shopifyFetch<any>(
    `query ($first: Int!) {
      collections(first: $first) {
        edges { node { id title handle description image { url altText } } }
      }
    }`,
    { first },
  )
  if (!result) return []
  return result.data.collections.edges.map((e: any) => e.node)
}

export async function getCollectionProducts(
  handle: string,
  opts: { first?: number; sortKey?: ProductCollectionSortKey; reverse?: boolean } = {},
): Promise<ShopifyProduct[]> {
  const { first = 12, sortKey = 'BEST_SELLING', reverse = false } = opts
  const result = await shopifyFetch<any>(
    `query ($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
      collection(handle: $handle) {
        products(first: $first, sortKey: $sortKey, reverse: $reverse) {
          edges { node { ...ProductFields } }
        }
      }
    }
    ${PRODUCT_FRAGMENT}`,
    { handle, first, sortKey, reverse },
  )
  if (!result || !result.data.collection) {
    // Fallback to static demo products filtered by collection
    const { getStaticCollectionProducts } = await import('@/lib/product-data')
    return getStaticCollectionProducts(handle)
  }
  return result.data.collection.products.edges.map((e: any) => normalizeProduct(e.node))
}

// ── Cart ────────────────────────────────────────────────────────────
const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              image { url altText }
              selectedOptions { name value }
              product { title handle images(first: 1) { edges { node { url altText } } } }
            }
          }
        }
      }
    }
  }
`

export async function createCart(variantId: string, quantity = 1): Promise<ShopifyCart | null> {
  const result = await shopifyFetch<any>(
    `mutation ($variantId: ID!, $quantity: Int!) {
      cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: $quantity }] }) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`,
    { variantId, quantity },
  )
  return result?.data?.cartCreate?.cart ?? null
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const result = await shopifyFetch<any>(
    `query ($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
    ${CART_FRAGMENT}`,
    { cartId },
  )
  return result?.data?.cart ?? null
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<ShopifyCart | null> {
  const result = await shopifyFetch<any>(
    `mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  )
  return result?.data?.cartLinesAdd?.cart ?? null
}

export async function updateCartItem(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart | null> {
  const result = await shopifyFetch<any>(
    `mutation ($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lines: [{ id: lineId, quantity }] },
  )
  return result?.data?.cartLinesUpdate?.cart ?? null
}

export async function removeCartItem(cartId: string, lineId: string): Promise<ShopifyCart | null> {
  const result = await shopifyFetch<any>(
    `mutation ($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lineIds: [lineId] },
  )
  return result?.data?.cartLinesRemove?.cart ?? null
}
