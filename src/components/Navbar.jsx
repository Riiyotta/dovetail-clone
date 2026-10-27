import { Link } from 'react-router-dom'
import SiteLink, { HREFS } from './SiteLink.jsx'
import { useChrome } from '../chrome.jsx'
import '../styles/shared.css'
import '../styles/Navbar.css'

// CLONE_SPEC.md §2 — main nav. Dropdowns open on CSS :hover of the wrapper (no JS).

const PRODUCT = [
  {
    heading: 'Platform',
    items: [
      { title: 'Digital Twins', badge: 'New', tile: 'bg-tile-twins', icon: 'digital-twins', desc: 'Talk with a replica of your customer segments, built from real data' },
      { title: 'Agents', tile: 'bg-tile-agents', icon: 'agents', desc: 'Transform customer signals into intelligent, automated action' },
      { title: 'Channels 2.0', badge: 'Beta', tile: 'bg-tile-channels', icon: 'channels', desc: 'Classify raw data into ideas and identify emerging issues' },
    ],
  },
  {
    heading: '',
    items: [
      { title: 'Docs', tile: 'bg-tile-docs', icon: 'docs', desc: 'Create shareable AI outputs to drive decisions and action' },
      { title: 'Chat', tile: 'bg-tile-chat', icon: 'chat', desc: 'Get instant answers and discover anything across customer data' },
    ],
  },
  {
    heading: '',
    items: [
      { title: 'Projects', tile: 'bg-tile-chat', icon: 'projects', desc: 'Automatic analysis to turn feedback into structured intelligence' },
      { title: 'Dashboards', badge: 'Beta', tile: 'bg-tile-dash', icon: 'dashboards', desc: 'Visualize customer trends alongside key business metrics' },
    ],
  },
]

const SOLUTIONS = [
  {
    heading: 'Roles',
    items: [
      { title: 'Design', desc: 'Surface real user signals to back every design decision' },
      { title: 'Product Management', desc: 'Prioritize with confidence using quantified customer evidence' },
      { title: 'Research', desc: 'Scale research impact and share insights across your org' },
    ],
  },
  {
    heading: '',
    items: [
      { title: 'Customer Experience', desc: 'Act on support tickets, NPS, and renewals before they escalate' },
      { title: 'Sales & Customer Success', desc: 'Win more deals and reduce churn with revenue intelligence' },
      { title: 'Marketing', desc: 'Build campaigns on real customer language, not assumptions' },
    ],
  },
  {
    heading: 'Use cases',
    items: [
      { title: 'Voice of Customer', desc: 'Connect every feedback channel into one intelligence layer' },
      { title: 'Product Research', desc: 'Ground prioritization and tradeoffs in customer evidence' },
      { title: 'Research Repository', desc: 'Turn studies and transcripts into shared customer intelligence' },
    ],
  },
]

