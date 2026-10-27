import { Link } from 'react-router-dom'
import { useChrome } from '../chrome.jsx'
import SiteLink, { HREFS } from './SiteLink.jsx'
import InlineCta from './InlineCta.jsx'
import '../styles/marketing/base.css'
import '../styles/Footer.css'

// CLONE_SPEC.md §11. Link labels and badges verbatim.
const COLUMNS = [
  {
    key: 'platform',
    groups: [
      {
        heading: 'Platform',
        links: [
          ['Digital Twins', 'new'], ['Channels 2.0', 'beta'], ['Agents'], ['Dashboards', 'beta'], ['Projects'],
          ['Chat'], ['Docs'], ['Deploy'], ['Enterprise'], ['Customers'], ['Pricing'],
        ],
      },
    ],
  },
  {
    key: 'roles',
    groups: [
      {
        heading: 'Roles',
        links: [['Designer'], ['Researcher'], ['Product Manager'], ['Customer Experience'], ['Sales & CS'], ['Marketing']],
      },
      { heading: 'Use Cases', links: [['Voice of Customer'], ['Product Research'], ['Research Repository']] },
    ],
  },
  {
    key: 'resources',
    groups: [
      {
        heading: 'Resources',
        links: [['Blog'], ['Changelog'], ['Community'], ['Events'], ['Help centre'], ['Academy'], ['Live Demos']],
      },
    ],
  },
  {
    key: 'comparisons',
    groups: [
      {
        heading: 'Comparisons',
        links: [
          ['Marvin'], ['Condens'], ['Maze'], ['UserTesting'], ['Lookback'], ['Great Question'], ['Enterpret'],
          ['Qualtrics'], ['Medallia'], ['Pendo'], ['Chattermill'], ['Thematic'], ['Aurelius'],
        ],
      },
    ],
  },
  {
    key: 'customers',
    groups: [
      {
        heading: 'Customers',
        links: [['Breville'], ['Okta'], ['Atlassian'], ['Canva'], ['Itaú Unibanco'], ['Zapier'], ['AWS'], ['CNH']],
      },
    ],
  },
  {
    key: 'contact',
    groups: [
      { heading: 'Contact', links: [['Request a demo'], ['Contact sales']] },
      { heading: 'Company', links: [['Careers'], ['Trust center']] },
    ],
  },
]

// Inline SVGs copied from the live footer. The original forces the #FAFAFA fills/strokes to #FFF via CSS,
// and its hover only changes the link `color` (#A7A7A7), which these fixed fills don't use, so there is no
// visible hover change on the icons. Mirrored here with fixed #FFF.
const SOCIALS = [
  ['LinkedIn', 'https://www.linkedin.com/company/heydovetail/', ['M12.136 22.985H9.233v-9.336h2.903zm-1.451-10.608a1.682 1.682 0 1 1-.006-3.364 1.682 1.682 0 0 1 .006 3.364M23 22.985h-2.9v-4.538c0-1.081-.018-2.476-1.508-2.476-1.51 0-1.738 1.18-1.738 2.4v4.614h-2.896v-9.336h2.781v1.276h.038c.386-.734 1.333-1.51 2.743-1.51 2.938 0 3.48 1.934 3.48 4.447z']],
  ['X', 'https://x.com/hidovetail', ['M20.026 9h2.147l-4.69 5.93L23 23h-4.32l-3.384-4.894L11.425 23H9.276l5.017-6.343L9 9h4.43l3.058 4.474zm-.754 12.578h1.19l-7.679-11.231h-1.276z']],
  ['Instagram', 'https://www.instagram.com/hidovetail/?hl=en', [
    'M16 10.26c1.87 0 2.092.009 2.827.042.684.03 1.053.145 1.3.24.325.126.56.28.803.523.246.245.397.478.522.803.096.246.21.618.241 1.3.033.738.041.959.041 2.827 0 1.87-.008 2.091-.041 2.827-.03.684-.145 1.053-.24 1.299-.126.325-.28.56-.523.804a2.15 2.15 0 0 1-.804.522c-.246.096-.618.21-1.299.24-.738.033-.96.041-2.827.041-1.87 0-2.092-.008-2.827-.04-.684-.03-1.053-.145-1.3-.241a2.2 2.2 0 0 1-.803-.522 2.15 2.15 0 0 1-.522-.804c-.096-.246-.21-.618-.241-1.3-.033-.737-.041-.959-.041-2.827 0-1.87.008-2.091.041-2.827.03-.683.145-1.053.24-1.299.126-.325.28-.56.523-.803.246-.247.478-.397.804-.523.246-.095.618-.21 1.299-.24.735-.033.957-.041 2.827-.041M16 9c-1.9 0-2.138.008-2.885.041-.744.033-1.255.153-1.698.325-.462.18-.853.419-1.241.81a3.4 3.4 0 0 0-.81 1.239c-.172.445-.292.954-.325 1.698C9.008 13.862 9 14.1 9 16s.008 2.138.041 2.885c.033.743.153 1.255.325 1.698.18.462.419.853.81 1.241.388.388.78.63 1.239.807.445.172.954.292 1.698.325.746.033.984.041 2.884.041s2.139-.008 2.885-.04c.744-.034 1.255-.154 1.698-.326.46-.178.85-.419 1.239-.807.388-.388.629-.78.806-1.239.173-.445.293-.954.326-1.698.033-.746.04-.984.04-2.884s-.007-2.139-.04-2.885c-.033-.744-.153-1.255-.326-1.698a3.3 3.3 0 0 0-.8-1.244 3.4 3.4 0 0 0-1.24-.807c-.445-.172-.954-.292-1.698-.325C18.139 9.008 17.9 9 16 9',
    'M16 12.404a3.597 3.597 0 1 0 .002 7.193A3.597 3.597 0 0 0 16 12.404m0 5.928a2.333 2.333 0 1 1 0-4.665 2.333 2.333 0 0 1 0 4.665M20.577 12.262a.84.84 0 1 1-1.679 0 .84.84 0 0 1 1.68 0',
  ]],
  ['YouTube', 'https://www.youtube.com/@hidovetail', ['M23.84 12.8s-.156-1.103-.637-1.587c-.61-.638-1.29-.64-1.603-.678-2.238-.163-5.597-.163-5.597-.163h-.006s-3.36 0-5.597.163c-.312.037-.994.04-1.603.678-.481.484-.635 1.587-.635 1.587S8 14.097 8 15.39v1.213c0 1.294.16 2.59.16 2.59s.156 1.104.634 1.588c.61.638 1.41.616 1.765.685 1.282.122 5.441.16 5.441.16s3.363-.007 5.6-.166c.313-.038.994-.041 1.603-.679.481-.484.638-1.587.638-1.587S24 17.9 24 16.604V15.39c0-1.294-.16-2.59-.16-2.59m-9.493 5.275v-4.497l4.322 2.257z']],
]

