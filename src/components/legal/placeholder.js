// Original placeholder copy for `{ placeholder: true, chars: N }` entries in src/data/tools/*.json.
// No Dovetail text is reproduced. Output is deterministic per seed so re-renders don't reshuffle.
//
// kind 'legal'   — reads as obvious placeholder so nobody mistakes it for real terms.
// kind 'neutral' — generic stand-in copy for comparison/article prose.
// kind 'quote'   — clearly marked as a stand-in, so no words are put in a real person's mouth.

const POOLS = {
  legal: [
    'Placeholder legal text.',
    'This paragraph is sample filler and does not form part of any agreement or policy.',
    'Replace this clause with approved wording before publishing.',
    'Nothing in this placeholder creates rights or obligations for anyone.',
    'The real terms for this section are intentionally not reproduced here.',
    'Sample clause text appears here for layout purposes only.',
    'Defined terms, dates and party names would be inserted in the final version.',
    'This line only approximates the length of the original section.',
    'Do not rely on this text.',
    'Lorem-style filler for a legal document layout.',
    'Placeholder wording continues in this sentence.',
    'Any similarity to actual contractual language is coincidental.',
  ],
  neutral: [
    'Placeholder copy for this section.',
    'This text stands in for the original description and is used for layout only.',
    'It approximates the length of the real paragraph without repeating its wording.',
    'Final copy would explain the point in a sentence or two.',
    'Supporting detail would follow here, written in plain language.',
    'The real text is intentionally not reproduced in this clone.',
    'Sample sentence to fill the remaining space.',
    'Additional placeholder words keep the line lengths realistic.',
    'Replace with approved copy before publishing.',
    'More filler text appears here.',
  ],
  quote: [
    'Placeholder quote.',
    'The customer’s own words are not reproduced in this clone.',
    'This stand-in text only matches the approximate length of the original testimonial.',
    'Replace it with the approved quote before publishing.',
    'More placeholder words fill the remaining space.',
  ],
}

const SHORT = {
  legal: ['Placeholder item', 'Sample term', 'Placeholder', 'Sample', 'Item'],
  neutral: ['Placeholder text', 'Sample text', 'Placeholder', 'Sample', 'Text'],
  quote: ['Placeholder quote', 'Placeholder', 'Quote'],
}

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) }
  return h >>> 0
}

// Trim `text` to roughly n chars at a word boundary; ensure a clean ending.
function fit(text, n, endWithPeriod) {
  if (text.length <= n) return text
  const sentenceEnd = text.lastIndexOf('. ', n)
  if (endWithPeriod && sentenceEnd >= n * 0.85) return text.slice(0, sentenceEnd + 1)
  let cut = text.lastIndexOf(' ', n)
  if (cut < n * 0.6) cut = n
  let out = text.slice(0, cut).replace(/[\s,;:]+$/, '')
  if (endWithPeriod && !/[.?!]$/.test(out)) out = out.replace(/[.]?$/, '.')
  return out
}

export function placeholderText(n, seed = '', kind = 'neutral', { period = true } = {}) {
  const pool = POOLS[kind] || POOLS.neutral
  if (n <= 18) {
    const shorts = SHORT[kind] || SHORT.neutral
    const pick = shorts.find((s) => s.length <= n) || shorts[shorts.length - 1]
    return pick
  }
  const start = hash(String(seed)) % pool.length
  // Paragraphs always open with the pool's first (explicit "placeholder") sentence.
  const parts = [pool[0]]
  let i = start === 0 ? 1 : start
  let len = parts[0].length
  while (len < n) {
    const s = pool[i % pool.length]
    if (i % pool.length !== 0) { parts.push(s); len += s.length + 1 }
    i++
  }
  return fit(parts.join(' '), n, period)
}

// Text for a data value that is either a verbatim string or a placeholder object.
export function txt(value, seed, kind = 'neutral') {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (value.placeholder) return placeholderText(value.chars || 80, seed, kind)
  if (value.text) return value.text
  return ''
}

// Link text of exactly-ish `n` chars for placeholder inline links.
export function placeholderLinkText(n) {
  const base = 'placeholder link text reference'
  if (n <= 4) return 'link'.slice(0, Math.max(n, 4))
  return fit(base, n, false)
}
