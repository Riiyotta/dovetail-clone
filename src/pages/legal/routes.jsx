import ComparisonPage from './ComparisonPage.jsx'
import LegalIndex from './LegalIndex.jsx'
import LegalDoc from './LegalDoc.jsx'
import ToolsArticle from './ToolsArticle.jsx'

// Routes for the legal template group (specs/tools-routes.md). Explicit paths only —
// in particular only the four /resources/dovetail-vs-* articles, not a /resources/* wildcard.
const COMPETITORS = [
  'aurelius', 'chattermill', 'condens', 'enterpret', 'great-question', 'insight7', 'lookback', 'looppanel',
  'marvin', 'maze', 'medallia', 'notably', 'pendo', 'qualtrics', 'thematic', 'usertesting',
]
const LEGAL_DOCS = [
  'acceptable-use-policy', 'accessibility-statement', 'ai-features', 'ai-models',
  'anti-bribery-and-anti-corruption-statement', 'community-code-of-conduct', 'insurance',
  'master-subscription-agreement', 'modern-slavery-statement', 'mutual-non-disclosure-agreement',
  'open-source', 'press-kit', 'product-specific-terms-recruit', 'user-terms-of-service',
]
const PRIVACY_DOCS = [
  'compliance-with-laws', 'data-processing-agreement', 'data-subject-access-request', 'event-release', 'privacy-policy',
]
const RESOURCE_ARTICLES = ['aurelius', 'enterpret', 'marvin', 'qualtrics']

// Slug rule: path without leading/trailing slashes, `/` → `--`. `key` forces a fresh page per route.
export const legalRoutes = [
  ...COMPETITORS.map((c) => {
    const slug = `dovetail-vs-${c}`
    return { path: `/${slug}/`, element: <ComparisonPage key={slug} slug={slug} /> }
  }),
  { path: '/legal/', element: <LegalIndex /> },
  ...LEGAL_DOCS.map((d) => ({ path: `/legal/${d}/`, element: <LegalDoc key={d} slug={`legal--${d}`} /> })),
  ...PRIVACY_DOCS.map((d) => ({ path: `/privacy/${d}/`, element: <LegalDoc key={d} slug={`privacy--${d}`} /> })),
  { path: '/research-maturity-assessment/', element: <ToolsArticle key="rma" slug="research-maturity-assessment" /> },
  ...RESOURCE_ARTICLES.map((c) => ({
    path: `/resources/dovetail-vs-${c}/`,
    element: <ToolsArticle key={c} slug={`resources--dovetail-vs-${c}`} />,
  })),
]
