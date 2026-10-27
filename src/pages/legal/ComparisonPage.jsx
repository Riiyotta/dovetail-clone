import { Fragment } from 'react'
import { usePageChrome } from '../../chrome.jsx'
import { Spacer, useLazyJson, useMetaTitle } from '../../components/legal/primitives.jsx'
import { LogoMarquee, AwardsMarquee } from '../../components/legal/Marquee.jsx'
import FeaturedTestimonial from '../../components/legal/FeaturedTestimonial.jsx'
import Faq from '../../components/legal/Faq.jsx'
import {
  Hero, HeroImage, Intro, TeiCard, ChooseGrid, CompareIntro, ComparisonTable, CustomerStory, Migrate, TrialCta,
} from '../../components/legal/ComparisonSlices.jsx'
import '../../styles/legal/comparison.css'

// specs/comparison.md — 16 × /dovetail-vs-{competitor}/. Renders data.sections[] in order.
const SLICES = {
  hero: Hero,
  heroImage: HeroImage,
  logoMarquee: LogoMarquee,
  intro: Intro,
  teiCard: TeiCard,
  testimonial: FeaturedTestimonial,
  chooseGrid: ChooseGrid,
  compareIntro: CompareIntro,
  comparisonTable: ComparisonTable,
  awardsMarquee: AwardsMarquee,
  customerStory: CustomerStory,
  migrate: Migrate,
  trialCta: TrialCta,
  faq: Faq,
}

// Spacer placed *before* each slice type (geometry table, desktop/≤1280/≤799).
const SPACER_BEFORE = {
  hero: '96-56',
  heroImage: '96-48',
  comparisonTable: '64-56',
  awardsMarquee: '96',
  trialCta: '200-96',
}
const DEFAULT_SPACER = '160-96'

const loaders = import.meta.glob('../../data/tools/dovetail-vs-*.json', { import: 'default' })

export default function ComparisonPage({ slug }) {
  // Dark theme, dark footer, no "The best never guess" final CTA (tools-shared §J).
  usePageChrome({ theme: 'dark', footer: 'default', navSpacer: false })
  const data = useLazyJson(loaders[`../../data/tools/${slug}.json`])
  useMetaTitle(data?.meta)
  if (!data) return <main className="cmp-page" />
  return (
    <main className="cmp-page">
      {data.sections.map((s, i) => {
        const Slice = SLICES[s.type]
        if (!Slice) return null
        return (
          <Fragment key={i}>
            <Spacer size={SPACER_BEFORE[s.type] || DEFAULT_SPACER} />
            <Slice data={s} seed={`${slug}-${i}`} />
          </Fragment>
        )
      })}
      <Spacer size="160-96" />
    </main>
  )
}
