import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import { MaskIcon, Spacer, useLazyJson, useMetaTitle } from '../../components/legal/primitives.jsx'
import Prose, { tocEntries } from '../../components/legal/Prose.jsx'
import '../../styles/legal/legal.css'

// specs/legal-doc.md — /legal/* (14) and /privacy/* (5).
// Light theme. Ends with the light final CTA (<FinalCta /> after <main>) + light footer. The live
// nav renders no Log in / Book a demo group on these pages (data.navRightButtons === false) — chrome gap, see handoff.

const loaders = import.meta.glob(['../../data/tools/legal--*.json', '../../data/tools/privacy--*.json'], { import: 'default' })

export function Breadcrumb({ items }) {
  return (
    <nav className="lcrumb" aria-label="Breadcrumb">
      {items.map((c, i) => {
        const last = i === items.length - 1
        return (
          <span key={i} className="lcrumb__part">
            {i > 0 && <MaskIcon src="/assets/tools/svg/breadcrumb-slash-24.svg" size={24} className="lcrumb__slash" />}
            {i === 0
              ? <Link to={c.href} className="lt-m14 lcrumb__home">{c.text}</Link>
              : c.href
                ? <Link to={c.href} className={last ? 'lcrumb__current' : 'lcrumb__mid'}>{c.text}</Link>
                : <button type="button" className="lcrumb__current lcrumb__current--btn">{c.text}</button>}
          </span>
        )
      })}
    </nav>
  )
}

function SideNav({ nav }) {
  const [open, setOpen] = useState(() => ({ [nav.expandedGroup]: true }))
  const toggle = (g) => setOpen((o) => ({ ...o, [g]: !o[g] }))
  return (
    <aside className="ldoc__nav">
      <div className="ldoc__groups">
        {nav.groups.map((g) => (
          <div key={g.group}>
            <div className="ldoc__ghead">
              <button type="button" className="ldoc__chev" aria-expanded={!!open[g.group]} aria-label={`Toggle ${g.group}`} onClick={() => toggle(g.group)}>
                <span
                  className="licon"
                  style={{ '--icon': 'url("/assets/tools/svg/legal-nav-chevron-right.svg")', width: 24, height: 24, transform: `rotate(${open[g.group] ? 90 : 0}deg)` }}
                />
              </button>
              <button type="button" className="ldoc__glabel" onClick={() => toggle(g.group)}>{g.group}</button>
            </div>
            {open[g.group] && (
              <>
                <ul className="ldoc__links">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        to={l.href}
                        className={`ldoc__link${l.href === nav.current ? ' is-current' : ''}`}
                        aria-current={l.href === nav.current ? 'page' : undefined}
                      >
                        {l.text}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Spacer size="8" />
              </>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}

export function scrollToHeading(id, smooth) {
  const el = id && document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
}

export default function LegalDoc({ slug }) {
  usePageChrome({ theme: 'light', footer: 'default', navSpacer: true, palette: 'legal', navButtons: false })
  const data = useLazyJson(loaders[`../../data/tools/${slug}.json`])
  useMetaTitle(data?.meta)
  if (!data) return <main className="lg-page" />
  const toc = tocEntries(data)
  return (
    <>
    <main className="lg-page">
      <div className="ltitle">
        <div className="lcont">
          <Breadcrumb items={data.breadcrumb} />
          <Spacer size="32" />
          <h1 className="lt-h72 ltitle__h1">{data.h1}</h1>
        </div>
      </div>
      <div className="ldoc">
        <SideNav key={data.url} nav={data.sideNav} />
        <div className="ldoc__center">
          <div className="ldoc__inner">
            <Prose blocks={data.body} seed={slug} kind="legal" />
            <Spacer size="64" />
            <hr className="lhr" />
            <div className="ldoc__updated lt-m14 l-muted">
              <span>{data.lastUpdated?.label}</span>
              <span>{data.lastUpdated?.date}</span>
            </div>
            <hr className="lhr" />
          </div>
        </div>
        <div className="ldoc__toc">
          {toc.length > 0 && (
            <ul className="ldoc__toclist">
              {toc.map((t, i) => (
                <li key={i}>
                  {/* Scroll behaviour on the original wasn't measured (legal-doc §2c); instant jump used. */}
                  <button type="button" className="ldoc__tocbtn" onClick={() => scrollToHeading(t.id, false)}>{t.text}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Spacer size="160-96" />
    </main>
    <FinalCta />
    </>
  )
}
