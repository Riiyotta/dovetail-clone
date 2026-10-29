// Placeholder article bodies. Per the copy rule, no Dovetail writing is reproduced: the structure comes from
// the recorded `bodyOrder` / `bodyShape` (specs/blog-post.md), and every word below is original, neutral filler.

const SENTENCES = [
  'This is placeholder copy standing in for the original article text.',
  'It keeps the rhythm and length of a real paragraph without reproducing any published writing.',
  'The sentences are intentionally generic so the layout can be reviewed on its own terms.',
  'Each block follows the recorded structure of the source post, in the same order.',
  'Line length, spacing and paragraph breaks are what matter at this stage.',
  'Final copy will replace this text once it has been written and approved.',
  'Someone scanning this section should notice the typography rather than the content.',
  'Longer passages like this one help check how the column handles several lines of wrapped text across breakpoints.',
  'Nothing in this paragraph is meant to be quoted or read as a statement of fact.',
  'Headings, lists and media blocks appear where the original article placed them.',
  'A short sentence works too.',
  'The goal is a believable texture, not a believable argument.',
  'Spacing between paragraphs comes from the shared rich text styles.',
  'This text is neutral by design and carries no opinion about the topic in the title.',
  'Use it to judge measure, contrast and vertical rhythm.',
  'More sentences are added until the paragraph reaches roughly the length of the one it replaces.',
]

const H2 = [
  'Placeholder section heading',
  'A second section starts here',
  'Section heading goes here',
  'Supporting detail heading',
  'Another placeholder heading',
  'Closing section heading',
]
const H3 = ['Placeholder subheading', 'Another subheading', 'Subheading goes here']
const H4 = ['Placeholder interview question?', 'Another placeholder question?', 'A follow-up question goes here?']
const LIST = [
  'Placeholder list item that stays fairly short.',
  'A second item with slightly longer placeholder wording to vary the line length.',
  'Third item, kept brief.',
  'Another neutral item standing in for the original point.',
  'A final item to round out the list.',
  'One more placeholder item.',
]

// Typical placeholder shape from specs/blog-post.md "Representative body" (used for unknown slugs and posts
// whose structure wasn't recorded).
export const DEFAULT_SHAPE = { chars: 7200, p: 27, h2: 5, img: 2, ul: 1, li: 5, blockquote: 1 }
export const DEFAULT_ORDER = 'img h2 h2 img h2 ul h2 blockquote h2'
export const DEFAULT_LEDE_CHARS = 150

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619)
  return h >>> 0
}

function rng(seed) {
  let s = seed || 1
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}

// Adds sentences until the text is close to `target` characters (prefers sentences that don't overshoot).
function filler(rand, target) {
  let out = ''
  while (out.length < target) {
    let s = SENTENCES[Math.floor(rand() * SENTENCES.length)]
    for (let tries = 0; tries < 8 && out && out.length + s.length + 1 > target * 1.05; tries++) {
      s = SENTENCES[Math.floor(rand() * SENTENCES.length)]
    }
    if (out && out.length + s.length + 1 > target * 1.05 && out.length >= target * 0.8) break
    out = out ? `${out} ${s}` : s
  }
  return out
}

export function placeholderLede(slug, chars) {
  return filler(rng(hash(`${slug}:lede`)), Math.max(40, chars))
}

// Distribute `total` paragraphs over slots by weight (largest remainder).
function distribute(total, weights) {
  const sum = weights.reduce((a, b) => a + b, 0) || 1
  const raw = weights.map((w) => (total * w) / sum)
  const out = raw.map(Math.floor)
  let left = total - out.reduce((a, b) => a + b, 0)
  raw
    .map((r, i) => [r - Math.floor(r), i])
    .sort((a, b) => b[0] - a[0])
    .forEach(([, i]) => { if (left > 0) { out[i] += 1; left -= 1 } })
  return out
}

const WEIGHT = { h2: 3, h3: 2, h4: 1 }

export function placeholderBody(slug, shape, order) {
  const s = shape || DEFAULT_SHAPE
  const tokens = (order ?? DEFAULT_ORDER).split(/\s+/).filter(Boolean)
  const rand = rng(hash(slug))
  const pCount = Math.max(s.p || 0, 1)
  const slots = distribute(pCount, [3, ...tokens.map((t) => WEIGHT[t] ?? 0.5)])
  const pLen = Math.min(700, Math.max(40, Math.round(((s.chars || 0) * 0.85) / pCount)))
  const lists = tokens.filter((t) => t === 'ul' || t === 'ol').length
  const liPer = lists ? Math.min(6, Math.max(3, Math.round((s.li || lists * 4) / lists))) : 0

  const nodes = []
  const n = { h2: 0, h3: 0, h4: 0 }
  const paras = (count) => {
    for (let i = 0; i < count; i++) {
      const target = pLen * (0.6 + rand() * 0.8)
      nodes.push({ type: 'p', text: filler(rand, target) })
    }
  }

  paras(slots[0])
  tokens.forEach((t, i) => {
    if (t === 'h2') nodes.push({ type: 'h2', text: H2[n.h2++ % H2.length] })
    else if (t === 'h3') nodes.push({ type: 'h3', text: H3[n.h3++ % H3.length] })
    else if (t === 'h4') nodes.push({ type: 'h4', text: H4[n.h4++ % H4.length] })
    else if (t === 'ul' || t === 'ol') nodes.push({ type: t, items: LIST.slice(0, liPer) })
    else if (t === 'blockquote') nodes.push({ type: 'blockquote', text: filler(rand, 160) })
    else if (t === 'figure') nodes.push({ type: 'figure', caption: 'Placeholder caption for this figure.' })
    else if (t === 'table') nodes.push({ type: 'table' })
    else nodes.push({ type: t }) // img, video, iframe, hr
    paras(slots[i + 1])
  })
  return nodes
}

// Posts with a measured `bodyBlocks` list (block order, paragraph chars/lines, image aspect ratios recorded from the
// live post at 1440) get exactly that structure; the words are still original filler. `lines` is passed through
// so the renderer can reserve the original line count at desktop widths.
export function placeholderBodyFromBlocks(slug, blocks) {
  const rand = rng(hash(slug))
  let h2 = 0
  return blocks.map((b) => {
    if (b.t === 'p') return { type: 'p', text: filler(rand, b.chars || 200), lines: b.lines }
    if (b.t === 'h2' || b.t === 'h3') return { type: b.t, text: H2[h2++ % H2.length], lines: b.lines }
    if (b.t === 'img') return { type: 'img', aspect: b.aspect }
    return { type: b.t } // iframe, hr
  })
}
