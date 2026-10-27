import data from '../../data/marketing/deploy.json'
import { usePageChrome } from '../../chrome.jsx'
import Spacer from '../../components/marketing/Spacer.jsx'
import CompactLogoSlice from '../../components/marketing/CompactLogoSlice.jsx'
import FaqSlice from '../../components/marketing/FaqSlice.jsx'
import { textOf } from '../../components/marketing/content.jsx'
import { BaseHeading, Eyebrow, SecurityGrid, allIn, findIn, useDocTitle } from './common.jsx'
import DeployForm from './DeployForm.jsx'
import '../../styles/corporate/enterprise.css'
import '../../styles/corporate/deploy.css'

// specs/deploy.md — /deploy/. Ends with its own CtaFooterSlice, then footer variant C (plain link grid).

// "Book a scoping call" buttons smooth-scroll to the form with a 120px offset (deploy.md §1).
function scrollToForm() {
  const el = document.getElementById('book-a-call')
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' })
}

function ScopingButton({ label }) {
  return (
    <div className="mk-cta-row co-heading__ctas">
      <button type="button" className="mk-btn mk-btn--primary" onClick={scrollToForm}>{label}</button>
    </div>
  )
}

const eyebrowOf = (c) => findIn(c, (x) => x.el?.endsWith('etfyu4r0'))?.text

function DeployHero({ section }) {
  const c = section.content
  const img = findIn(c, (x) => x.role === 'img')
  return (
    <div className="mk-slicegrid">
      <div className="en-hero__text">
        <BaseHeading as="h1" size="h80" eyebrow={eyebrowOf(c)} heading={findIn(c, (x) => x.role === 'h1').text}
          maxW={774} sub={findIn(c, (x) => x.placeholder)} subSeed={21} subMaxW={508}>
          <ScopingButton label={findIn(c, (x) => x.role === 'button').text} />
        </BaseHeading>
      </div>
      <div className="en-hero__img"><img src={img.src} alt={img.alt} width="2528" height="1810" /></div>
    </div>
  )
}

function Intro({ section }) {
  return (
    <div className="mk-container">
      <p className="dp-intro">{textOf(section.content[0], 22)}</p>
    </div>
  )
}

function ProblemsHeading({ section }) {
  const c = section.content
  return (
    <div className="mk-container">
      <div className="dp-problems-head">
        <BaseHeading eyebrow={eyebrowOf(c)} heading={findIn(c, (x) => x.role === 'h2').text} maxW={780}
          sub={findIn(c, (x) => x.placeholder)} subSeed={23} subMaxW={620} subFlush />
      </div>
    </div>
  )
}

function Problem({ section, n }) {
  const c = section.content
  const labels = allIn(c, (x) => x.el === 'e13mcwun9')
  const img = findIn(c, (x) => x.role === 'img')
  return (
    <div className={`mk-slicegrid dp-problem${n % 2 ? ' dp-problem--odd' : ''}`}>
      <div className="dp-problem__text">
        <div className="dp-problem__col">
          <div className="dp-problem__head">
            <Eyebrow>{eyebrowOf(c)}</Eyebrow>
            <h3 className="dp-problem__h3">{findIn(c, (x) => x.role === 'h3').text}</h3>
          </div>
          {labels.map((l) => (
            <div key={l.text} className="dp-problem__block">
              <p className="dp-problem__label">{l.text}</p>
              <p className="co-p16 text-text-dim">{textOf(c[c.indexOf(l) + 1], n * 10 + c.indexOf(l))}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="dp-problem__img"><img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" /></div>
    </div>
  )
}

function WhyHeading({ section }) {
  const c = section.content
  return (
    <>
      <div className="mk-slicegrid">
        <div className="dp-why__head">
          <BaseHeading eyebrow={eyebrowOf(c)} heading={findIn(c, (x) => x.role === 'h2').text} />
        </div>
      </div>
      <div className="en-sp-inner" />
    </>
  )
}

function WhyGrid({ section }) {
  const c = section.content
  const items = []
  c.forEach((x, i) => { if (x.role === 'svg') items.push({ svg: x.src, h3: c[i + 1].text, p: c[i + 2] }) })
  return (
    <div className="mk-slicegrid">
      {items.map((it, i) => (
        <div key={it.h3} className="dp-why__item">
          <img className="dp-why__icon" src={it.svg} alt="" width="64" height="64" />
          <h3 className="dp-why__h3">{it.h3}</h3>
          <p className="co-p16 text-text-dim dp-why__p">{textOf(it.p, 30 + i)}</p>
        </div>
      ))}
    </div>
  )
}

function Scoping({ section }) {
  const c = section.content
  return (
    <div className="mk-slicegrid" id="book-a-call">
      <div className="dp-scope__left">
        <div className="dp-scope__sticky">
          <BaseHeading eyebrow={eyebrowOf(c)} heading={findIn(c, (x) => x.role === 'h2').text} maxW={520}
            sub={findIn(c, (x) => x.placeholder)} subSeed={24} subMaxW={480} subFlush />
        </div>
      </div>
      <div className="dp-scope__right"><DeployForm form={data.form} /></div>
    </div>
  )
}

// CtaFooterSlice: SliceGrid > Column span 9 > Spacer 200 > H64 (max 712) + button > Spacer 120.
function CtaBand({ section }) {
  const c = section.content
  return (
    <div className="mk-slicegrid">
      <div className="dp-cta">
        <div className="dp-cta__sp-top" />
        <BaseHeading heading={findIn(c, (x) => x.role === 'h2').text} maxW={712}>
          <ScopingButton label={findIn(c, (x) => x.role === 'button').text} />
        </BaseHeading>
        <div className="dp-cta__sp-bottom" />
      </div>
    </div>
  )
}

export default function Deploy() {
  usePageChrome({ footer: 'default', navSpacer: false })
  useDocTitle(data.title)
  let heroCount = 0
  let headingCount = 0
  let problem = 0
  return (
    <main className="dp-page">
      {data.sections.map((s, i) => {
        switch (s.slice) {
          case 'Spacer': return <Spacer key={i} data={s} />
          case 'DeployHero': return heroCount++ === 0 ? <DeployHero key={i} section={s} /> : <Scoping key={i} section={s} />
          case 'CompactLogo': return <CompactLogoSlice key={i} data={s} />
          case 'DeployIntro': return <Intro key={i} section={s} />
          case 'DeployProblemsHeading': return <ProblemsHeading key={i} section={s} />
          case 'DeployProblemSection': return <Problem key={i} section={s} n={problem++} />
          case 'BaseHeading': return headingCount++ === 0 ? <WhyHeading key={i} section={s} /> : <CtaBand key={i} section={s} />
          case 'WhyDeployFeatureGrid': return <WhyGrid key={i} section={s} />
          case 'SecurityAndCompliance': return <SecurityGrid key={i} section={s} />
          case 'FAQ': return <FaqSlice key={i} data={s} />
          default: return null
        }
      })}
    </main>
  )
}
