// §7 step content. Titles are verbatim from CLONE_SPEC.md; bodies are length-matched placeholders (176–187 chars),
// tuned so line counts match the original at 1440 (4), 1280/768 (3) and 390 (6/6/6/5/6).
export const STEPS = [
  {
    title: 'Stack ranked ideas',
    body: 'Placeholder text for the first step. Incoming requests are grouped, weighed against real evidence, and sorted so the team can see which ideas matter most and why they sit at the top.',
  },
  {
    title: 'Faster customer discovery',
    body: 'Placeholder text for the second step. Teams run interviews and surveys in far less time, capture every single answer in one place, and move from open questions to findings without delay.',
  },
  {
    title: 'Synthesized into context',
    body: 'Placeholder text for the third step. Raw notes, calls and support tickets become structured context that always stays current, so everyone works from the same picture of the customer.',
  },
  {
    title: 'Hand off to coding agents',
    body: 'Placeholder text for the fourth step. Clear specs built from that context are passed to coding agents, giving them the background they need to build the right thing on the first attempt.',
  },
  {
    title: 'Close the loop with customers',
    body: 'Placeholder text for the fifth step. Whenever a change ships, the customers who requested it get notified, and their reactions flow straight back in to start the next turn of the loop.',
  },
].map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0'), img: `/assets/home-loop-step-${i + 1}.png` }))
