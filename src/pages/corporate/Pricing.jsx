import { Fragment, useEffect, useRef, useState } from 'react'
import data from '../../data/marketing/pricing.json'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import Spacer from '../../components/marketing/Spacer.jsx'
import { MaskIcon, SmartLink } from '../../components/marketing/content.jsx'
import CompactLogoSlice from '../../components/marketing/CompactLogoSlice.jsx'
import FaqSlice from '../../components/marketing/FaqSlice.jsx'
import { Eyebrow, GradientBanner, findIn, useDocTitle } from './common.jsx'
import TipTerm from './Tooltip.jsx'
import '../../styles/corporate/pricing.css'

// specs/pricing.md — /pricing/. Two plans, comparison table with tooltips, sticky plan header (desktop) /
// plan tabs + bottom CTA bar (≤1280), FAQ with subtitle, then the homepage final CTA (footer variant A).

const CHECK = '/assets/marketing/svg/included-105611.svg'

function PlanButton({ plan, className = '' }) {
  const b = plan.button
  return (
    <SmartLink href={b.href} className={`mk-btn mk-btn--${b.style} ${className}`}>{b.label}</SmartLink>
  )
}

// ---------------- §1 PricingHero ----------------
function PricingHero({ section }) {
  const eyebrow = findIn(section.content, (x) => x.el === 'etfyu4r0')
  const h1 = findIn(section.content, (x) => x.role === 'h1')
  const img = findIn(section.content, (x) => x.role === 'img')
  return (
    <div className="pr-hero">
      <GradientBanner className="pr-hero__fade-top" />
      <GradientBanner className="pr-hero__fade-bottom" />
      <img className="pr-hero__img" src={img.src} alt="" />
      <div className="pr-hero__content">
        <div className="pr-hero__spacer" />
        <div className="mk-container">
          <div className="pr-hero__row">
            <div>
              <Eyebrow>{eyebrow.text}</Eyebrow>
              {/* "Upgrade to scale" is given in pricing.md §1; the data file records only the first line. */}
              <h1 className="co-h80 pr-hero__h1">{h1.text}<br /><span className="text-text-dim">Upgrade to scale</span></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Split a feature sentence around its tooltip terms (in order of appearance).
function FeatureText({ feature }) {
  const { text, tooltipTerms = [], tooltips = {} } = feature
  const out = []
  let rest = text
  let k = 0
  for (const term of tooltipTerms) {
    const i = rest.indexOf(term)
    if (i < 0) continue
    if (i > 0) out.push(<Fragment key={k++}>{rest.slice(0, i)}</Fragment>)
    out.push(<TipTerm key={k++} tip={tooltips[term]} termClassName="pr-term">{term}</TipTerm>)
    rest = rest.slice(i + term.length)
  }
  if (rest) out.push(<Fragment key={k++}>{rest}</Fragment>)
  return out
}

// ---------------- §2 PlanCards ----------------
function PlanCard({ plan, active }) {
  const split = plan.features.length > 5
  const lists = split ? [plan.features.slice(0, 5), plan.features.slice(5)] : [plan.features]
  return (
    <div className={`pr-card${active ? ' pr-card--active' : ''}`}>
      <div className="pr-card__head">
        <img src={plan.icon} alt="" width="64" height="64" />
        <div className="pr-card__titles">
          <div className="pr-card__title-row"><p className="co-h48">{plan.title}</p></div>
          <p className="co-h16">{plan.price}</p>
          <p className="pr-card__desc text-text-dim">{plan.description}</p>
        </div>
      </div>
      <div><PlanButton plan={plan} className="pr-card__btn" /></div>
      <div className="pr-card__features">
        <p className="co-m14 text-text-dim pr-card__label">{plan.featuresLabel}</p>
        <div className={`pr-card__lists${split ? ' pr-card__lists--split' : ''}`}>
          {lists.map((list, li) => (
            <ul key={li} className="pr-card__ul">
              {list.map((f) => (
                <li key={f.text} className="pr-card__li">
                  <div className="pr-card__bullet" aria-hidden="true" />
                  <span className="co-p16 pr-card__item"><FeatureText feature={f} /></span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlanCards({ plans }) {
  return (
    <div className="mk-slicegrid pr-cards">
      {plans.map((p) => (
        <div key={p.id} className={p.id === 'enterprise' ? 'pr-cards__col--8' : 'pr-cards__col--4'}>
          <PlanCard plan={p} active={p.id === 'enterprise'} />
        </div>
      ))}
    </div>
  )
}

// ---------------- §3 ComparisonTable ----------------
const H2_MAX = { centralize: 470, analysis: 507, act: 500, platform: 470 }
const P_MAX = { centralize: 482, analysis: 507, act: 500, platform: 376 }

function Value({ v }) {
  if (v === 'included') return <span role="img" aria-label="Included" className="pr-check-wrap"><MaskIcon src={CHECK} className="pr-check" /></span>
  if (v == null) return <span className="mk-sr-only">Not included</span>
  return v
}

function Row({ row, plan }) {
  return (
    <section className="pr-row">
      <div className="pr-row__label">
        <TipTerm tip={row.tooltip} className="pr-row__tipwrap" termClassName="pr-row__term">{row.feature}</TipTerm>
      </div>
      <div className="pr-row__values">
        {['free', 'enterprise'].map((id) => (
          <div key={id} className={`pr-cell pr-cell--${id}`} data-selected={plan === id ? 'true' : 'false'}>
            <span className="mk-sr-only">{id === 'free' ? 'Free:' : 'Enterprise:'}</span>
            <Value v={row[id]} />
          </div>
        ))}
      </div>
    </section>
  )
}

function Group({ group, plan }) {
  return (
    <div className="pr-group">
      <div className="pr-sp120" />
      <h2 className="co-h56" style={{ maxWidth: H2_MAX[group.id] }}>{group.heading}</h2>
      <p className="co-p20 pr-group__sub text-text-dim" style={{ maxWidth: P_MAX[group.id] }}>{group.subheading}</p>
      <div className="pr-sp32" />
      <hr className="pr-hr" />
      {group.rows?.map((r) => <Row key={r.feature} row={r} plan={plan} />)}
      {group.sections?.map((s) => (
        <Fragment key={s.sectionTitle}>
          <div className="pr-subhead">
            <h3 className="co-h24 pr-subhead__title">{s.sectionTitle}</h3>
            {s.badges && (
              <div className="pr-badges">
                {s.badges.map((b) => <img key={b} src={b} alt="" />)}
              </div>
            )}
          </div>
          <hr className="pr-hr" />
          {s.rows.map((r) => <Row key={r.feature} row={r} plan={plan} />)}
        </Fragment>
      ))}
    </div>
  )
}

function StickyHeader({ plans, plan, setPlan, shown }) {
  const sel = plans.find((p) => p.id === plan)
  return (
    <>
      <div className="pr-sticky" data-shown={shown ? 'true' : undefined}>
        <div className="mk-container">
          <section className="pr-sticky__desk">
            <div className="pr-sticky__col" />
            {plans.map((p) => (
              <div key={p.id} className="pr-sticky__col">
                <div className="pr-sticky__titles">
                  <p className="co-h18">{p.title}</p>
                  <div className="pr-sticky__price">
                    {p.stickyNav.text && <p className="co-h18">{p.stickyNav.text}</p>}
                    <p className="co-m14">{p.stickyNav.monoText}</p>
                  </div>
                </div>
                <PlanButton plan={p} className="pr-sticky__btn" />
              </div>
            ))}
          </section>
          <div className="pr-sticky__md">
            <div className="pr-tabs" role="tablist">
              {plans.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={plan === p.id}
                  className="pr-tabs__btn"
                  data-active={plan === p.id ? 'true' : undefined}
                  onClick={() => setPlan(p.id)}
                >
                  {p.title}
                </button>
              ))}
            </div>
            <hr className="pr-hr" />
            <div className="pr-sticky__mdprice"><p className="co-h24">{sel.price}</p></div>
          </div>
        </div>
      </div>
      <div className="pr-bottombar" data-shown={shown ? 'true' : undefined}>
        <PlanButton plan={sel} className="pr-bottombar__btn" />
      </div>
    </>
  )
}

function ComparisonTable({ table, plans }) {
  const ref = useRef(null)
  const [plan, setPlan] = useState('enterprise')
  const [shown, setShown] = useState(false)

  // Visibility window = ScrollTrigger {start:"top top+=160", end:"bottom top"} on the table wrapper.
  // State only; the 0.5s `top` / `bottom` tween is left to the animation pass.
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const r = ref.current?.getBoundingClientRect()
      if (r) setShown(r.top <= 160 && r.bottom > 0)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check) }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pr-table" ref={ref}>
      <StickyHeader plans={plans} plan={plan} setPlan={setPlan} shown={shown} />
      <div className="mk-container">
        {table.map((g) => <div key={g.id} id={g.id} className="pr-anchor"><Group group={g} plan={plan} /></div>)}
      </div>
    </div>
  )
}

export default function Pricing() {
  usePageChrome({ footer: 'default', navSpacer: false })
  useDocTitle(data.title)

  return (
    <>
    <main className="pr-page">
      {data.sections.map((s, i) => {
        switch (s.slice) {
          case 'PricingHero': return <PricingHero key={i} section={s} />
          case 'Spacer': return <Spacer key={i} data={s} />
          case 'PlanCards': return <PlanCards key={i} plans={data.plans} />
          case 'CompactLogo': return <CompactLogoSlice key={i} data={s} />
          case 'ComparisonTable': return <ComparisonTable key={i} table={data.comparisonTable} plans={data.plans} />
          case 'FAQ': return <FaqSlice key={i} data={s} />
          default: return null // GradientBanner entries are rendered inside PricingHero
        }
      })}
    </main>
    <FinalCta />
    </>
  )
}
