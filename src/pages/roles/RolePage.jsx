import { usePageChrome } from '../../chrome.jsx'
import FaqSlice from '../../components/marketing/FaqSlice.jsx'
import TestimonialSlice from '../../components/marketing/TestimonialSlice.jsx'
import { Spacer, usePageTitle } from './common.jsx'
import {
  Challenge, HelpsCards, HelpsHeader, Integrations, Prioritization, QuizPromo, RoleHero, StoryCards, UseCaseTabs,
} from './RoleSections.jsx'
import '../../styles/roles/roles.css'

// specs/roles.md — one component for all six /roles/<role>/ pages; section order comes from the data file.
export default function RolePage({ data }) {
  usePageChrome({ navOverlay: true, navSpacer: false, footer: 'default' })
  usePageTitle(data.title)
  let helpsSeen = 0
  return (
    <main className="roles-page">
      {data.sections.map((s, i) => {
        const key = `${s.slice}-${i}`
        switch (s.slice) {
          case 'Spacer': return <Spacer key={key} height={s.height} />
          case 'RoleHero': return <RoleHero key={key} section={s} />
          case 'Challenge': return <Challenge key={key} section={s} seed={i} />
          case 'HowDovetailHelps':
            helpsSeen += 1
            return helpsSeen === 1
              ? <HelpsHeader key={key} section={s} />
              : <HelpsCards key={key} section={s} seed={i} />
          case 'Prioritization': return <Prioritization key={key} section={s} seed={i} />
          case 'Integrations': return <Integrations key={key} section={s} seed={i} />
          case 'UseCaseTabs': return <UseCaseTabs key={key} section={s} seed={i} />
          case 'TestimonialSlice': return <TestimonialSlice key={key} data={s} />
          case 'CustomerStoryCards': return <StoryCards key={key} section={s} />
          case 'QuizPromo': return <QuizPromo key={key} section={s} />
          case 'FAQ': return <FaqSlice key={key} data={s} />
          default: return null
        }
      })}
    </main>
  )
}
