import Pricing from './Pricing.jsx'
import Enterprise from './Enterprise.jsx'
import EnterpriseArticle, { ARTICLES } from './EnterpriseArticle.jsx'
import Deploy from './Deploy.jsx'
import Menu from './Menu.jsx'

// Routes for the corporate template group. Most specific patterns first.
export const corporateRoutes = [
  ...Object.keys(ARTICLES).map((slug) => ({ path: `/enterprise/${slug}`, element: <EnterpriseArticle key={slug} slug={slug} /> })),
  { path: '/enterprise', element: <Enterprise /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '/deploy', element: <Deploy /> },
  { path: '/menu', element: <Menu /> },
]
