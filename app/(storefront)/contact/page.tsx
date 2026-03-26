"use client"

import { useState } from "react"
import { brand } from "@/config/brand"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
      }),
    })

    setSubmitted(true)
    form.reset()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-center mb-4">Get in Touch</h1>
      <p className="text-center text-muted-foreground mb-10">
        Have a question? We&apos;d love to hear from you.
      </p>

      {submitted ? (
        <div className="text-center py-12">
          <p className="text-lg font-medium">Thanks for your message!</p>
          <p className="text-muted-foreground mt-2">We&apos;ll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text" id="name" name="name" required
              className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email" id="email" name="email" required
              className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <textarea
              id="message" name="message" rows={5} required
              className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>
      )}

      <div className="mt-16 grid sm:grid-cols-2 gap-8 text-center">
        <div>
          <h3 className="font-semibold mb-2">Email</h3>
          <a href={`mailto:${brand.supportEmail}`} className="text-muted-foreground hover:text-foreground text-sm">
            {brand.supportEmail}
          </a>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Phone</h3>
          <a href={`tel:${brand.phone}`} className="text-muted-foreground hover:text-foreground text-sm">
            {brand.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