export default function Footer() {
  // content-shared.md §1/§2. `plain` = the page-level inline CTA ("Turn customer feedback…") + footer.
  // `default` = footer only here; pages that show the final CTA render <FinalCta /> at the end of their <main>
  // (as Home does). Light pages get the light footer (`site-footer--light`).
  // `cta-band` (marketing-shared.md §6 variant B, solutions) = 560px CTA band inside <footer>, above the links.
  // `plain-light` = `default` (light styling comes from `theme`). `none` renders nothing.
  const { theme, footer, footerCta } = useChrome()
  if (footer === 'none') return null
  const light = theme === 'light'
  const plain = footer === 'plain'
  return (
    <>
    {plain && <InlineCta theme={theme} />}
    <footer className={light ? 'site-footer site-footer--light' : 'site-footer'}>
      {footer === 'cta-band' && (
        <div className="footer-band">
          <div className="mk-slicegrid footer-band__grid">
            <div className="footer-band__col">
              <h2 className="footer-band__heading">{footerCta}</h2>
              <div className="footer-band__ctas">
                <a className="mk-btn mk-btn--primary" href="/request-a-demo/">Book a demo</a>
                <a className="mk-btn mk-btn--secondary footer-band__glass" href="/auth/signup/" target="_blank" rel="noreferrer">
                  Try Dovetail free
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container footer-inner">
        <div className="footer-grid">
          {COLUMNS.map((col) => (
            <div key={col.key} className={`footer-col footer-col-${col.key}`}>
              {col.groups.map((g) => (
                <div key={g.heading} className="footer-group">
                  <p className="footer-heading">{g.heading}</p>
                  <ul className="footer-list">
                    {g.links.map(([label, badge]) => (
                      <li key={label} className="footer-item">
                        <SiteLink to={HREFS[label]} className="footer-link"><span className="footer-link-label">{label}</span></SiteLink>
                        {badge && <span className="footer-badge mono-12">{badge}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          <div className="footer-cta-stack">
            <a href={HREFS['Log in']} className="btn footer-login">Log in</a>
            <Link to="/request-a-demo/" className="btn footer-demo">Book a demo</Link>
          </div>
        </div>

        <div className="footer-bottom mono-12">
          <div className="footer-meta">© 2026 Dovetail Research Pty. Ltd.</div>
          <div className="footer-legal">
            <button type="button" className="footer-meta-link">COOKIE PREFERENCES</button>
            <Link to="/legal/" className="footer-meta-link">Legal &amp; Privacy</Link>
          </div>
          <div className="footer-social">
            <div className="footer-meta">FOLLOW US</div>
            <div className="footer-social-links">
              {SOCIALS.map(([name, href, paths]) => (
                <a key={name} href={href} aria-label={name} className="footer-social-link" target="_blank" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" aria-hidden="true">
                    <rect width="31" height="31" x="0.5" y="0.5" stroke="#FFF" strokeOpacity="0.16" rx="7.5" />
                    {paths.map((d) => <path key={d.slice(0, 12)} fill="#FFF" d={d} />)}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
    {/* Mount point for content rendered after the footer (guide hub "All … articles" index). */}
    {plain && <div id="after-footer-slot" />}
    </>
  )
}
