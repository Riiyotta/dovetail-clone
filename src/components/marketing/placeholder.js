// Neutral placeholder copy for data fields recorded as {"placeholder": true, "chars": N}
// (marketing-shared.md §1). Deterministic per seed so it doesn't change between renders.
const WORDS = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore ' +
  'magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo ' +
  'consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint ' +
  'occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'
).split(' ')

export function placeholder(chars, seed = 0) {
  const target = Math.max(1, chars | 0)
  let out = ''
  let i = (seed * 7) % WORDS.length
  let inSentence = 0
  let sentenceLen = 9 + (seed % 5)
  while (out.length < target + 12) {
    let w = WORDS[i % WORDS.length]
    if (inSentence === 0) w = w[0].toUpperCase() + w.slice(1)
    inSentence++
    const end = inSentence >= sentenceLen
    out += (out ? ' ' : '') + w + (end ? '.' : '')
    if (end) { inSentence = 0; sentenceLen = 8 + ((i + seed) % 7) }
    i += 3
  }
  // Cut back to a word boundary just under the target, then close with a full stop.
  let cut = out.slice(0, target - 1)
  const sp = cut.lastIndexOf(' ')
  if (sp > target * 0.6) cut = cut.slice(0, sp)
  cut = cut.replace(/[.,\s]+$/, '')
  return `${cut}.`
}
