import changelog from '../../data/content/changelog.json'

// specs/changelog-index.md + specs/changelog-entry.md. Data: src/data/content/changelog.json.
export const { entries, categories, years, pageTitle } = changelog

const byPath = new Map(entries.map((e) => [e.path, e]))

export function findEntry(slug) {
  return byPath.get(`/changelog/${slug}/`) || null
}

export function categoryBySlug(slug) {
  return categories.find((c) => c.path === `/changelog/category/${slug}/`) || null
}

// content-routes.md "Titles": fallback is to humanise the slug.
export function titleFromSlug(slug) {
  const text = decodeURIComponent(slug).replace(/[-_]+/g, ' ').trim()
  return text ? text[0].toUpperCase() + text.slice(1) : 'Changelog'
}

export const entryYear = (e) => e.date.slice(-4)

// ---------------------------------------------------------------------------
// Placeholder body. The original release notes are NOT reproduced: every entry
// gets neutral, original filler shaped like changelog-entry.md "Representative body"
// (1–3 short paragraphs of ~120–250 chars, an occasional 3–5 item list, rare h3s).
// bodyShape only decides which of those parts appear, never their wording.
// ---------------------------------------------------------------------------
const PARAGRAPHS = [
  'This is placeholder copy for the release note. It stands in for the original description and keeps the page at a realistic length while the content is being prepared.',
  'Changes like this one are rolled out gradually across workspaces. If something looks different from what is described here, it may simply not have reached your account yet.',
  'The update is available to workspace members with the relevant permissions. Admins can review the settings at any time and adjust them to suit how their team works.',
  'We shipped this improvement in response to feedback from teams using the product every day. Further refinements are planned, and suggestions are always welcome.',
  'Existing work is not affected by this change. Anything created before the release keeps its current behaviour, and new items pick up the updated behaviour automatically.',
  'Sample text appears in this section to illustrate the layout of a changelog entry. It covers what changed, who it applies to, and where to find more detail.',
]

const LIST_ITEMS = [
  'A short summary of the first change in this release',
  'Clearer labels and spacing in the affected views',
  'Faster loading when working with larger amounts of data',
  'Updated settings so admins can control availability',
  'Minor fixes and polish based on early feedback',
]

const HEADINGS = ['What is new', 'How it works', 'Getting started', 'Availability']

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n))

// Returns an array of blocks: { type: 'p' | 'ul' | 'h3' | 'hr', text?, items? }
export function placeholderBody(key, shape) {
  const seed = hash(key)
  const s = shape || { p: 2 }
  const pCount = clamp(s.p || 0, 1, 3)
  const hasList = (s.ul || 0) > 0
  const listLen = hasList ? clamp(Math.round((s.li || 3) / s.ul), 3, 5) : 0
  const hasHeading = (s.h3 || 0) + (s.h2 || 0) > 0
  const hasHr = (s.hr || 0) > 0

  const para = (i) => ({ type: 'p', text: PARAGRAPHS[(seed + i) % PARAGRAPHS.length] })
  const list = () => ({
    type: 'ul',
    items: Array.from({ length: listLen }, (_, i) => LIST_ITEMS[(seed + i) % LIST_ITEMS.length]),
  })

  const blocks = [para(0)]
  if (hasHeading) blocks.push({ type: 'h3', text: HEADINGS[seed % HEADINGS.length] })
  for (let i = 1; i < pCount; i++) blocks.push(para(i))
  if (hasList) {
    if (hasHr) blocks.push({ type: 'hr' })
    blocks.push(list())
  }
  return blocks
}
