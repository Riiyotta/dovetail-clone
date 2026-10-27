import eventsIndex from '../../data/company/events.json'
import { formatEventDate } from '../../components/company/dates.js'

// Upcoming vs past is computed at runtime from startDate (events-index.md, company-routes.md).
export const allEvents = eventsIndex.allEvents.filter((e) => !e.hideFromIndexPage)

const t = (e) => new Date(e.startDate).getTime() || 0

export function splitEvents({ onlineOnly = false, now = Date.now() } = {}) {
  const list = onlineOnly ? allEvents.filter((e) => e.onlineEvent) : allEvents
  const upcoming = list.filter((e) => t(e) >= now).sort((a, b) => t(a) - t(b))
  const past = list.filter((e) => t(e) < now).sort((a, b) => t(b) - t(a))
  return { upcoming, past }
}

// "More events" on a detail page = the other upcoming events (event-detail.md §4).
export function moreEventsFor(slug, now = Date.now()) {
  return splitEvents({ now }).upcoming.filter((e) => e.slug !== slug)
}

export const eventHref = (slug) => `/events/${slug}/`
export const eventWhere = (e) => e.location || (e.onlineEvent ? 'Online' : '')

// Props for the shared S3 EventCard. Dates render in the viewer's timezone (S14).
export const eventCardProps = (e) => ({
  href: eventHref(e.slug),
  image: e.coverImage,
  title: e.title,
  meta: [`[When] ${formatEventDate(e.startDate)}`, `[Where] ${eventWhere(e)}`],
})

// Rows for the shared S4 RowList (past events).
export const eventRows = (list) =>
  list.map((e) => ({ href: eventHref(e.slug), small: formatEventDate(e.startDate), title: e.title }))

// "some-event-slug" → "Some event slug" (title for unknown slugs).
export const titleFromSlug = (slug = '') => {
  const s = slug.replace(/[-_]+/g, ' ').trim()
  return s ? s[0].toUpperCase() + s.slice(1) : 'Event'
}

// Lazy loaders for /events/{slug}/ data files.
export const eventLoaders = import.meta.glob('../../data/company/events/*.json', { import: 'default' })
export const loaderFor = (slug) => eventLoaders[`../../data/company/events/${slug}.json`]
