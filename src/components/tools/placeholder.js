// Original, neutral placeholder copy for data fields recorded as { placeholder: true, chars: N }.
// No original wording is reproduced; output is roughly N characters long and deterministic per seed.

const SENTENCES = [
  'This is placeholder copy standing in for the original text on this page.',
  'It describes the general idea in plain, neutral language.',
  'Teams can use this space to explain what the section covers and why it matters.',
  'The final wording will be supplied separately.',
  'Short, clear sentences keep the layout close to the measured line count.',
  'Details here are illustrative only.',
  'A brief summary helps readers decide where to look next.',
  'The structure mirrors the source while the words are new.',
  'Each paragraph keeps a similar length to preserve the rhythm of the page.',
  'More information is available elsewhere on the site.',
]

export function placeholder(chars, seed = 0) {
  const n = Math.max(4, chars | 0)
  let out = ''
  let i = seed
  while (out.length < n) {
    out += (out ? ' ' : '') + SENTENCES[i % SENTENCES.length]
    i += 1
  }
  if (out.length > n) {
    out = out.slice(0, n - 1).replace(/[\s,.]+\S*$/, '')
    if (!out) out = SENTENCES[0].slice(0, n - 1)
    out += '.'
  }
  return out
}

// Resolve a data value (string or placeholder object) to display text.
export function txt(value, seed = 0) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (value.placeholder) return placeholder(value.chars, seed)
  return ''
}
