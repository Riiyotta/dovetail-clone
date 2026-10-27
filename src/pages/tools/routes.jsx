import DemoForm from './DemoForm.jsx'
import RoiCalculator from './RoiCalculator.jsx'
import QuizHub from './QuizHub.jsx'
import TemplateLanding from './TemplateLanding.jsx'
import contactSales from '../../data/tools/contact-sales.json'
import requestADemo from '../../data/tools/request-a-demo.json'
import roiCalculator from '../../data/tools/roi-calculator.json'
import quiz from '../../data/tools/quiz.json'
import uxResearchPlan from '../../data/tools/ux-research-plan-template.json'
import userPersona from '../../data/tools/user-persona-template.json'
import researchReport from '../../data/tools/research-report-template.json'

// Routes for the tools template group (specs/tools-routes.md). The 404 page (NotFound.jsx default export)
// is wired as the catch-all at the app level, not here.
export const toolsRoutes = [
  { path: '/contact-sales', element: <DemoForm key="contact-sales" data={contactSales} /> },
  { path: '/request-a-demo', element: <DemoForm key="request-a-demo" data={requestADemo} /> },
  { path: '/roi-calculator', element: <RoiCalculator data={roiCalculator} /> },
  { path: '/quiz', element: <QuizHub data={quiz} /> },
  { path: '/ux-research-plan-template', element: <TemplateLanding key="ux" data={uxResearchPlan} /> },
  { path: '/user-persona-template', element: <TemplateLanding key="persona" data={userPersona} /> },
  { path: '/research-report-template', element: <TemplateLanding key="report" data={researchReport} /> },
]
