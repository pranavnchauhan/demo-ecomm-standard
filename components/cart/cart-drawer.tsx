"use client"

import { useCart } from "@/components/cart/cart-context"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { brand } from "@/config/brand"

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, operationInProgress, itemCount } = useCart()

  if (!isOpen) return null

  const lines = cart?.lines.edges.map((e) => e.node) ?? []
  const subtotal = cart?.cost.subtotalAmount?.amount ?? "0.00"
  const currency = cart?.cost.subtotalAmount?.currencyCode ?? "AUD"

  const isDemo = !cart?.checkoutUrl || cart.checkoutUrl.startsWith("#")

  function handleCheckout() {
    if (!isDemo && cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Cart ({itemCount})
          </h2>
          <button onClick={closeCart} className="p-2 hover:bg-muted rounded-full" aria-label="Close cart">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
              <ShoppingBag className="w-12 h-12" />
              <p>Your cart is empty</p>
              <Link href="/shop" onClick={closeCart} className="text-sm underline text-foreground">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => {
                const image = line.merchandise.product?.images?.edges?.[0]?.node
                const options = line.merchandise.selectedOptions
                  ?.filter((o) => o.name !== "Title")
                  .map((o) => o.value)
                  .join(" / ")

                return (
                  <li key={line.id} className="flex gap-4 py-3 border-b border-border last:border-0">
                    {/* Image */}
                    <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {image?.url && (
                        <Image
                          src={image.url}
                          alt={image.altText || line.merchandise.product?.title || ""}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{line.merchandise.product?.title}</p>
                      {options && <p className="text-xs text-muted-foreground mt-0.5">{options}</p>}
                      <p className="text-sm font-semibold mt-1">
                        ${parseFloat(line.merchandise.price.amount).toFixed(2)} {currency}
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateItem(line.id, line.quantity - 1)}
                          disabled={operationInProgress}
                          className="w-7 h-7 flex items-center justify-center border border-border rounded hover:bg-muted disabled:opacity-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-6 text-center">{line.quantity}</span>
                        <button
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          disabled={operationInProgress}
                          className="w-7 h-7 flex items-center justify-center border border-border rounded hover:bg-muted disabled:opacity-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(line.id)}
                      disabled={operationInProgress}
                      className="text-muted-foreground hover:text-foreground self-start"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            {/* Free shipping threshold */}
            {parseFloat(subtotal) < brand.shipping.freeThreshold && (
              <p className="text-xs text-center text-muted-foreground">
                Add ${(brand.shipping.freeThreshold - parseFloat(subtotal)).toFixed(2)} more for free shipping!
              </p>
            )}

            <div className="flex items-center justify-between">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold">${parseFloat(subtotal).toFixed(2)} {currency}</span>
            </div>
            <p className="text-xs text-muted-foreground">Shipping & taxes calculated at checkout</p>

            <button
              onClick={handleCheckout}
              disabled={operationInProgress || isDemo}
              className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isDemo ? "Checkout (Connect Shopify)" : "Checkout"}
            </button>
            {isDemo && (
              <p className="text-[11px] text-center text-muted-foreground">
                Demo mode — connect Shopify to enable native checkout with shipping, taxes & payment
              </p>
            )}
            <button onClick={closeCart} className="w-full text-sm text-center text-muted-foreground hover:text-foreground">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
