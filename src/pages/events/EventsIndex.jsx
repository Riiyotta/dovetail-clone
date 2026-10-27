import { useMemo } from 'react'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import Spacer from '../../components/company/Spacer.jsx'
import PageCta from '../../components/company/PageCta.jsx'
import EventCard from '../../components/company/EventCard.jsx'
import RowList from '../../components/company/RowList.jsx'
import { DotBackground } from '../../components/company/Backgrounds.jsx'
import webinarsData from '../../data/company/webinars.json'
import { splitEvents, eventCardProps, eventRows } from './data.js'
import '../../styles/company/base.css'
import '../../styles/events/events.css'

// events-index template (specs/events-index.md): /events/ and /webinars/ (online events only).
// Intro copy is the spec's verbatim text (events-index.md table); events.json has a different sentence
// and webinars.json has none.
const VARIANTS = {
  events: {
    h1: 'Events',
    intro: 'Polish your craft, learn about our product, and meet others in our community with live events, webinars, and more.',
    onlineOnly: false,
  },
  webinars: {
    h1: 'Webinars',
    intro: 'Polish your craft, learn about our product, and watch helpful videos.',
    onlineOnly: true,
  },
}

export default function EventsIndex({ variant = 'events' }) {
  const v = VARIANTS[variant]
  const isWebinars = variant === 'webinars'
  usePageChrome({ navSpacer: false })
  const { upcoming, past } = useMemo(() => splitEvents({ onlineOnly: v.onlineOnly }), [v.onlineOnly])

  return (
    <>
      <main className="co-main">
        {/* §1 Hero */}
        <div className="ev-hero">
          <DotBackground className="ev-hero__dots" />
          <section className="co-container">
            <Spacer size="s80" />
            <p className="co-m14 ev-hero__intro">{v.intro}</p>
            <Spacer size="s246" />
            <h1 className="ev-h160">{v.h1}</h1>
          </section>
          <Spacer size="s80" />
        </div>

        {/* §2 Upcoming events */}
        <section className="co-grid">
          <div className="ev-upcoming__col">
            <div className="ev-cardgrid">
              {upcoming.map((e) => <EventCard key={e.slug} {...eventCardProps(e)} />)}
            </div>
          </div>
        </section>

        {/* §3 Past events */}
        <Spacer size="s200" />
        <section className="co-container">
          <p className="co-h48 ev-heading">{webinarsData.pastHeading}</p>
          <Spacer size="s64" />
          <div className="ev-rows">
            <RowList rows={eventRows(past)} />
          </div>
        </section>

        {isWebinars
          ? <PageCta heading={webinarsData.cta.heading}
              buttons={webinarsData.cta.buttons.map((b, i) => ({ ...b, variant: i === 0 ? 'primary' : 'secondary' }))} />
          : <Spacer size="s200-fixed" />}
      </main>
      {!isWebinars && <FinalCta />}
    </>
  )
}
