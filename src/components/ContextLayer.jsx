import TopicTabs from './topics/TopicTabs.jsx'
import QuoteCard from './topics/QuoteCard.jsx'
import StatCard from './topics/StatCard.jsx'
import '../styles/topics.css'
import '../styles/ContextLayer.css'

// §4 "Build your customer context layer". Paragraph/quote copy is length-matched placeholder (spec gives char counts only).
const INTRO =
  'Bring in every interview, ticket, call and survey into one shared layer so your teams and tools can draw on the same up-to-date picture of the people you build for.'

const TOPICS = [
  {
    label: 'Turn every customer interaction into context',
    image: '/assets/home-context-integrations.png',
    desc: 'Connect the places where feedback already lives and let it flow in automatically. Each new conversation is organized, tagged and linked to related signals, so nothing useful gets lost along the way to your team.',
    link: { label: 'Explore integrations', href: '#' },
  },
  {
    label: 'Stop paying to process the same data twice',
    image: '/assets/home-context-ai.png',
    desc: 'Analysis happens once and is stored for reuse. Every later question draws on work that is already done, which keeps results consistent and avoids running the same expensive jobs over again.',
    link: { label: 'Explore Dovetail AI', href: '#' },
  },
  {
    label: 'Bring customer context into your AI tools',
    image: '/assets/home-context-mcp.png',
    desc: 'Give the assistants and agents your teams already use direct access to grounded customer knowledge, so their answers reflect real evidence rather than generic guesses or old, outdated notes.',
    link: { label: 'Explore MCP connectors', href: '#' },
  },
  {
    label: 'Integrate Dovetail into your existing stack',
    image: '/assets/home-context-api.png',
    desc: 'Use a documented interface and command line tools to read and write data from your own systems. Build custom pipelines, sync your records and automate routine tasks without leaving your workflow.',
    link: { label: 'Explore API and CLI', href: '#' },
  },
]

const QUOTE =
  '“Having every piece of research in one searchable place has changed how we plan. Teams find past findings in minutes, reuse what already exists and spend far more of their working week on the decisions that matter.”'

export default function ContextLayer() {
  return (
    <section className="topics-section context-layer">
      <div className="container">
        <h2 className="h96">
          <div className="context-h2-row">
            <span>Build your</span>
            <span className="h96-serif">customer</span>
          </div>
          <div className="context-h2-row">
            <span>context</span>
            <img className="context-h2-img" src="/assets/home-context-magnifier.png" alt="" />
            <span>layer</span>
          </div>
        </h2>

        <TopicTabs intro={INTRO} topics={TOPICS} />

        <div className="proof-row">
          <QuoteCard
            href="#"
            quote={QUOTE}
            name="Renato Leite"
            role="Head of Research Ops, Itaú Unibanco"
            avatar="/assets/home-punch-avatar-renato.png"
            logo={{
              src: '/assets/white-logo.svg',
              box: [40, 40],
              img: { top: '-3.99px', left: 0, width: '106.67px', height: '48px' },
            }}
          />
          <StatCard
            href="#"
            number="30hrs"
            title="Weekly time saved per user"
            desc="A full workweek back, every week. Powered by AI analysis."
            descMaxWidth={283}
          />
        </div>
      </div>
    </section>
  )
}
