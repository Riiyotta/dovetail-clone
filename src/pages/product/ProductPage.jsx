import { useEffect } from 'react'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import Spacer from '../../components/marketing/Spacer.jsx'
import FaqSlice from '../../components/marketing/FaqSlice.jsx'
import PixelTransitionSlice from '../../components/marketing/PixelTransitionSlice.jsx'
import CustomerStoriesSlice from '../../components/marketing/CustomerStoriesSlice.jsx'
import ProductQuoteSlice from '../../components/marketing/ProductQuoteSlice.jsx'
import ProductHero from './ProductHero.jsx'
import LogoMarqueeWrap from './LogoMarqueeWrap.jsx'
import ProductStatement from './ProductStatement.jsx'
import ProductScrollVideo from './ProductScrollVideo.jsx'
import ProductFeatures from './ProductFeatures.jsx'
import ProductPromptCards from './ProductPromptCards.jsx'
import ProductFor from './ProductFor.jsx'
import ProductCarousel from './ProductCarousel.jsx'
import Findings from './Findings.jsx'
import VoiceMode from './VoiceMode.jsx'
import '../../styles/marketing/base.css'
import '../../styles/marketing/product.css'

const files = import.meta.glob('../../data/marketing/product__*.json', { eager: true, import: 'default' })
const DATA = Object.fromEntries(
  Object.entries(files).map(([path, d]) => [path.match(/product__(.+)\.json$/)[1], d]),
)
export const PRODUCT_SLUGS = Object.keys(DATA)

// Per-page values the spec gives that aren't in the data files (product.md §4, §11).
const CONFIG = {
  'ai-agents': { videoId: 'UInpLwSAVzE', videoScale: 1.2 },
  'digital-twins': { videoId: 'llo7_0UC4v8', carouselHeading: 'h56' },
}

// Product template (specs/product.md) — one component for all 7 /product/* pages; the slice order comes
// from the data file, which matches the composition table in product.md §0.
export default function ProductPage({ slug }) {
  const data = DATA[slug]
  const cfg = CONFIG[slug] || {}
  const accent = data.chrome.navBackground

  usePageChrome({
    banner: data.chrome.alertBar ? 'accent' : 'none',
    accent: data.chrome.alertBar ? accent : null,
    navBg: accent,
    footer: 'default',
    navSpacer: false,
  })

  useEffect(() => { document.title = data.title }, [data.title])

  const sections = data.sections
  const bands = sections.map((s, i) => (s.slice === 'PixelBand' ? i : -1)).filter((i) => i >= 0)
  const [bottomBand, topBand] = bands

  const render = (s, key) => {
    switch (s.slice) {
      case 'Spacer': return <Spacer key={key} data={s} />
      case 'ProductHero': return <ProductHero key={key} data={s} />
      case 'LogoMarqueeWrap': return <LogoMarqueeWrap key={key} data={s} />
      case 'ProductStatement': return <ProductStatement key={key} data={s} />
      case 'ProductScrollVideo': return <ProductScrollVideo key={key} data={s} videoId={cfg.videoId} videoScale={cfg.videoScale} />
      case 'ProductFeatures': return <ProductFeatures key={key} data={s} />
      case 'ProductPromptCards': return <ProductPromptCards key={key} data={s} modals={data.promptModals} />
      case 'ProductFor': return <ProductFor key={key} data={s} />
      case 'ProductQuote':
        return s.el === 'eoxsi445'
          ? <div key={key} className="pd-dt-quote"><ProductQuoteSlice data={s} /></div>
          : <ProductQuoteSlice key={key} data={s} />
      case 'ProductCarousel': return <ProductCarousel key={key} data={s} headingPreset={cfg.carouselHeading} />
      case 'Findings': return <Findings key={key} data={s} />
      case 'VoiceMode': return <VoiceMode key={key} data={s} />
      case 'CustomerStories': return <CustomerStoriesSlice key={key} data={s} />
      case 'FAQ': return <FaqSlice key={key} data={s} />
      default: return null
    }
  }

  const out = []
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i]
    if (i + 1 === bottomBand) {
      // Pixel▼ wraps the section before the first band (carousel / findings).
      out.push(<PixelTransitionSlice key={i} data={sections[bottomBand]} position="bottom">{render(s, 'c')}</PixelTransitionSlice>)
      i = bottomBand
    } else if (i === topBand) {
      // Pixel▲ wraps [Spacer 160 + FAQ].
      let j = i + 1
      const inner = []
      while (j < sections.length) {
        inner.push(sections[j])
        j++
        if (sections[j - 1].slice === 'FAQ') break
      }
      out.push(
        <PixelTransitionSlice key={i} data={s} position="top">
          <div className="pd-faq-wrap">{inner.map((x, k) => render(x, k))}</div>
        </PixelTransitionSlice>,
      )
      i = j - 1
    } else {
      out.push(render(s, i))
    }
  }

  // Footer variant A: footer 'default' renders only the link grid, so the final CTA is rendered here.
  return (
    <>
      <main id="main-content" className="pd-page" data-slug={slug} style={{ '--pd-accent': accent }}>
        {out}
      </main>
      <FinalCta />
    </>
  )
}
