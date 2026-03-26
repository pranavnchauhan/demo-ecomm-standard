export const brand = {
  // ── Identity ──────────────────────────────────────────────────────
  name: "Nova Threads",
  legalName: "Nova Threads Pty Ltd",
  domain: "novathreads.com.au",
  supportEmail: "hello@novathreads.com.au",
  phone: "1300 123 456",
  abn: "12 345 678 901",

  // ── Visual ────────────────────────────────────────────────────────
  colors: {
    primary: "#000000",
    accent: "#DC2626",
    background: "#ffffff",
    foreground: "#111111",
    muted: "#f5f5f5",
    mutedForeground: "#6b7280",
    border: "#e5e5e5",
  },

  // ── Navigation ────────────────────────────────────────────────────
  navigation: {
    main: [
      { href: "/shop", label: "Shop" },
      { href: "/collections/new-arrivals", label: "New" },
      { href: "/collections/women", label: "Women" },
      { href: "/collections/men", label: "Men" },
      { href: "/collections/accessories", label: "Accessories" },
      { href: "/collections/sale", label: "Sale", highlight: true },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
    footer: {
      shop: [
        { href: "/collections/new-arrivals", label: "New Arrivals" },
        { href: "/collections/women", label: "Women" },
        { href: "/collections/men", label: "Men" },
        { href: "/collections/accessories", label: "Accessories" },
        { href: "/collections/sale", label: "Sale" },
      ],
      help: [
        { href: "/contact", label: "Contact Us" },
        { href: "/policies/shipping", label: "Shipping Info" },
        { href: "/policies/returns", label: "Returns & Exchanges" },
        { href: "/policies/privacy", label: "Privacy Policy" },
        { href: "/policies/terms", label: "Terms of Service" },
      ],
    },
  },

  // ── Announcement Bar ──────────────────────────────────────────────
  announcement: {
    text: "Free shipping on orders over $100",
    links: [
      { href: "#", label: "Track Order" },
      { href: "/contact", label: "Help" },
    ],
  },

  // ── Hero Carousel ─────────────────────────────────────────────────
  hero: {
    slides: [
      {
        season: "SPRING/SUMMER 2026",
        headline: "Define your\nown thread.",
        subtitle: "Thoughtfully designed clothing for modern living. Premium fabrics, timeless silhouettes, effortless style.",
        image: "/images/hero-1.jpg",
        ctaPrimary: { label: "Shop New", href: "/collections/new-arrivals" },
        ctaSecondary: { label: "Shop Sale", href: "/collections/sale" },
      },
      {
        season: "ESSENTIALS COLLECTION",
        headline: "Less is\nmore.",
        subtitle: "Wardrobe staples that work harder. Built to last, designed to layer, made to move.",
        image: "/images/hero-2.jpg",
        ctaPrimary: { label: "Shop Essentials", href: "/shop" },
        ctaSecondary: { label: "Our Story", href: "/about" },
      },
    ],
  },

  // ── Category Collections ──────────────────────────────────────────
  collections: [
    { handle: "women", title: "Women", image: "/images/cat-women.jpg" },
    { handle: "men", title: "Men", image: "/images/cat-men.jpg" },
    { handle: "accessories", title: "Accessories", image: "/images/cat-accessories.jpg" },
    { handle: "sale", title: "Sale", image: "/images/cat-sale.jpg" },
  ],

  // ── Shop Filters ──────────────────────────────────────────────────
  shopFilters: {
    categories: [
      "Tees", "Hoodies", "Jackets", "Pants", "Denim",
      "Dresses", "Skirts", "Activewear", "Shoes", "Accessories",
    ],
  },

  // ── Shipping ──────────────────────────────────────────────────────
  shipping: {
    freeThreshold: 100,
    currency: "AUD",
  },

  // ── Trust Badges ──────────────────────────────────────────────────
  trustBadges: [
    { icon: "truck", text: "Free Shipping" },
    { icon: "refresh-cw", text: "Free Returns" },
    { icon: "shield", text: "Secure Payment" },
  ],

  // ── Social ────────────────────────────────────────────────────────
  social: {
    instagram: "https://instagram.com/novathreads",
    facebook: "https://facebook.com/novathreads",
    tiktok: "https://tiktok.com/@novathreads",
  },

  // ── About ─────────────────────────────────────────────────────────
  about: {
    heroTitle: "Our Story",
    heroSubtitle: "Nova Threads was founded on the belief that great style should never compromise quality, comfort, or responsibility.",
    heroImage: "/images/about-hero.jpg",
    paragraphs: [
      "What began as a small studio dedicated to creating the perfect t-shirt has grown into a complete wardrobe for those who value intentional design. Every piece in our collection is the result of months of development, testing, and refinement.",
      "We work directly with mills and manufacturers who share our values, ensuring that every garment meets the highest standards of quality and ethical production. Our team travels the world to source the finest fabrics from premium cotton to Italian leather to Merino wool.",
      "At Nova Threads, we believe that what you wear should make you feel as good as you look. That's why we obsess over fit, fabric, and function — so you never have to choose between style and comfort.",
    ],
  },

  // ── SEO ───────────────────────────────────────────────────────────
  seo: {
    titleTemplate: "%s | Nova Threads",
    defaultTitle: "Nova Threads | Thoughtfully Designed Clothing",
    defaultDescription: "Thoughtfully designed clothing for modern living. Premium fabrics, timeless silhouettes, effortless style. Free shipping on orders over $100.",
    keywords: ["clothing", "fashion", "mens clothing", "womens clothing", "sustainable fashion", "australian fashion"],
  },
} as const

export type BrandConfig = typeof brand
