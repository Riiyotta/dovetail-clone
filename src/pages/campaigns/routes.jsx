import LaunchPage from './launch/LaunchPage.jsx'
import BestNeverGuessPage from './bng/BestNeverGuessPage.jsx'

// Routes for the campaigns template group (specs/marketing-routes.md). Most specific patterns first.
export const campaignsRoutes = [
  { path: '/launch/suns-out', element: <LaunchPage /> },
  { path: '/the-best-never-guess', element: <BestNeverGuessPage /> },
]
