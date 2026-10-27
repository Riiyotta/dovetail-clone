// Original, neutral placeholder copy. Article bodies are generated from the recorded structure
// (`bodyOrder` / `bodyShape`) — no Dovetail article text is reproduced.

const SENTENCES = [
  'This section is placeholder copy that stands in for the original article text.',
  'Teams often begin by agreeing on the question they want to answer and the decision it will inform.',
  'A short planning step helps everyone understand the scope, the timeline and who needs to be involved.',
  'Notes gathered along the way are easier to compare when they follow a consistent structure.',
  'It is worth checking early assumptions against what people actually say and do.',
  'Small, regular reviews tend to surface patterns sooner than one large review at the end.',
  'Clear summaries make it simpler for colleagues outside the project to act on the findings.',
  'Each approach has trade-offs, so the right choice depends on the goal, the budget and the time available.',
  'Writing down the reasoning behind a decision makes it easier to revisit later.',
  'Mixing a few complementary methods usually gives a more balanced picture than relying on one.',
  'Sharing progress openly invites useful questions before the work is finished.',
  'A simple checklist can keep the process consistent from one round to the next.',
  'Outcomes are easier to judge when there is a baseline to compare against.',
  'Over time, a shared library of past work saves effort and avoids repeating the same study.',
  'Feedback from a pilot run often highlights steps that need to be clarified.',
  'The examples below are illustrative and should be adapted to your own context.',
  'Keeping the language plain helps readers focus on what matters most.',
  'Responsibilities are clearer when each step has a named owner.',
  'Not every finding needs action, but every finding deserves a clear status.',
  'Revisiting the original goal at the end is a useful way to check whether it was met.',
  'Good documentation lets new team members pick up the work without starting over.',
  'Short sessions with a focused agenda tend to produce more usable notes.',
  'Visual summaries can help when the audience has limited time.',
  'Where possible, combine numbers with quotes so the story stays grounded.',
  'Start small and adjust as you go.',
  'Context matters here.',
  'Review the results together as a team.',
  'Keep the audience in mind throughout.',
  'This is placeholder text.',
]

const H2 = [
  'Overview', 'Key concepts', 'Why it matters', 'Getting started', 'Common approaches',
  'Planning the work', 'Putting it into practice', 'Measuring outcomes', 'Challenges to watch for',
  'Tools and resources', 'Good practices', 'Working with stakeholders', 'Examples', 'Next steps', 'Summary',
]
const H3 = [
  'Define the goal', 'Choose a method', 'Gather inputs', 'Review the evidence', 'Share what you learn',
  'Set a baseline', 'Involve the right people', 'Document decisions', 'Check assumptions', 'Plan the timeline',
  'Keep it consistent', 'Look for patterns', 'Prioritize next actions', 'Follow up', 'Reflect and adjust',
  'Agree on scope', 'Prepare materials', 'Run a pilot', 'Compare options', 'Communicate results',
]
const LI = [
  'A clear statement of the goal', 'A realistic timeline', 'The people who need to be involved',
  'How results will be shared', 'A consistent note-taking format', 'Criteria for deciding what comes next',
  'A short list of open questions', 'Where supporting material is stored', 'An agreed definition of done',
  'Checkpoints for reviewing progress', 'A plan for follow-up', 'Known constraints and risks',
]

