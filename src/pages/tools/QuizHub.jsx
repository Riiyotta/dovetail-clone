import { usePageChrome } from '../../chrome.jsx'
import { Btn, Spacer, useTitle } from '../../components/tools/ui.jsx'
import CtaFooter from '../../components/tools/CtaFooter.jsx'
import '../../styles/tools/quiz-hub.css'

// specs/quiz.md §A — /quiz/ hub. The role-quiz flow (/roles/*/quiz/) is built elsewhere.
export default function QuizHub({ data }) {
  // The live "spacer 88 (all tiers)" at the top is the nav spacer.
  usePageChrome({ theme: 'dark', footer: 'default', navSpacer: true })
  useTitle(data.meta.title)
  const h = data.hero
  return (
    <main className="t-page">
      <section className="t-container qh">
        <div className="qh__inner">
          <span className="qh__eyebrow">{h.eyebrow}</span>
          <Spacer d={24} />
          <h1 className="t-h48">{h.h1}</h1>
          <Spacer d={16} />
          <p className="t-p18 t-grey qh__intro">{h.intro}</p>
          <Spacer d={56} md={40} sm={40} />
          <div className="qh__grid">
            {data.cards.map((c) => (
              <div key={c.eyebrow} className="qh-card">
                <span className="qh-card__eyebrow">{c.eyebrow}</span>
                <Spacer d={16} />
                <h2 className="t-h24">{c.title}</h2>
                <Spacer d={8} />
                <p className="t-p16 t-grey qh-card__text">{c.text}</p>
                <Spacer d={32} />
                <Btn href={c.cta.href} variant="glass" className="qh-card__btn">{c.cta.text}</Btn>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* spec text says "96 (≤799 56)", but the measured geometry at 1280 (983 = 927 + 56) shows 56 from ≤1280 */}
      <Spacer d={96} md={56} sm={56} />
      <CtaFooter data={data.ctaFooter} />
    </main>
  )
}
