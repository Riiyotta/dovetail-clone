import { useState } from 'react'
import FinalCta from '../../components/FinalCta.jsx'
import { usePageChrome } from '../../chrome.jsx'
import { Spacer, useTitle } from '../../components/tools/ui.jsx'
import { txt } from '../../components/tools/placeholder.js'
import LogoMarquee from '../../components/tools/LogoMarquee.jsx'
import Testimonial from '../../components/tools/Testimonial.jsx'
import '../../styles/tools/demo-form.css'

// specs/demo-form.md — /contact-sales/, /request-a-demo/. Static form: validates client-side, never submits.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form, fields, messages) {
  const fd = new FormData(form)
  const errors = {}
  for (const f of fields) {
    const v = String(fd.get(f.name) ?? '').trim()
    if (f.required && !v) errors[f.name] = messages.required
    else if (f.type === 'email' && v && !EMAIL_RE.test(v)) errors[f.name] = messages.email
  }
  return errors
}

function Control({ f, error }) {
  const common = {
    id: f.id,
    name: f.name,
    className: `df-control${f.control === 'select' ? ' df-control--select' : ''}${f.control === 'textarea' ? ' df-control--textarea' : ''}`,
    ...(error ? { 'aria-invalid': 'true', 'aria-describedby': `sf-${f.name}-error` } : {}),
    ...(f.required ? { 'aria-required': 'true' } : {}),
  }
  let control
  if (f.control === 'select') {
    const opts = f.options.filter((o) => o !== f.placeholderOption?.text)
    control = (
      <select {...common} defaultValue={f.placeholderOption ? f.placeholderOption.value : undefined}>
        {f.placeholderOption && <option value={f.placeholderOption.value} disabled>{f.placeholderOption.text}</option>}
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    )
  } else if (f.control === 'textarea') {
    control = <textarea {...common} placeholder={f.placeholder} />
  } else {
    control = (
      <input
        {...common}
        type={f.type}
        placeholder={f.placeholder}
        autoComplete={f.autocomplete}
        inputMode={f.inputmode}
      />
    )
  }
  return (
    <div className="df-field">
      <label className="df-label" htmlFor={f.id}>
        {f.label}
        {f.required && <span className="df-req" aria-hidden="true">*</span>}
      </label>
      {control}
      {error && <div id={`sf-${f.name}-error`} className="df-error">{error}</div>}
    </div>
  )
}

function Consent({ consent }) {
  const links = consent.links
  // Placeholder length (chars) covers the whole paragraph; links are appended verbatim.
  const ph = consent.text.find((t) => typeof t === 'object')
  const tail = ` ${links[0].text} and ${links[1].text}.`
  const lead = txt({ placeholder: true, chars: Math.max(20, (ph?.chars || 0) - tail.length) }, 5).replace(/\.$/, '')
  return (
    <p className="t-p12 df-consent">
      {lead}{' '}
      <a href={links[0].href} target="_blank" rel="noreferrer">{links[0].text}</a>
      {' and '}
      <a href={links[1].href} target="_blank" rel="noreferrer">{links[1].text}</a>.
    </p>
  )
}

function DemoFormForm({ form }) {
  const [errors, setErrors] = useState({})
  const byName = Object.fromEntries(form.fields.map((f) => [f.name, f]))
  const paired = new Set(form.rowPairs.flat())
  const rows = []
  for (const f of form.fields) {
    if (!paired.has(f.name)) { rows.push(<Control key={f.name} f={f} error={errors[f.name]} />); continue }
    const pair = form.rowPairs.find((p) => p[0] === f.name)
    if (pair) {
      rows.push(
        <div key={pair.join('-')} className="df-namerow">
          {pair.map((n) => <Control key={n} f={byName[n]} error={errors[n]} />)}
        </div>,
      )
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()
    setErrors(validate(e.currentTarget, form.fields, form.errorMessages))
  }
  return (
    <form id={form.id} className="df-form" noValidate onSubmit={onSubmit}>
      {rows}
      <Consent consent={form.consent} />
      <button type="submit" className="df-submit">{form.submitLabel}</button>
    </form>
  )
}

function HeroForm({ s, seed }) {
  return (
    <section className="t-grid">
      <div className="df-left">
        <div className="df-block">
          <div>
            <p className="t-eyebrow">{s.eyebrow}</p>
            <h1 className="t-h64">{s.h1}</h1>
            <p className="t-p20 df-intro">{txt(s.intro, seed)}</p>
          </div>
          <ul className="df-bullets">
            {s.bullets.map((b) => (
              <li key={b.title} className="df-bullet">
                <span className="df-bullet__mark" aria-hidden="true" />
                <div>
                  <p className="t-p20 df-bullet__title">{b.title}</p>
                  <p className="t-p16 t-grey df-bullet__text">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="df-right">
        <DemoFormForm form={s.form} />
      </div>
    </section>
  )
}

function Tei({ s }) {
  return (
    <section className="t-grid">
      <div className="df-tei__left">
        <h2 className="t-h64">{s.h2}</h2>
        <p className="t-p20 df-tei__p">{s.p}</p>
        <Spacer d={64} md={32} sm={32} />
        <div className="df-stats">
          {s.stats.map((st) => (
            <div key={st.value} className="df-stat">
              <p className="df-stat__value">{st.value}</p>
              <p className="t-p16 t-grey">{st.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="df-tei__right">
        <img className="df-tei__img" src={s.image.src} alt={s.image.alt} />
      </div>
    </section>
  )
}

function Features({ s }) {
  return (
    <>
      <section className="t-grid">
        <div className="df-feat__head">
          <h2 className="t-h64">{s.h2}</h2>
          <Spacer d={96} md={56} sm={56} />
        </div>
      </section>
      <section className="t-grid">
        {s.items.map((it) => (
          <div key={it.title} className="df-feat">
            <img className="df-feat__icon" src={it.icon} alt="" width="64" height="64" />
            <h3 className="t-h20 df-feat__title">{it.title}</h3>
            <p className="t-p16 t-grey df-feat__text">{it.text}</p>
          </div>
        ))}
      </section>
    </>
  )
}

export default function DemoForm({ data }) {
  usePageChrome({ theme: 'dark', footer: 'default', navSpacer: false })
  useTitle(data.meta.title)
  const sec = Object.fromEntries(data.sections.map((s) => [s.type, s]))
  const seed = data.url === '/request-a-demo/' ? 1 : 0
  return (
    <>
    <main className="t-page">
      <Spacer d={96} md={56} sm={56} />
      <HeroForm s={sec.heroForm} seed={seed} />
      <Spacer d={200} md={96} sm={96} />
      <LogoMarquee data={sec.logoMarquee} />
      <Spacer d={200} md={96} sm={96} />
      <Tei s={sec.teiStats} />
      <Spacer d={200} md={96} sm={96} />
      <Features s={sec.featureGrid} />
      <Spacer d={200} md={96} sm={96} />
      <Testimonial data={sec.testimonial} />
      <Spacer d={200} md={200} sm={200} />
    </main>
    {/* Shared final CTA sits after <main> so the last 200px spacer is main:last-child (160 at ≥1281). */}
    <FinalCta />
    </>
  )
}
