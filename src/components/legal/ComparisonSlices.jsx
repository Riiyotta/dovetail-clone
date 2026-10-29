import { Fragment } from 'react'
import { CtaRow, MaskIcon, Spacer } from './primitives.jsx'
import { txt } from './placeholder.js'
import { phLines } from '../marketing/placeholder.js'
import '../../styles/legal/comparison.css'

// specs/comparison.md — one component per slice `type` in src/data/tools/dovetail-vs-*.json.

// The live hero/intro "Start a 60-day free trial" links point at #trial-cta with target=_blank.
// Same-page anchor is kept; the new-tab behaviour is dropped for in-page anchors (see handoff).
const anchorSafe = (ctas = []) => ctas.map((c) => (c.href?.startsWith('#') ? { ...c, newTab: false } : c))

export function Hero({ data, seed }) {
  return (
    <section className="lgrid">
      <div className="cmp-hero lcol-full">
        <p className="lt-m14 l-dim cmp-hero__eyebrow">{data.eyebrow}</p>
        <h1 className="lt-h56 cmp-hero__h1">{data.h1}</h1>
        <p className="lt-p20 cmp-hero__intro">{txt(data.intro, `${seed}hero`)}</p>
        <CtaRow ctas={anchorSafe(data.ctas)} center />
        {data.note && (
          <div className="cmp-hero__note">
            <p className="cmp-hero__note-title">{data.note.title}</p>
            <p className="cmp-hero__note-sub">{data.note.subtitle}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export function HeroImage({ data }) {
  return <img className="cmp-hero-img" src={data.src} alt={data.alt || ''} />
}

function SplitLeft({ h2, paragraphs = [], ctas, seed, children }) {
  return (
    <div className="cmp-split__left">
      <h2 className="lt-h40 cmp-split__h2">{h2}</h2>
      {paragraphs.map((p, i) => (
        <Fragment key={i}>
          <Spacer size="32" />
          <p className="lt-p16 l-dim cmp-split__p">{txt(p, `${seed}p${i}`)}</p>
        </Fragment>
      ))}
      {children}
      <CtaRow ctas={anchorSafe(ctas)} />
    </div>
  )
}

export function Intro({ data, seed }) {
  return (
    <section className="lgrid cmp-split">
      <SplitLeft h2={data.h2} paragraphs={data.paragraphs} ctas={data.ctas} seed={`${seed}intro`} />
      <div className="cmp-split__right">
        <img src={data.image.src} alt={data.image.alt || ''} />
      </div>
    </section>
  )
}

export function TeiCard({ data, seed }) {
  return (
    <section className="lgrid">
      <div className="lcol-full">
        <div className="cmp-tei">
          <div className="cmp-tei__inner">
            <div className="cmp-tei__text">
              <p className="lt-m14 l-dim cmp-tei__eyebrow">{data.eyebrow}</p>
              <p className="cmp-tei__body">{txt(data.text, `${seed}tei`)}</p>
              <a className="cmp-tei__link" href={data.link.href}>{data.link.text}</a>
            </div>
            <div className="cmp-tei__img">
              <img src={data.image.src} alt={data.image.alt || ''} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ChooseGrid({ data, seed }) {
  return (
    <section className="lgrid">
      <div className="lcol-full">
        <h2 className="lt-h40 cmp-choose__h2">{data.h2}</h2>
        <p className="lt-p16 l-dim cmp-choose__p">{txt(data.p, `${seed}choose`)}</p>
        <CtaRow ctas={anchorSafe(data.ctas)} />
        <Spacer size="64-56" />
        <div className="cmp-choose__grid">
          {(data.cards || []).map((c, i) => (
            <div className="cmp-choose__card" key={i}>
              <div className="cmp-choose__frame"><img src={c.image.src} alt={c.image.alt || ''} /></div>
              <div className="cmp-choose__text">
                <p className="lt-h20">{c.title}</p>
                <p className="lt-p16 l-dim" {...phLines(c.text)}>{txt(c.text, `${seed}card${i}`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CompareIntro({ data, seed }) {
  return (
    <section className="lgrid">
      <div className="lcol-full">
        <h2 className="lt-h40 cmp-cintro__h2">{data.h2}</h2>
        <p className="lt-p16 l-dim cmp-cintro__p">{txt(data.p, `${seed}cintro`)}</p>
      </div>
    </section>
  )
}

// div-based table; Dovetail column (2nd child) carries the rgba(250,250,250,.06) band. Ticks only.
export function ComparisonTable({ data, seed }) {
  const cols = data.columns || []
  const tick = data.tickIcon || '/assets/tools/svg/icon-check-24.svg'
  return (
    <section className="lgrid">
      <div className="lcol-full cmp-table" role="table" aria-label={cols.filter(Boolean).join(' vs ')}>
        <div className="cmp-table__row cmp-table__row--head" role="row">
          {cols.map((c, i) => (
            <div className="cmp-table__hcell" role={c ? 'columnheader' : 'cell'} key={i}>{c}</div>
          ))}
        </div>
        {(data.rows || []).map((row, r) => (
          <div className="cmp-table__row" role="row" key={r}>
            <div className="cmp-table__label" role="rowheader">{txt(row.label, `${seed}row${r}`)}</div>
            {row.cells.map((cell, c) => (
              <div className="cmp-table__cell" role="cell" key={c}>
                {cell.type === 'tick'
                  ? <><MaskIcon src={tick} size={20} /><span className="lsr-only">Yes</span></>
                  : <span className="cmp-table__val">{txt(cell.text ?? cell, `${seed}cell${r}-${c}`)}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export function CustomerStory({ data, seed }) {
  return (
    <section className="lgrid cmp-split">
      <div className="cmp-split__left">
        <h2 className="lt-h40 cmp-split__h2">{data.h2}</h2>
        <ul className="cmp-story__stats">
          {(data.stats || []).map((s, i) => <li key={i} className="lt-h20">{s}</li>)}
        </ul>
        <p className="lt-p16 cmp-story__quote">{txt(data.quote, `${seed}story`, 'quote')}</p>
        <p className="lt-p16 cmp-story__attr">
          {(data.attributionLines || []).map((l, i) => <Fragment key={i}>{i > 0 && <br />}{l}</Fragment>)}
        </p>
        <CtaRow ctas={anchorSafe(data.ctas)} />
      </div>
      <div className="cmp-split__right">
        <img src={data.image.src} alt={data.image.alt || ''} />
      </div>
    </section>
  )
}

export function Migrate({ data, seed }) {
  return (
    <section className="lgrid">
      <div className="cmp-migrate__head">
        <h2 className="lt-h40">{data.h2}</h2>
        <Spacer size="32" />
        <p className="lt-p16 l-dim">{txt(data.p, `${seed}migrate`)}</p>
        <CtaRow ctas={anchorSafe(data.ctas)} />
      </div>
      <div className="lcol-full">
        <Spacer size="64-56" />
        <div className="cmp-migrate__grid">
          {(data.features || []).map((f, i) => (
            <div className="cmp-migrate__feat" key={i}>
              <MaskIcon src={f.icon} size={24} className="l-white" />
              <p className="lt-h20">{f.title}</p>
              <p className="lt-p16 l-dim">{txt(f.text, `${seed}feat${i}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TrialCta({ data, seed }) {
  return (
    <section id={data.id || 'trial-cta'} className="cmp-trial" style={{ '--trial-bg': `url("${data.background}")` }}>
      <div className="cmp-trial__fade cmp-trial__fade--t" aria-hidden="true" />
      <div className="cmp-trial__fade cmp-trial__fade--b" aria-hidden="true" />
      <div className="cmp-trial__fade cmp-trial__fade--l" aria-hidden="true" />
      <div className="cmp-trial__fade cmp-trial__fade--r" aria-hidden="true" />
      <div className="lgrid cmp-trial__grid">
        <div className="cmp-trial__col">
          <h2 className="cmp-trial__h2">{data.h2}</h2>
          <p className="lt-p20 cmp-trial__p" {...phLines(data.p)}>{txt(data.p, `${seed}trial`)}</p>
          <CtaRow ctas={data.ctas} center className="cmp-trial__ctas" />
          <ul className="cmp-trial__list">
            {(data.checklist || []).map((t, i) => (
              <li key={i}><MaskIcon src={data.checkIcon} size={24} className="cmp-trial__tick" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
