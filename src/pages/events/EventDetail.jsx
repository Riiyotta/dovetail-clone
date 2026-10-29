import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import Spacer from '../../components/company/Spacer.jsx'
import Icon from '../../components/company/Icon.jsx'
import { seedOf } from '../../components/company/text.js'
import EventCard from '../../components/company/EventCard.jsx'
import VideoCard from '../../components/company/VideoCard.jsx'
import Faq from '../../components/company/Faq.jsx'
import { formatEventDateTime } from '../../components/company/dates.js'
import RichBody from './RichBody.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import { eventCardProps, loaderFor, moreEventsFor, titleFromSlug } from './data.js'
import '../../styles/company/base.css'
import '../../styles/events/events.css'

const BACK = '/assets/company/svg/icon-back-arrow.svg'

// event-detail template (specs/event-detail.md) for /events/:slug/. Unknown slugs render the template
// with a slug-derived title and no details/body.
export default function EventDetail() {
  const { slug = '' } = useParams()
  usePageChrome({ navSpacer: false })
  const [state, setState] = useState({ slug: null, data: null })

  useEffect(() => {
    let live = true
    const load = loaderFor(slug)
    if (!load) { setState({ slug, data: null }); return }
    load().then((data) => { if (live) setState({ slug, data }) })
    return () => { live = false }
  }, [slug])

  const ready = state.slug === slug
  const ev = ready ? state.data : null
  const more = useMemo(() => moreEventsFor(slug), [slug])
  if (!ready) return <main className="co-main" />

  const title = ev?.title ?? titleFromSlug(slug)
  const seed = seedOf(slug)

  return (
    <>
      <main className="co-main">
        <section className="co-grid">
          {/* §1 Header */}
          <div className="ev-head">
            <Spacer size="hero" />
            <Link className="co-backlink ev-back" to={ev?.backLink?.href || '/events/'}>
              <Icon src={BACK} className="co-backlink__icon" />
              <span className="co-h18 co-backlink__label">{ev?.backLink?.label || 'Back'}</span>
            </Link>
            <h1 className="co-h72 ev-detail__h1">{title}</h1>
            <div className="ev-sp-160-fixed" aria-hidden="true" />
          </div>

          {/* §2 Sidebar */}
          <aside className="ev-sidebar">
            <div className="ev-sidebar__box">
              <div className="ev-details">
                <hr className="co-hr" />
                {ev && detailRows(ev).map((r) => (
                  <Fragment key={r.label}>
                    <p className="co-m14 ev-detail-row">
                      <span className="ev-detail-row__label">{r.label}</span>
                      <span className="ev-detail-row__value">
                        {r.href
                          ? <a className="ev-register-link" href={r.href} target="_blank" rel="noreferrer">{r.value}</a>
                          : r.value}
                      </span>
                    </p>
                    <hr className="co-hr" />
                  </Fragment>
                ))}
              </div>
            </div>
          </aside>

          {/* §3 Content */}
          {ev && (
            <div className="ev-content">
              {ev.hero?.type === 'video' && ev.hero.youtubeId ? (
                <VideoCard variant="hero" youtubeId={ev.hero.youtubeId} image={ev.hero.image} alt="" />
              ) : ev.hero?.image ? (
                <img className="ev-hero-img" src={ev.hero.image} alt="" width={ev.hero.width || undefined}
                  height={ev.hero.height || undefined} />
              ) : null}
              <Spacer size="s48" />
              <RichBody blocks={ev.body} seed={seed} />
              {ev.form && (
                <>
                  <Spacer size="s48" />
                  <h3 className="co-h24 ev-form-h3">{ev.form.heading}</h3>
                  <div className="ev-sp-24" aria-hidden="true" />
                  <RegistrationForm form={ev.form} />
                </>
              )}
            </div>
          )}
        </section>

        {/* §4 More events (omitted when there are none, e.g. on the upcoming event itself) */}
        {more.length > 0 && (
          <>
            {/* On the original the More-events block is the next row of the detail grid: its row-gap (32px, 24px <=1280) precedes the spacer. */}
            <div className="ev-more-gap" aria-hidden="true" />
            <Spacer size="s200" />
            <section className="co-container">
              <p className="co-h48 ev-heading">More events</p>
              <Spacer size="s64" />
            </section>
            <section className="co-grid">
              {more.map((e) => (
                <div key={e.slug} className="ev-more__card"><EventCard {...eventCardProps(e)} /></div>
              ))}
            </section>
          </>
        )}

        {/* §5 Q&A */}
        {ev?.qa && (
          <div className="ev-qa">
            <Spacer size="s160" />
            <section className="co-grid">
              <div className="ev-qa__head">
                <h2 className="co-h64 ev-qa__h2">{ev.qa.heading}</h2>
                {ev.qa.subtitle && <p className="ev-qa__sub">{ev.qa.subtitle}</p>}
              </div>
            </section>
            {ev.qa.groups.map((g, i) => (
              <Fragment key={g.heading}>
                <Spacer size="s64-48" />
                <Faq compact heading={g.heading} seed={seed + i * 101}
                  items={g.items.map((it) => ({ q: it.q, a: it.a, more: it.links?.[0] && { label: it.links[0].text, href: it.links[0].href } }))} />
              </Fragment>
            ))}
          </div>
        )}
      </main>
      <FinalCta />
    </>
  )
}

// Sidebar rows (event-detail.md §2). START / END are re-formatted in the viewer's timezone (S14);
// other values are the recorded strings.
function detailRows(ev) {
  return (ev.sidebar || []).map((r) => {
    if (r.label === '[START]') return { label: r.label, value: ev.startDate ? formatEventDateTime(ev.startDate) : r.value }
    if (r.label === '[END]') return { label: r.label, value: ev.endDate ? formatEventDateTime(ev.endDate) : r.value }
    if (r.label === '[REGISTER]') return { label: r.label, value: r.linkText || r.value, href: r.href }
    return { label: r.label, value: r.value }
  })
}
