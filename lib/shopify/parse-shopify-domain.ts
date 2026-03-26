export function parseShopifyDomain(raw: string): string {
  let domain = raw.trim()
  domain = domain.replace(/^https?:\/\//, '')
  domain = domain.replace(/\/+$/, '')
  if (!domain.includes('.')) {
    domain = `${domain}.myshopify.com`
  }
  return domain
}
