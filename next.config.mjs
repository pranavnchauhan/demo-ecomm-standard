/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://cdn.shopify.com https://*.myshopify.com https://www.googletagmanager.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.shopify.com https://www.google-analytics.com https://va.vercel-scripts.com",
              "frame-src https://www.googletagmanager.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "**.myshopify.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/products/:handle", destination: "/shop/:handle", permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
    ]
  },
}

export default nextConfig
