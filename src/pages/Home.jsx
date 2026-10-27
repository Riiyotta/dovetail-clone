import Hero from '../components/Hero.jsx'
import ContextLayer from '../components/ContextLayer.jsx'
import RawData from '../components/RawData.jsx'
import Prompt from '../components/Prompt.jsx'
import SelfImproving from '../components/SelfImproving.jsx'
import Govern from '../components/Govern.jsx'
import Stories from '../components/Stories.jsx'
import FinalCta from '../components/FinalCta.jsx'
import TwinsModal from '../components/TwinsModal.jsx'
import { usePageChrome } from '../chrome.jsx'

export default function Home() {
  // Homepage: dark, default footer, no 88px spacer (the hero pulls up under the nav with margin-top:-88px).
  usePageChrome({ navSpacer: false })
  return (
    <>
      <main>
        <Hero />
        <ContextLayer />
        <RawData />
        <Prompt />
        <SelfImproving />
        <Govern />
        <Stories />
        <FinalCta />
      </main>
      <TwinsModal />
    </>
  )
}
