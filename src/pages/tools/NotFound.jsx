import FinalCta from '../../components/FinalCta.jsx'
import { usePageChrome } from '../../chrome.jsx'
import { Btn, useTitle } from '../../components/tools/ui.jsx'
import { txt } from '../../components/tools/placeholder.js'
import data from '../../data/tools/404.json'
import '../../styles/tools/not-found.css'

// specs/not-found.md. The dev server can't send a real HTTP 404; this renders with 200.
export default function NotFound() {
  usePageChrome({ theme: 'dark', footer: 'default', navSpacer: false })
  useTitle(data.meta.title)
  return (
    <>
    <main className="t-page">
      <div className="nf">
        <img className="nf__bg" src={data.background.src} alt={data.background.alt} height="1270" />
        <section className="nf__content">
          <h1 className="nf__h1">{data.h1}</h1>
          <p className="nf__sub">{data.subtitle}</p>
          <p className="nf__body">{txt(data.body, 4)}</p>
          <div className="nf__ctas">
            {data.ctas.map((c, i) => (
              <Btn key={c.text} href={c.href} newTab={c.newTab} variant={i === 0 ? 'white' : 'glass'}>{c.text}</Btn>
            ))}
          </div>
        </section>
      </div>
    </main>
    {/* Shared final CTA sits after <main> so the last 200px spacer is main:last-child (160 at ≥1281). */}
    <FinalCta />
    </>
  )
}
