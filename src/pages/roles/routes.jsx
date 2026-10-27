import RolePage from './RolePage.jsx'
import QuizPage from './QuizPage.jsx'
import SolutionPage from './SolutionPage.jsx'

// Routes for the roles, role-quiz and solutions templates (specs/marketing-routes.md). Most specific patterns first.
const files = import.meta.glob('../../data/marketing/{roles,solutions}__*.json', { eager: true, import: 'default' })
const pages = Object.values(files)

const path = (url) => url.replace(/\/$/, '')

const quizzes = pages.filter((d) => d.template === 'quiz')
const roles = pages.filter((d) => d.template === 'roles')
const solutions = pages.filter((d) => d.template === 'solutions')

export const rolesRoutes = [
  ...quizzes.map((d) => ({ path: path(d.url), element: <QuizPage key={d.url} data={d} /> })),
  ...roles.map((d) => ({ path: path(d.url), element: <RolePage key={d.url} data={d} /> })),
  ...solutions.map((d) => ({ path: path(d.url), element: <SolutionPage key={d.url} data={d} /> })),
]
