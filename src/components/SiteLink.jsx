import { Link } from 'react-router-dom'

// Link targets for the nav and footer, keyed by visible label (taken from the original homepage's hrefs).
// Paths starting with '/' are routes in this clone; anything else is an external site.
export const HREFS = {
  // Product
  'Digital Twins': '/product/digital-twins/',
  Agents: '/product/ai-agents/',
  'Channels 2.0': '/product/ai-channels/',
  Docs: '/product/ai-docs/',
  Chat: '/product/ai-chat/',
  Projects: '/product/ai-projects/',
  Dashboards: '/product/ai-dashboards/',
  Deploy: '/deploy/',
  Enterprise: '/enterprise/',
  Customers: '/customers/',
  Pricing: '/pricing/',
  'API and Integrations': 'https://docs.dovetail.com/integrations/',
  // Roles (nav label / footer label)
  Design: '/roles/design/',
  Designer: '/roles/design/',
  'Product Management': '/roles/product-management/',
  'Product Manager': '/roles/product-management/',
  Research: '/roles/research/',
  Researcher: '/roles/research/',
  'Customer Experience': '/roles/customer-experience/',
  'Sales & Customer Success': '/roles/sales-and-cs/',
  'Sales & CS': '/roles/sales-and-cs/',
  Marketing: '/roles/marketing/',
  // Use cases
  'Voice of Customer': '/solutions/voice-of-customer/',
  'Product Research': '/solutions/product-research/',
  'Research Repository': '/solutions/research-repository/',
  // Resources
  Blog: '/blog/',
  'Live demos': '/live-demos/',
  'Live Demos': '/live-demos/',
  'Help center': 'https://docs.dovetail.com/help/',
  'Help centre': 'https://docs.dovetail.com/help/',
  Academy: 'https://docs.dovetail.com/academy/',
  Changelog: '/changelog/',
  Community: 'https://join.slack.com/t/heydovetail/shared_invite/zt-259wcpl3m-RFEoKe~9idHyALNwwCnZKA',
  Events: '/events/',
  Careers: '/careers/',
  // Comparisons
  Marvin: '/dovetail-vs-marvin/',
  Condens: '/dovetail-vs-condens/',
  Maze: '/dovetail-vs-maze/',
  UserTesting: '/dovetail-vs-usertesting/',
  Lookback: '/dovetail-vs-lookback/',
  'Great Question': '/dovetail-vs-great-question/',
  Enterpret: '/dovetail-vs-enterpret/',
  Qualtrics: '/dovetail-vs-qualtrics/',
  Medallia: '/dovetail-vs-medallia/',
  Pendo: '/dovetail-vs-pendo/',
  Chattermill: '/dovetail-vs-chattermill/',
  Thematic: '/dovetail-vs-thematic/',
  Aurelius: '/dovetail-vs-aurelius/',
  // Customer stories
  Breville: '/customers/breville/',
  Okta: '/customers/okta/',
  Atlassian: '/customers/atlassian/',
  Canva: '/customers/canva/',
  'Itaú Unibanco': '/customers/itau-unibanco/',
  Zapier: '/customers/zapier/',
  AWS: '/customers/aws/',
  CNH: '/customers/cnh/',
  // Company
  'Request a demo': '/request-a-demo/',
  'Book a demo': '/request-a-demo/',
  'Contact sales': '/contact-sales/',
  'Trust center': 'https://trust.dovetail.com/',
  'Legal & Privacy': '/legal/',
  'Log in': 'https://dovetail.com/start/',
}

// <SiteLink to="/x/"> → client-side route; <SiteLink to="https://…"> → plain anchor. Other props pass through.
export default function SiteLink({ to, children, ...rest }) {
  if (to && to.startsWith('/')) return <Link to={to} {...rest}>{children}</Link>
  return <a href={to || '#'} {...rest}>{children}</a>
}
