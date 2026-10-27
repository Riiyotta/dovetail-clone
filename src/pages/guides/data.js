import { useEffect, useState } from 'react'

// Guide hubs (content-routes.md) and their display names (guide-article.md `categoryName`).
export const HUBS = [
  'research', 'ux', 'product-development', 'employee-experience', 'customer-research',
  'market-research', 'patient-experience', 'surveys', 'product-management', 'design-thinking',
]

// Lazy JSON loaders (one chunk per file).
const LOADERS = {
  research: () => import('../../data/content/research.json'),
  ux: () => import('../../data/content/ux.json'),
  'product-development': () => import('../../data/content/product-development.json'),
  'employee-experience': () => import('../../data/content/employee-experience.json'),
  'customer-research': () => import('../../data/content/customer-research.json'),
  'market-research': () => import('../../data/content/market-research.json'),
  'patient-experience': () => import('../../data/content/patient-experience.json'),
  surveys: () => import('../../data/content/surveys.json'),
  'product-management': () => import('../../data/content/product-management.json'),
  'design-thinking': () => import('../../data/content/design-thinking.json'),
  guides: () => import('../../data/content/guides.json'),
  contributors: () => import('../../data/content/contributors.json'),
}

const cache = new Map()

export function useContent(name) {
  const [, force] = useState(0)
  useEffect(() => {
    if (cache.has(name)) return undefined
    let live = true
    LOADERS[name]().then((m) => {
      cache.set(name, m.default)
      if (live) force((n) => n + 1)
    })
    return () => { live = false }
  }, [name])
  return cache.get(name) || null
}

// content-shared.md §4.8 — full related-topics list, in order.
export const RELATED_TOPICS = [
  { text: 'Customer research', href: '/customer-research/' },
  { text: 'Design thinking', href: '/design-thinking/' },
  { text: 'Employee experience', href: '/employee-experience/' },
  { text: 'Enterprise', href: '/enterprise/' },
  { text: 'Market research', href: '/market-research/' },
  { text: 'Patient experience', href: '/patient-experience/' },
  { text: 'Product development', href: '/product-development/' },
  { text: 'Product management', href: '/product-management/' },
  { text: 'Research maturity assessment', href: '/research-maturity-assessment/' },
  { text: 'Research methods', href: '/research/' },
  { text: 'Surveys', href: '/surveys/' },
  { text: 'User experience (UX)', href: '/ux/' },
]

// content-routes.md fallback: humanise the slug.
export function humanize(slug) {
  const s = String(slug || '').replace(/[-_]+/g, ' ').trim()
  return s.charAt(0).toUpperCase() + s.slice(1)
}