// Deterministic PRNG seeded from a string (mulberry32 over a simple string hash).
export function rng(seedStr) {
  let h = 1779033703 ^ String(seedStr).length
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  let a = h >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Placeholder text of ~`len` characters, ending with a full stop.
export function fill(len, rand = rng('fill' + len)) {
  if (len <= 0) return ''
  let out = ''
  let i = Math.floor(rand() * SENTENCES.length)
  while (out.length < len) {
    const s = SENTENCES[i % SENTENCES.length]
    i += 1 + Math.floor(rand() * 3)
    const room = len - out.length - (out ? 1 : 0)
    if (s.length <= room + 4) { out += (out ? ' ' : '') + s; continue }
    // otherwise prefer any whole sentence that fits the remaining room
    const alt = SENTENCES.find((x) => x.length <= room + 6 && x.length >= room - 8)
    if (alt) { out += (out ? ' ' : '') + alt; break }
    if (room < 28 && out) break
    // shorten the sentence at a word boundary so the total lands near `len`
    const cut = s.lastIndexOf(' ', room)
    out += (out ? ' ' : '') + s.slice(0, cut > 0 ? cut : room).replace(/[,;:]$/, '') + '.'
    break
  }
  return out
}

// Real first sentence (recorded in data) followed by placeholder up to the recorded length.
export function padTo(first, total, seed) {
  if (!first) return fill(total, rng(seed))
  const rest = total - first.length - 1
  return rest > 20 ? `${first} ${fill(rest, rng(seed))}` : first
}

const DEFAULT_ORDER = 'h2 h3 h3 ul h2 h3 h3 h2 ul h3 h3 h2 h3 h3 ul h2 h3 h3 h2 h3 h3 ul h2 h3 h3'
const DEFAULT_SHAPE = { chars: 11900, p: 47, h2: 7, h3: 14, ul: 4, li: 18 }

// Build a body model: [{type:'p'|'h2'|'h3'|'ul'|'ol'|'table'|'blockquote', ...}].
export function buildBody(seed, bodyOrder, bodyShape) {
  const rand = rng(seed)
  const order = (bodyOrder || DEFAULT_ORDER).split(' ').filter(Boolean)
  const shape = { ...DEFAULT_SHAPE, ...(bodyShape || {}) }
  const headings = order.filter((t) => t === 'h2' || t === 'h3').length
  const lists = order.filter((t) => t === 'ul' || t === 'ol').length
  const tables = order.filter((t) => t === 'table').length
  const quotes = order.filter((t) => t === 'blockquote').length
  const pTotal = Math.max(2, (shape.p || 0) - quotes)
  const liTotal = shape.li || lists * 4
  const liPer = lists ? Math.max(2, Math.round(liTotal / lists)) : 0
  const textBudget = (shape.chars || DEFAULT_SHAPE.chars) - headings * 22 - lists * liPer * 40 - tables * 260
  const pLen = Math.max(90, Math.round(textBudget / (pTotal + quotes)))
  const para = () => ({ type: 'p', text: fill(Math.round(pLen * (0.65 + rand() * 0.7)), rand) })

  const intro = Math.min(2, pTotal)
  let left = pTotal - intro
  const perHeading = headings ? left / headings : 0
  let carry = 0
  const out = []
  for (let i = 0; i < intro; i++) out.push(para())
  let h2i = 0
  let h3i = 0
  let hi = 0
  for (const t of order) {
    if (t === 'h2' || t === 'h3') {
      const bank = t === 'h2' ? H2 : H3
      const n = t === 'h2' ? h2i++ : h3i++
      out.push({ type: t, id: `section-${hi}`, text: bank[n % bank.length] })
      hi++
      carry += perHeading
      const k = Math.min(left, Math.floor(carry))
      carry -= k
      left -= k
      for (let j = 0; j < k; j++) out.push(para())
    } else if (t === 'ul' || t === 'ol') {
      const start = Math.floor(rand() * LI.length)
      out.push({ type: t, items: Array.from({ length: liPer }, (_, j) => LI[(start + j) % LI.length]) })
    } else if (t === 'table') {
      out.push({
        type: 'table',
        head: ['Item', 'Description', 'Notes'],
        rows: [1, 2, 3, 4].map((r) => [`Example ${r}`, fill(40 + Math.floor(rand() * 30), rand), fill(24, rand)]),
      })
    } else if (t === 'blockquote') {
      out.push({ type: 'blockquote', text: fill(Math.round(pLen * 0.8), rand) })
    }
  }
  for (let j = 0; j < left; j++) out.push(para())
  return out
}
