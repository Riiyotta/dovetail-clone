import { useState } from 'react'
import PixelDissolve from './shared/PixelDissolve.jsx'
import CursorTooltip from './shared/CursorTooltip.jsx'
import tailwindConfig from '../../tailwind.config.js'
import '../styles/Stories.css'

// Pixel dissolve colour comes from the shared blue-80 token (§0.3).
const DISSOLVE_COLOR = tailwindConfig.theme.extend.colors.blue[80]

// CLONE_SPEC.md §9. Quotes are neutral placeholders matching the recorded character counts
// (215 / 192 / 171 / 219 / 209 / 214).
const STORIES = [
  {
    href: '/customers/itau-unibanco/',
    thumb: '/assets/Customer_Itau.png',
    logo: '/assets/home-story-itau-mark.svg',
    logoAlt: 'Itaú Unibanco',
    title: 'How Itaú Unibanco delivers better banking experiences with Dovetail',
    quote:
      'Placeholder testimonial text for this customer story. It describes, in neutral terms, how a team gathered feedback, shared findings across the business and used them to shape fit decisions for the people they serve.',
    name: 'Renato Cerqueira Leite',
    role: 'Head of research Operations, Itaú Unibanco',
  },
  {
    href: '/customers/atlassian-design/',
    thumb: '/assets/Customer_Atlassian.png',
    logo: '/assets/home-story-atlassian-mark.svg',
    logoAlt: 'Atlassian',
    title: 'How Atlassian turns customer signals into confident product decisions',
    quote:
      'Placeholder testimonial text for this customer story. It explains, in neutral terms, how a design team brought many scattered signals together and turned them into clear and confident choices.',
    name: 'Martin Jerkovic',
    role: 'Lead Product Designer, Atlassian',
  },
  {
    href: '/customers/canva-ai/',
    thumb: '/assets/Customer_Canva_AI.png',
    logo: '/assets/white-logo(2).svg',
    logoAlt: 'Canva',
    title: 'Dovetail helps Canva turn millions of design moments into product decisions',
    quote:
      'Placeholder testimonial text for this customer story. It recounts, in neutral terms, how the researchers kept pace with a fast growing product and shared all they learned.',
    name: 'Craig Boustred',
    role: 'Design Researcher, Canva',
  },
  {
    href: '/customers/breville/',
    thumb: '/assets/Customer_Breville.png',
    logo: '/assets/white-logo(3).svg',
    logoAlt: 'Breville',
    title: 'How customer insights drive and inspire Breville’s product innovation',
    quote:
      'Placeholder testimonial text for this customer story. It outlines, in neutral terms, how a product team captured insights from many sources and used them to guide all new ideas from early concepts through to launch day.',
    name: 'Constance Docos',
    role: 'Senior UX Designer, Breville',
  },
  {
    href: '/customers/cnh/',
    thumb: '/assets/Customer_CNHIndustrial.png',
    logo: '/assets/white-logo(4).svg',
    logoAlt: 'CNH',
    title: 'How CNH builds better agricultural machinery, 50% faster with Dovetail',
    quote:
      'Placeholder testimonial text for this customer story. It covers, in neutral terms, how one specialist group collected field feedback quickly and used it to plan improvements for each season well ahead of time.',
    name: 'Matthew Klopfenstein',
    role: 'Portfolio Management–Cash Crop Segment Specialist, CNH',
  },
  {
    href: '/customers/smartrecruiters/',
    thumb: '/assets/Customer_SmartRecruiter.png',
    logo: '/assets/white-logo(5).svg',
    logoAlt: 'SmartRecruiters',
    title: 'Unlocking the AI edge for hiring the best talent with SmartRecruiters and Dovetail',
    quote:
      'Placeholder testimonial text for this customer story. It summarises, in neutral terms, how a design team organised its research across many products and gave every stakeholder an easy way to find the right answers.',
    name: 'Danielle Reid',
    role: 'Senior Design Manager, SmartRecruiters',
  },
]

// As on the original, each card owns its hover state and its own portal tooltip, so moving between cards
// fades the old tooltip out in place while the new one appears on the first mousemove.
function StoryCard({ story, duplicate }) {
  const [active, setActive] = useState(false)
  const dupProps = duplicate ? { 'aria-hidden': 'true', inert: '' } : {}
  return (
    <a href="#" className="story-card" {...dupProps}>
      <div className="story-thumb" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
        <img className="story-thumb-img" src={story.thumb} alt="" />
        <div className="story-thumb-dim" />
        <div className="story-thumb-logo">
          <img src={story.logo} alt={story.logoAlt} />
        </div>
        <PixelDissolve active={active} color={DISSOLVE_COLOR} />
        <div className="story-overlay" data-active={active ? 'true' : 'false'}>
          <p className="story-overlay-quote">{story.quote}</p>
          <div>
            <p className="story-overlay-name">{story.name}</p>
            <p className="story-overlay-role">{story.role}</p>
          </div>
        </div>
      </div>
      <p className="story-title">{story.title}</p>
      <CursorTooltip active={active} label="Read customer story" />
    </a>
  )
}

export default function Stories() {
  const sets = [false, true]

  return (
    <section className="stories bg-bg">
      <div className="container stories-inner">
        <div className="stories-head">
          <h2 className="stories-h2 text-text-strong">In their words, not ours</h2>
          <a href="#" className="btn btn-light">See all stories</a>
        </div>
        <div className="stories-viewport">
          <div className="stories-track">
            {sets.map((duplicate) =>
              STORIES.map((story, i) => (
                <StoryCard key={`${duplicate ? 'b' : 'a'}-${i}`} story={story} duplicate={duplicate} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
