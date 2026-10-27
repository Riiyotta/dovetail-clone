import { HUBS } from './data.js'
import GuideArticle from './GuideArticle.jsx'
import GuidesIndex from './GuidesIndex.jsx'
import { ContributorProfile, ContributorsIndex } from './Contributors.jsx'

// Routes for the guides template group (specs/content-routes.md). Most specific patterns first.
// Any /<hub>/<slug>/ (known or not) renders the guide-article template.
export const guidesRoutes = [
  { path: '/guides/', element: <GuidesIndex /> },
  { path: '/guides/:slug/', element: <GuideArticle hub="guides" /> },
  { path: '/contributors/', element: <ContributorsIndex /> },
  { path: '/contributors/:slug/', element: <ContributorProfile /> },
  ...HUBS.flatMap((hub) => [
    { path: `/${hub}/`, element: <GuideArticle key={`${hub}-hub`} hub={hub} isHub /> },
    { path: `/${hub}/:slug/`, element: <GuideArticle key={hub} hub={hub} /> },
  ]),
]
