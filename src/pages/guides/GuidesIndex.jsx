import { Link } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import { useContent } from './data.js'
import { padTo } from './placeholder.js'
import { Spacer } from './components.jsx'
import '../../styles/guides/primitives.css'
import '../../styles/guides/guides-index.css'

// specs/guides-index.md — dark theme, 88px header spacer, final CTA + footer.
export default function GuidesIndex() {
  usePageChrome({ theme: 'dark', footer: 'default', navSpacer: true })
  const d = useContent('guides')
  if (!d) return <main className="gi" />
  const [contact, trial] = d.ctas
  return (
    <main className="gi">
      <section className="container">
        <h1 className="gi__h1">{d.h1}</h1>
        <p className="gi__intro">{padTo(d.intro.firstSentence, d.intro.chars, 'guides-intro')}</p>
        <div className="cbtn-row gi__ctas">
          <Link to={contact.href} className="cbtn cbtn--white">{contact.text}</Link>
          <a href={trial.href} target={trial.target} rel="noreferrer" className="cbtn cbtn--glass">{trial.text}</a>
        </div>
      </section>

      <Spacer className="gi__sp-96" />

      <div className="container">
        <section className="gi-tei">
          <div className="gi-tei__text">
            <div className="gi-tei__inner">
              <h2 className="gi-tei__h">{d.teiCard.title}</h2>
              <p className="gi-tei__p">{padTo(d.teiCard.bodyFirstSentence, d.teiCard.bodyChars, 'guides-tei')}</p>
            </div>
          </div>
          <div className="gi-tei__img">
            <img src={d.teiCard.image} alt="" style={{ objectFit: 'contain', width: '100%', height: 'auto' }} />
          </div>
        </section>
      </div>

      <Spacer className="gi__sp-200" />

      <section className="cgrid cgrid--rg32-sm64">
        <div className="c-span-4">
          <h2 className="gi__topics-h">{d.topicsHeading}</h2>
          <p className="gi__topics-p">{padTo('', d.topicsIntroChars, 'guides-topics')}</p>
        </div>
        <div className="gi-topics">
          {d.topics.map((t) => (
            <div key={t.path} className="gi-topic">
              <Link to={t.path} className="gi-topic__link">
                <h3 className="gi-topic__h">{t.title}</h3>
              </Link>
              <p className="gi-topic__p">{padTo(t.description, t.descriptionChars, t.path)}</p>
            </div>
          ))}
        </div>
      </section>

      <Spacer className="gi__sp-end" />
      <FinalCta />
    </main>
  )
}
