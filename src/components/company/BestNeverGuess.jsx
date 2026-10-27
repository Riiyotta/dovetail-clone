import Button from './Button.jsx'
import Carousel from './Carousel.jsx'
import Spacer from './Spacer.jsx'
import StoryCard from './StoryCard.jsx'
import '../../styles/company/base.css'
import '../../styles/company/components.css'

// BestNeverGuess — "The best never guess" CTA + related stories (company-shared.md S7). Customer story pages.
// Props:
//   data     the story file's `bestNeverGuess` { heading, rotatorLogos: string[8], body, buttons: [{label, href, style}] }
//   related  story-card objects (first 3 are shown; StoryCard shape)
// ≥800: 12-col grid of 3 cards (span 4; ≤1280 span 6). ≤799: S8 Carousel with the same cards.
// Ends with the S0→96 spacer.
// MOTION NOT IMPLEMENTED (animation pass): rotator `rotator-8 16s ease-in-out infinite` over the 16-slot column
//   (@keyframes in company-shared.md S7). The column is rendered static at translateY(0).
export default function BestNeverGuess({ data, related = [] }) {
  const heading = data?.heading || 'The best never guess'
  const [before, after] = splitAfterBest(heading)
  const logos = data?.rotatorLogos || []
  const cards = related.slice(0, 3)
  return (
    <>
    <section className="co-bng">
      <div className="co-container co-bng__inner">
        <div className="co-bng__intro">
          <h2 className="co-bng__h2 co-h64">
            <span>{before}</span>
            <span className="co-rotator" aria-hidden="true">
              <span className="co-rotator__window">
                <span className="co-rotator__list" data-animation="rotator-8">
                  {[...logos, ...logos].map((src, i) => (
                    <span key={i} className="co-rotator__slot"><img src={src} alt="" /></span>
                  ))}
                </span>
              </span>
            </span>
            <span>{after}</span>
          </h2>
          {data?.body && <p className="co-bng__p co-p20">{data.body}</p>}
          <div className="co-btn-row">
            {(data?.buttons || []).map((b) => (
              <Button key={b.label} href={b.href} variant={b.style === 'secondary' ? 'secondary' : 'primary'}>{b.label}</Button>
            ))}
          </div>
        </div>
        {cards.length > 0 && (
          <div className="co-bng__related">
            {cards.map((c) => <StoryCard key={c.href} story={c} />)}
          </div>
        )}
      </div>
      {cards.length > 0 && (
        <div className="co-bng__mobile">
          <Carousel>
            <div className="co-bng__track">
              {cards.map((c) => <StoryCard key={c.href} story={c} />)}
            </div>
          </Carousel>
        </div>
      )}
    </section>
    <Spacer size="s0-96" />
    </>
  )
}

function splitAfterBest(h) {
  const i = h.indexOf('best')
  if (i < 0) return [h, '']
  return [h.slice(0, i + 4), h.slice(i + 4).trim()]
}