const RESOURCES = [
  {
    heading: 'Resources',
    items: [
      { title: 'Blog', desc: 'Breaking news, opinions, and product thinking from Dovetail' },
      { title: 'Live demos', desc: 'Learn the workflows and features that help teams move faster' },
    ],
  },
  {
    heading: 'Help',
    items: [
      { title: 'Help center', desc: 'Find answers to common product and workflow issues' },
      { title: 'Academy', desc: 'Learn best practices and sharpen your skills with guided training' },
      { title: 'Changelog', desc: 'See the latest releases, improvements, and updates' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { title: 'Events', desc: 'Live and virtual events that connect the global Dovetail community' },
      { title: 'Careers', desc: 'Join a fast-growing team shaping the future of customer intelligence' },
    ],
  },
]

function Columns({ columns, wide }) {
  return (
    <div className="nav-dd__columns">
      {columns.map((col, ci) => (
        <div className="nav-dd__col" key={ci}>
          <div className="nav-dd__heading mono-12">{col.heading}</div>
          {col.items.map((it) => (
            <SiteLink className="nav-dd__item" to={HREFS[it.title]} key={it.title}>
              <span className="nav-dd__title-row">
                {it.icon && (
                  <span className={`nav-dd__tile ${it.tile}`}>
                    <img src={`/assets/svg/nav-icon-${it.icon}.svg`} alt="" width="20" height="20" />
                  </span>
                )}
                <span className="nav-dd__title">{it.title}</span>
                {it.badge && <span className="nav-dd__badge mono-12 bg-fill-08">{it.badge}</span>}
              </span>
              <span className={`nav-dd__desc text-text-muted ${wide ? 'nav-dd__desc--wide' : ''}`}>{it.desc}</span>
            </SiteLink>
          ))}
        </div>
      ))}
    </div>
  )
}

function Dropdown({ label, children }) {
  return (
    <div className="nav-dd">
      <button type="button" className="btn btn-nav-ghost nav-link">{label}</button>
      <div className="nav-dd__positioner">
        <div className="nav-dd__panel bg-surface-3 border border-border-subtle">{children}</div>
      </div>
    </div>
  )
}

export default function Navbar() {
  // content-shared.md §1/§2: light pages get the light nav (`nav--light`) and most pages get the 88px spacer.
  // marketing-shared.md §5: `navBg` paints the product accent; `nav: 'none'` for pages with their own nav.
  // tools-shared.md §I: `palette: 'legal'` adds the legal dropdown colours; legal docs hide the button group.
  const { theme, navSpacer, nav, navBg, navButtons, palette } = useChrome()
  if (nav === 'none') return null
  let cls = theme === 'light' ? 'nav nav--light' : 'nav'
  if (palette === 'legal') cls += ' nav--legal'
  return (
    <>
    <nav aria-label="Main navigation" className={cls} style={navBg ? { background: navBg } : undefined}>
      <div className="nav__left">
        <Link className="nav__logo text-white" to="/" aria-label="Dovetail home">
          <span className="svg-icon nav__logo-mark" style={{ '--icon': 'url(/assets/svg/nav-dovetail-logo.svg)' }} />
        </Link>
        <div className="nav__links">
          <Dropdown label="Product">
            <div className="nav-dd__row">
              <Columns columns={PRODUCT} wide />
              <Link className="nav-promo bg-bg" to="/product/digital-twins/">
                <img className="nav-promo__img" src="/assets/nav-digital-twins.webp" alt="" />
                <span className="nav-promo__eyebrow mono-12">Introducing: Digital Twins</span>
                <span className="nav-promo__heading">Ask.<br />Never guess.</span>
              </Link>
            </div>
            <a className="nav-footcard bg-bg border border-border-subtle" href={HREFS['API and Integrations']}>
              <span className="nav-footcard__title">API and Integrations</span>
              <span className="nav-footcard__desc text-text-muted">Connect your stack end-to-end: data in, intelligence out</span>
            </a>
          </Dropdown>
          <Dropdown label="Solutions"><Columns columns={SOLUTIONS} /></Dropdown>
          <Dropdown label="Resources"><Columns columns={RESOURCES} /></Dropdown>
          <Link className="btn btn-nav-ghost nav-link" to="/enterprise/">Enterprise</Link>
          <Link className="btn btn-nav-ghost nav-link" to="/customers/">Customers</Link>
          <Link className="btn btn-nav-ghost nav-link" to="/pricing/">Pricing</Link>
        </div>
      </div>
      {navButtons && (
        <div className="nav__right">
          <a className="btn btn-nav-ghost nav-link" href={HREFS['Log in']}>Log in</a>
          <Link className="btn btn-nav-white" to="/request-a-demo/">Book a demo</Link>
        </div>
      )}
      <Link className="nav__menu" to="/menu/">Menu</Link>
    </nav>
    {navSpacer && <div className="nav-spacer" aria-hidden="true" />}
    </>
  )
}
