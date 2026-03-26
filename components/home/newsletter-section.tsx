"use client"

import { useState } from "react"
import { brand } from "@/config/brand"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setEmail("")
  }

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight mb-4">Stay in the Thread</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe for new arrivals, exclusive offers, and 10% off your first order.
          </p>
          {submitted ? (
            <p className="text-sm font-medium">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:opacity-90 transition-opacity text-sm"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
