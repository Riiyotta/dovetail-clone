import Home from './pages/Home.jsx'
import NotFound from './pages/tools/NotFound.jsx'
import { guidesRoutes } from './pages/guides/routes.jsx'
import { blogRoutes } from './pages/blog/routes.jsx'
import { changelogRoutes } from './pages/changelog/routes.jsx'
import { productRoutes } from './pages/product/routes.jsx'
import { rolesRoutes } from './pages/roles/routes.jsx'
import { corporateRoutes } from './pages/corporate/routes.jsx'
import { campaignsRoutes } from './pages/campaigns/routes.jsx'
import { toolsRoutes } from './pages/tools/routes.jsx'
import { legalRoutes } from './pages/legal/routes.jsx'
import { customersRoutes } from './pages/customers/routes.jsx'
import { eventsRoutes } from './pages/events/routes.jsx'
import { companyRoutes } from './pages/company/routes.jsx'

// Route table. Each template group exports its own route array from
// src/pages/<group>/routes.jsx; they're spread in here.
export const routes = [
  { path: '/', element: <Home /> },
  ...guidesRoutes,
  ...blogRoutes,
  ...changelogRoutes,
  ...productRoutes,
  ...rolesRoutes,
  ...corporateRoutes,
  ...campaignsRoutes,
  ...toolsRoutes,
  ...legalRoutes,
  ...customersRoutes,
  ...eventsRoutes,
  ...companyRoutes,
  { path: '*', element: <NotFound /> },
]
