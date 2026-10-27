import { useLocation } from 'react-router-dom'
import ChangelogIndex from './ChangelogIndex.jsx'
import ChangelogEntry from './ChangelogEntry.jsx'
import { categories } from './data.js'

// Routes for the changelog template group (specs/content-routes.md). Most specific patterns first.
// - /changelog/                          -> changelog-index (All)
// - /changelog/category/<cat>/ (6)       -> changelog-index, filtered, active pill
// - /changelog/<slug>/ (everything else) -> changelog-entry (unknown slugs get a slug-derived title)

// Keyed by pathname so the client-side year filter resets when switching category pages.
function IndexPage({ category }) {
  const { pathname } = useLocation()
  return <ChangelogIndex key={pathname} category={category} />
}

function EntryPage() {
  const { pathname } = useLocation()
  return <ChangelogEntry key={pathname} />
}

const categoryRoutes = categories
  .filter((c) => c.path !== '/changelog/')
  .map((c) => {
    const slug = c.path.split('/').filter(Boolean)[2]
    return { path: `/changelog/category/${slug}`, element: <IndexPage category={slug} /> }
  })

export const changelogRoutes = [
  { path: '/changelog', element: <IndexPage /> },
  ...categoryRoutes,
  { path: '/changelog/:slug', element: <EntryPage /> },
]
