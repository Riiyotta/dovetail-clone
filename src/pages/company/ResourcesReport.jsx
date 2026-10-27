import { useRef } from 'react'
import data from '../../data/company/resources/industry-reports/2025-forrester-TEI-of-Dovetail.json'
import { usePageChrome } from '../../chrome.jsx'
import Spacer from '../../components/company/Spacer.jsx'
import Marquee from '../../components/company/Marquee.jsx'
import PageCta from '../../components/company/PageCta.jsx'
import { Field, FormBox, FormRow } from '../../components/company/Form.jsx'
import { copy } from '../../components/company/text.js'
import { ctaButtons, useMarqueeMotion } from './Parts.jsx'
import '../../styles/company-pages/report.css'

// /resources/industry-reports/2025-forrester-TEI-of-Dovetail/ — specs/resources-report.md.
// Standard banner + nav, no header spacer (main at y=118). Own single-button CTA (S6), footer only.

// Static, non-submitting rebuild of the HubSpot "boxed" form (company-shared S13).
function ReportForm({ form }) {
  const fields = form.fields.filter((f) => f.type !== 'submit')
  const submit = form.fields.find((f) => f.type === 'submit')
  const [first, last, ...rest] = fields
  const field = (f) => (
    <Field key={f.name} hubspot label={f.label} name={`tei-${f.name}`} type={f.type} placeholder={f.placeholder} required={f.required} />
  )
  return (
    <div className="rr-formwrap">
      <FormBox onSubmit={(e) => e.preventDefault()} noValidate>
        <FormRow>{field(first)}{field(last)}</FormRow>
        {rest.map(field)}
        <p className="rr-legal">{copy(form.legalConsent, 252)}</p>
        <div className="rr-actions"><input type="submit" className="rr-submit" value={submit?.value} /></div>
      </FormBox>
    </div>
  )
}

function LogoStrip({ strip }) {
  const ref = useRef(null)
  useMarqueeMotion(ref)
  return (
    <section className="co-container rr-logos">
      <p className="co-m14 rr-logos__eyebrow">{strip.eyebrow}</p>
      <div className="rr-logos__rows" ref={ref}>
        {strip.rows.map((row, r) => (
          <div className={`rr-logos__row${row.offsetLeft ? ' rr-logos__row--offset' : ''}`} key={r}>
            <Marquee direction={row.direction}>
              {row.items.map((it) => (
                <span className="rr-logos__box" key={it.alt}><img src={it.src} alt={it.alt} /></span>
              ))}
            </Marquee>
          </div>
        ))}
        <div className="rr-logos__fade rr-logos__fade--l" aria-hidden="true" />
        <div className="rr-logos__fade rr-logos__fade--r" aria-hidden="true" />
      </div>
    </section>
  )
}

export default function ResourcesReport() {
  usePageChrome({ navSpacer: false })
  return (
    <main className="co-main cp-main rr">
      <Spacer size="hero" />
      <section className="co-grid rr-hero">
        <div className="rr-copy">
          <div className="rr-copy__inner">
            <div>
              <h1 className="co-h64">{data.h1}</h1>
              <p className="co-p20 rr-copy__p">{copy(data.intro, 242)}</p>
            </div>
            <ul className="rr-bullets">
              {data.bullets.map((b) => (
                <li key={b}><span className="rr-bullets__sq" aria-hidden="true" /><p className="co-h20 rr-bullets__p">{b}</p></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rr-formcol"><ReportForm form={data.form} /></div>
      </section>
      {/* Not listed in the spec: <main> is 1,860 at 1440 and the listed parts sum to 1,660, so a 200px gap sits here. */}
      <Spacer size="s200" />
      <LogoStrip strip={data.logoMarquee} />
      <Spacer size="s200" />
      <PageCta heading={data.cta.heading} buttons={ctaButtons(data.cta.buttons)} topSpacer={false} />
    </main>
  )
}
