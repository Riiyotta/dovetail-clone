import ResourcesIndex from './ResourcesIndex.jsx'
import ResourcesGuide from './ResourcesGuide.jsx'
import ResourcesReport from './ResourcesReport.jsx'
import Careers from './Careers.jsx'
import Podcast from './Podcast.jsx'
import AwsSummit from './AwsSummit.jsx'

// Routes for the company template group (specs/company-routes.md). Most specific patterns first.
// /resources/dovetail-vs-{aurelius,enterpret,marvin,qualtrics}/ are ToolsArticle routes in src/pages/legal/routes.jsx
// (registered earlier in the table), so only the two remaining guides are listed here.
export const companyRoutes = [
  { path: '/resources/industry-reports/2025-forrester-TEI-of-Dovetail/', element: <ResourcesReport /> },
  { path: '/resources/dovetail-review/', element: <ResourcesGuide key="dovetail-review" slug="dovetail-review" /> },
  { path: '/resources/insight7-alternatives/', element: <ResourcesGuide key="insight7-alternatives" slug="insight7-alternatives" /> },
  { path: '/resources/', element: <ResourcesIndex /> },
  { path: '/careers/', element: <Careers /> },
  { path: '/b2bsaasy/', element: <Podcast /> },
  { path: '/aws-summit-sydney-2026/', element: <AwsSummit /> },
]
