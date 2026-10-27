import CustomersIndex from './CustomersIndex.jsx'
import CustomerStory from './CustomerStory.jsx'

// Routes for the customers template group (specs/company-routes.md). Most specific patterns first.
// /customers/:slug/ covers the 39 recorded stories (src/data/company/customers/{slug}.json); any other slug
// renders the story template with a slug-derived title. CustomerStory keys <main> by slug so state resets per story.
function StoryRoute() {
  return <CustomerStory />
}

export const customersRoutes = [
  { path: '/customers/', element: <CustomersIndex /> },
  { path: '/customers/:slug/', element: <StoryRoute /> },
]
