import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import { Spacer, useMetaTitle } from '../../components/legal/primitives.jsx'
import data from '../../data/tools/legal.json'
import '../../styles/legal/legal.css'

// specs/legal-index.md — /legal/. Light theme; nav keeps Log in / Book a demo.
// Ends with the light "The best never guess" final CTA (FinalCta reads theme from chrome) + light footer.
export default function LegalIndex() {
  usePageChrome({ theme: 'light', footer: 'default', navSpacer: false, palette: 'legal' })
  useMetaTitle(data.meta)
  return (
    <>
    <main className="lg-page">
      <Spacer size="96-56" />
      <section className="lgrid lgi">
        <div className="lcol-full">
          <h1 className="lt-h64 l-ink">{data.h1}</h1>
          <Spacer size="200" />
        </div>
        {data.groups.map((g) => (
          <Fragment key={g.heading}>
            <div className="lgi__left"><h2 className="lgi__h2">{g.heading}</h2></div>
            <div className="lgi__right">
              <hr className="lhr" />
              {g.items.map((it) => (
                <Fragment key={it.href}>
                  <div className="lgi__item">
                    <Link to={it.href} className="lgi__link">{it.title}</Link>
                    <span className="lt-m14 l-muted">{it.lastUpdated}</span>
                  </div>
                  <hr className="lhr" />
                </Fragment>
              ))}
            </div>
          </Fragment>
        ))}
      </section>
      <Spacer size="last-160-200" />
    </main>
    <FinalCta />
    </>
  )
}
