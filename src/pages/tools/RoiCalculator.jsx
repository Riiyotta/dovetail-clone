import { useState } from 'react'
import { usePageChrome } from '../../chrome.jsx'
import { CtaButtons, Spacer, useTitle } from '../../components/tools/ui.jsx'
import CtaFooter from '../../components/tools/CtaFooter.jsx'
import '../../styles/tools/roi-calculator.css'

// specs/roi-calculator.md. Formula, ranges and formatting are exact; the PDF download is a local no-op.

const currency = (v) => v.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })
const hours = (v) => `${v.toLocaleString('en-AU', { maximumFractionDigits: 0 })} hrs`
const CHEVRON = { '--icon': 'url(/assets/tools/svg/icon-chevron-down-plain-24.svg)' }

function compute(s) {
  const hourlyRate = s.avgAnnualSalary / 52 / 40
  const annualHours = s.teamSize * s.hoursPerWeek * 52
  const totalAnnualTimeSavingsHours = annualHours * s.savingsRate
  const totalValue = totalAnnualTimeSavingsHours * hourlyRate
  const rdImpactValue = totalValue * s.rdPaybackRatio
  const totalImpactValue = totalValue + rdImpactValue
  const netAnnualRoi = totalImpactValue - s.dovetailAnnualCost
  return {
    totalAnnualTimeSavingsHours,
    totalValue,
    rdImpactValue,
    totalImpactValue,
    netAnnualRoi,
    dovetailAnnualCost: s.dovetailAnnualCost,
  }
}

function displayInput(input, v) {
  if (input.display === 'currency') return currency(v)
  return input.display.replace('{n}', String(v))
}

function Slider({ input, value, onChange }) {
  const id = `roi-${input.id}`
  const shown = displayInput(input, value)
  return (
    <div className="roi-slider">
      <div className="roi-slider__head">
        <span>
          <p id={`${id}-label`} className="t-h20">{input.label}</p>
          <p id={`${id}-desc`} className="t-p14 t-grey roi-slider__desc">{input.description}</p>
        </span>
        <div className="roi-slider__value">
          <span className="t-h20">{shown}</span>
          <span className="t-m14 t-white">{input.unit}</span>
        </div>
      </div>
      <input
        id={id}
        className="roi-range"
        type="range"
        min={input.min}
        max={input.max}
        step={input.step}
        value={value}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-desc`}
        aria-valuetext={`${shown} ${input.unit}`}
        onChange={(e) => onChange(input.id, e.target.value)}
      />
    </div>
  )
}

function ResultCard({ out, r }) {
  const fmt = out.format === 'hours' ? hours : currency
  const value = out.highlight ? Math.max(0, r.netAnnualRoi) : r[out.value]
  return (
    <div className={`roi-card${out.highlight ? ' roi-card--hl' : ''}`}>
      <p className="t-m12 roi-card__label">{out.label}</p>
      <div className="roi-card__row">
        <p className="t-h32 roi-card__value">{fmt(value)}</p>
        {out.aside && (
          <div className="roi-card__aside">
            {out.aside.map((a) => (
              <p key={a.label} className="t-p14 t-grey roi-card__aside-p">
                {a.label}<span className="t-white">{currency(r[a.value])}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Download({ d }) {
  const [company, setCompany] = useState('')
  const disabled = company.trim() === ''
  return (
    <section className="t-grid">
      <div className="roi-dl">
        <div className="roi-dl__left">
          <h2 className="t-h20">{d.h2}</h2>
          <p className="t-p16 t-grey roi-dl__p">{d.p}</p>
          <div className="roi-dl__group">
            <label className="t-p14 t-white" htmlFor={d.field.id}>{d.field.label}</label>
            <input
              id={d.field.id}
              name={d.field.name}
              className="roi-input roi-input--company"
              type="text"
              required={d.field.required}
              autoComplete={d.field.autocomplete}
              placeholder={d.field.placeholder}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            {/* Live site POSTs to a remote API and downloads a PDF; intentionally a no-op in this clone. */}
            <button type="button" className="t-btn t-btn--white" disabled={disabled} onClick={() => {}}>
              {d.button.label}
            </button>
          </div>
        </div>
        <div className="roi-dl__right">
          <img className="roi-dl__img" src={d.image.src} alt={d.image.alt} />
        </div>
      </div>
    </section>
  )
}

export default function RoiCalculator({ data }) {
  usePageChrome({ theme: 'dark', footer: 'default', navSpacer: false })
  useTitle(data.meta.title)
  const [state, setState] = useState(() => {
    const s = {}
    for (const i of data.inputs) s[i.id] = i.default
    for (const i of data.advanced.inputs) s[i.id] = i.default
    return s
  })
  const [advOpen, setAdvOpen] = useState(data.advanced.defaultOpen)
  const set = (key, raw) => {
    const n = Number(raw)
    setState((prev) => (Number.isFinite(n) ? { ...prev, [key]: n } : prev))
  }
  const r = compute(state)
  const note = data.advanced.noteTemplate
    .replace('{round(savingsRate*100)}', String(Math.round(state.savingsRate * 100)))
    .replace('{rdPaybackRatio}', String(state.rdPaybackRatio))
  const h = data.hero

  return (
    <main className="t-page">
      <Spacer d={200} md={96} sm={96} />
      <section className="t-container">
        <p className="t-eyebrow">{h.eyebrow}</p>
        <h1 className="t-h64 roi-h1">{h.h1}</h1>
        <p className="t-p20 roi-intro">{h.intro}</p>
        <CtaButtons ctas={h.ctas} className="roi-hero-ctas" />
        <Spacer d={96} />
      </section>

      <section className="t-grid">
        <div className="roi-left">
          {data.inputs.map((i) => <Slider key={i.id} input={i} value={state[i.id]} onChange={set} />)}
          <div className="roi-adv">
            <button type="button" className="t-p14 roi-adv__toggle" aria-expanded={advOpen} onClick={() => setAdvOpen((o) => !o)}>
              {advOpen ? data.advanced.toggleOpen : `${data.advanced.toggleClosed} `}
              <span className="t-icon roi-adv__chev" style={CHEVRON} aria-hidden="true" />
            </button>
            {advOpen && (
              <>
                <div className="roi-adv__row">
                  {data.advanced.inputs.map((i) => (
                    <label key={i.id} className="t-p14 t-white roi-adv__label">
                      {i.label}
                      <input
                        className="roi-input"
                        type="number"
                        max={i.max}
                        step={i.step}
                        value={state[i.id]}
                        onChange={(e) => set(i.id, e.target.value)}
                      />
                    </label>
                  ))}
                </div>
                <p className="t-p14 t-grey roi-adv__note">{note}</p>
              </>
            )}
          </div>
        </div>
        <div className="roi-right">
          {data.outputs.map((o) => <ResultCard key={o.label} out={o} r={r} />)}
        </div>
      </section>

      <Spacer d={64} />
      <Download d={data.download} />
      <Spacer d={88} />
      <CtaFooter data={data.ctaFooter} />
    </main>
  )
}
