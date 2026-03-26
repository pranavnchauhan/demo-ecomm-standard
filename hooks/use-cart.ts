"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { Product, ProductVariant, ShopifyCart } from "@/lib/shopify/types"

export const CART_ID_KEY = "novathreads_cart_id"

async function cartApi(
  body: Record<string, unknown>,
): Promise<{ cart: ShopifyCart | null; error?: string }> {
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    return await res.json()
  } catch {
    return { cart: null, error: "Network error" }
  }
}

export type CartState = {
  cart: ShopifyCart | null
  isLoading: boolean
  isOpen: boolean
  operationInProgress: boolean
  itemCount: number
  openCart: () => void
  closeCart: () => void
  addItem: (variant: ProductVariant, product: Product) => Promise<void>
  updateQuantity: (lineId: string, newQty: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  clearCart: () => void
  refreshCart: () => Promise<void>
}

export function useCartState(): CartState {
  const [cart, setCartRaw] = useState<ShopifyCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [operationInProgress, setOperationInProgress] = useState(false)
  const mutationLock = useRef(false)
  const cartRef = useRef<ShopifyCart | null>(null)

  function setCart(next: ShopifyCart | null) {
    cartRef.current = next
    setCartRaw(next)
  }

  useEffect(() => {
    async function initCart() {
      setIsLoading(true)
      const storedId = typeof window !== "undefined" ? localStorage.getItem(CART_ID_KEY) : null
      if (storedId) {
        const { cart: fetched } = await cartApi({ action: "get", cartId: storedId })
        if (fetched && fetched.lines.edges.length > 0) {
          setCart(fetched)
        } else {
          localStorage.removeItem(CART_ID_KEY)
          setCart(null)
        }
      } else {
        setCart(null)
      }
      setIsLoading(false)
    }
    initCart()
  }, [])

  const addItem = useCallback(async (variant: ProductVariant, _product: Product) => {
    if (mutationLock.current) return
    mutationLock.current = true
    setOperationInProgress(true)
    try {
      const current = cartRef.current
      if (current?.id) {
        const existingLine = current.lines.edges.find((e) => e.node.merchandise.id === variant.id)
        if (existingLine) {
          const { cart: updated } = await cartApi({
            action: "updateLines", cartId: current.id,
            lineId: existingLine.node.id, quantity: existingLine.node.quantity + 1,
          })
          if (updated) setCart(updated)
        } else {
          const { cart: updated } = await cartApi({
            action: "addLines", cartId: current.id, variantId: variant.id, quantity: 1,
          })
          if (updated) setCart(updated)
        }
      } else {
        const { cart: created } = await cartApi({ action: "create", variantId: variant.id, quantity: 1 })
        if (created?.id) {
          localStorage.setItem(CART_ID_KEY, created.id)
          setCart(created)
        }
      }
      setIsOpen(true)
    } finally {
      mutationLock.current = false
      setOperationInProgress(false)
    }
  }, [])

  const updateQuantity = useCallback(async (lineId: string, newQty: number) => {
    if (mutationLock.current) return
    mutationLock.current = true
    setOperationInProgress(true)
    try {
      const current = cartRef.current
      if (!current?.id) return
      let updated: ShopifyCart | null = null
      if (newQty <= 0) {
        const result = await cartApi({ action: "removeLines", cartId: current.id, lineId })
        updated = result.cart
      } else {
        const result = await cartApi({ action: "updateLines", cartId: current.id, lineId, quantity: newQty })
        updated = result.cart
      }
      if (updated) {
        if (updated.lines.edges.length === 0) {
          localStorage.removeItem(CART_ID_KEY)
          setCart(null)
        } else {
          setCart(updated)
        }
      }
    } finally {
      mutationLock.current = false
      setOperationInProgress(false)
    }
  }, [])

  const removeItem = useCallback(async (lineId: string) => {
    if (mutationLock.current) return
    mutationLock.current = true
    setOperationInProgress(true)
    try {
      const current = cartRef.current
      if (!current?.id) return
      const { cart: updated } = await cartApi({ action: "removeLines", cartId: current.id, lineId })
      if (updated) {
        if (updated.lines.edges.length === 0) {
          localStorage.removeItem(CART_ID_KEY)
          setCart(null)
        } else {
          setCart(updated)
        }
      }
    } finally {
      mutationLock.current = false
      setOperationInProgress(false)
    }
  }, [])

  const refreshCart = useCallback(async () => {
    setIsLoading(true)
    const storedId = typeof window !== "undefined" ? localStorage.getItem(CART_ID_KEY) : null
    if (storedId) {
      const { cart: fetched } = await cartApi({ action: "get", cartId: storedId })
      if (fetched && fetched.lines.edges.length > 0) { setCart(fetched) } else {
        localStorage.removeItem(CART_ID_KEY); setCart(null)
      }
    } else { setCart(null) }
    setIsLoading(false)
  }, [])

  const clearCart = useCallback(() => {
    setCart(null)
    if (typeof window !== "undefined") localStorage.removeItem(CART_ID_KEY)
  }, [])

  const itemCount = cart?.lines.edges.reduce((acc, e) => acc + e.node.quantity, 0) ?? 0

  return { cart, isLoading, isOpen, operationInProgress, itemCount, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false), addItem, updateQuantity, removeItem, clearCart, refreshCart }
}
