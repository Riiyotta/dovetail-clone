import { placeholder } from '../marketing/placeholder.js'

// Copy helpers for company data. Fields recorded as { placeholder: true, chars: N } get neutral placeholder
// text of about N characters (reuses the marketing generator); plain strings are returned as-is.
//   copy(field, seed)       → string (or '' for null)
//   quoteCopy(field, seed)  → curly-quoted string. Placeholder quotes start with "Placeholder quote." so no
//                             invented words are attributed to a real person. Verbatim quotes that already
//                             carry curly quotes are left untouched.
export function isPlaceholder(field) {
  return !!field && typeof field === 'object' && field.placeholder === true
}

export function copy(field, seed = 0) {
  if (field == null) return ''
  if (typeof field === 'string') return field
  if (isPlaceholder(field)) return placeholder(field.chars || 40, seed)
  if (typeof field.text === 'string') return field.text
  return ''
}

export function quoteCopy(field, seed = 0) {
  if (field == null) return ''
  if (isPlaceholder(field)) {
    const n = Math.max(0, (field.chars || 40) - 20)
    const body = n > 8 ? ` ${placeholder(n, seed)}` : ''
    return `“Placeholder quote.${body}”`
  }
  const s = copy(field, seed).trim()
  if (/^[“"]/.test(s)) return s
  return `“${s}”`
}

// Stable small integer from a string, for placeholder seeds.
export function seedOf(str = '') {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 9973
  return h
}
