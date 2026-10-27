import { Link, useNavigate } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import data from '../../data/marketing/menu.json'
import { MaskIcon } from '../../components/marketing/content.jsx'
import { useDocTitle } from './common.jsx'
import '../../styles/corporate/menu.css'

// specs/menu.md — /menu/: alert bar, own header (logo + Close), then the site footer link grid.
// Footer.jsx doesn't export its link grid, so the page relies on the chrome footer: 'default' is the
// link-grid-only variant under the settled chrome contract (marketing-shared §6 variant C).
export default function Menu() {
  usePageChrome({ nav: 'none', footer: 'default', navSpacer: false })
  useDocTitle(data.title)
  const navigate = useNavigate()
  const header = data.sections[0].content
  const logo = header.find((x) => x.role === 'svg')
  const close = header.find((x) => x.role === 'button')

  // Original: history.state === null (direct landing) → push '/', else history.back(). React Router always
  // writes {idx} into history.state, so idx 0 is the "direct landing" case here.
  const onClose = () => {
    if ((window.history.state?.idx ?? 0) > 0) navigate(-1)
    else navigate('/')
  }

  return (
    <main>
      <div className="mn-header">
        <Link to="/" className="mn-logo" aria-label="Dovetail home">
          <MaskIcon src={logo.src} className="mn-logo__mark" />
        </Link>
        <button type="button" className="mn-close" onClick={onClose}>{close.text}</button>
      </div>
    </main>
  )
}
