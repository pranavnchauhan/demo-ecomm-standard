import { MetadataRoute } from "next"
import { brand } from "@/config/brand"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${brand.domain}`

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...brand.collections.map((c) => ({
      url: `${baseUrl}/collections/${c.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
