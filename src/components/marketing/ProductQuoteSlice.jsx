import { useRef } from 'react'
import GridImageBackground from './GridImageBackground.jsx'
import ProgressTabs from './ProgressTabs.jsx'
import useTabGroup from './useTabGroup.js'
import { readTestimonials } from './testimonials.js'
import '../../styles/marketing/base.css'
import '../../styles/marketing/product-quote.css'

// ProductQuoteSlice (product.md §8, `e1cnxsk6*`). `data` = the {"slice":"ProductQuote"} section.
// Several tabs → useTabGroup(0,60): 6s per testimonial; quote + author fade in (400ms) on each change.
export default function ProductQuoteSlice({ data }) {
  const content = data?.content || []
  const rootRef = useRef(null)
  const bg = content.find((c) => c.el === 'e1ms7w8v3')
  const { list, tabs } = readTestimonials(content, {
    photoEl: 'e1cnxsk65', quoteEl: 'e1cnxsk66', logoEl: 'e1cnxsk68', nameEl: 'e1cnxsk611', titleEl: 'e1cnxsk612',
  })
  const { index, progress, select } = useTabGroup(list.length, 60, rootRef)
  const t = list[index] || list[0]

  return (
    <div className="mk-pquote" ref={rootRef}>
      <div className="mk-container">
        <GridImageBackground data={bg} hideImageAtSm>
          <div className="mk-pquote__content">
            <div className="mk-pquote__quote" key={`q${index}`}>
              {t.photo && <img className="mk-pquote__photo" src={t.photo} alt="" width={80} height={80} />}
              <blockquote className="mk-pquote__text">{t.quote}</blockquote>
            </div>
            <div className="mk-pquote__footer">
              <div className="mk-pquote__author" key={`a${index}`}>
                {t.logo && <img className="mk-pquote__logo" src={t.logo.src} alt={t.logo.alt || ''} />}
                <div className="mk-pquote__divider" />
                <div className="mk-pquote__who">
                  <p className="mk-pquote__name">{t.name}</p>
                  <p className="mk-pquote__title">{t.title}</p>
                </div>
              </div>
              {tabs.length > 1 && (
                <ProgressTabs className="mk-pquote__tabs" labels={tabs} index={index} progress={progress} onSelect={select} />
              )}
            </div>
          </div>
        </GridImageBackground>
      </div>
    </div>
  )
}
