import TopicTabs from './topics/TopicTabs.jsx'
import QuoteCard from './topics/QuoteCard.jsx'
import StatCard from './topics/StatCard.jsx'
import '../styles/topics.css'
import '../styles/Prompt.css'

// §6 "Put the customer in every prompt". Paragraph/quote copy is length-matched placeholder (spec gives char counts only).
const INTRO =
  'Give every model, agent and teammate the same grounded view of your customers, so the work they produce starts from real needs instead of assumptions pulled from thin air.'

const TOPICS = [
  {
    label: 'Simulate customers and market segments',
    image: '/assets/home-prompt-twins.png',
    desc: 'Create lifelike profiles from the evidence you have already gathered and ask them questions before you commit. Test positioning and messaging, compare reactions across segments and spot gaps early, in one place.',
    link: { label: 'Explore Digital Twins', href: '#' },
  },
  {
    label: 'Bring customer evidence into every build',
    image: '/assets/home-prompt-channels.png',
    desc: 'Stream relevant findings straight into the places where product work happens, so each spec, ticket and pull request carries the reasoning and the real voices sitting behind it.',
    link: { label: 'Explore Channels', href: '#' },
  },
  {
    label: 'Align your whole team with your customers',
    image: '/assets/home-prompt-chat.png',
    desc: 'Ask plain questions and get clear answers backed by linked customer sources. Anyone across the company can explore what people are really saying, without waiting on a written report or digging through files.',
    link: { label: 'Explore Chat', href: '#' },
  },
  {
    label: 'Automate entire workflows',
    image: '/assets/home-prompt-agents.png',
    desc: 'Set up agents that watch for new signals as they arrive, summarize exactly what changed and hand the results to the right people. Routine steps run on their own, so your team can focus on judgment calls.',
    link: { label: 'Explore Agents', href: '#' },
  },
]

const QUOTE =
  '“We used to rebuild context from scratch at the start of every project. Now the evidence is already there, linked and ready to share, and designers and engineers can check decisions against real customer feedback in seconds rather than days.”'

export default function Prompt() {
  return (
    <section className="topics-section prompt-section">
      <div className="container">
        <h2 className="h96">
          Put the customer
          <br />
          in{' '}
          <span className="h2-inline-img prompt-h2-img">
            <img src="/assets/home-prompt-ship-it.png" alt="" />
          </span>{' '}
          <span className="h96-serif">every prompt</span>
        </h2>

        <TopicTabs intro={INTRO} topics={TOPICS} />

        <div className="proof-row">
          <QuoteCard
            href="#"
            quote={QUOTE}
            quoteMaxWidth={680}
            name="Kevonte Mitchell"
            role="Staff UX Researcher, Okta"
            logo={{
              src: '/assets/white-logo(1).svg',
              box: [85, 28],
              img: { top: '-8.04px', left: '-6.07px', width: '97.08px', height: '43.68px' },
            }}
          />
          <StatCard
            href="#"
            number="66%"
            title="Faster shipping"
            desc="Faster from discovery to delivery—without sacrificing quality."
            descMaxWidth={227}
          />
        </div>
      </div>
    </section>
  )
}
