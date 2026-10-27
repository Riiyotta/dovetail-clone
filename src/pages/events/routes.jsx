import EventsIndex from './EventsIndex.jsx'
import EventDetail from './EventDetail.jsx'
import LiveDemos from './LiveDemos.jsx'

// Routes for the events template group. Most specific patterns first.
// /events/:slug/ covers all 47 event pages; unknown slugs render the event template with a slug-derived title.
export const eventsRoutes = [
  { path: '/events/', element: <EventsIndex variant="events" /> },
  { path: '/webinars/', element: <EventsIndex variant="webinars" /> },
  { path: '/live-demos/', element: <LiveDemos /> },
  { path: '/events/:slug/', element: <EventDetail /> },
]
