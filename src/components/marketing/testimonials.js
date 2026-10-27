import { placeholder } from './placeholder.js'

// Reads the testimonial recorded in a TestimonialSlice / ProductQuote section. Only the first testimonial's
// content is in the data files; the tab buttons ("01", "02", …) tell how many the original cycles through.
// Gap: the other testimonials' names/logos/photos aren't recorded, so extra tabs reuse the recorded author
// block with a fresh placeholder quote of the same length.
export function readTestimonials(content, { photoEl, quoteEl, logoEl, nameEl, titleEl }) {
  const photo = content.find((c) => c.el === photoEl)
  const quote = content.find((c) => c.el === quoteEl)
  const logo = (logoEl && content.find((c) => c.el === logoEl)) || content.find((c) => c.role === 'img' && c.el === 'img')
  const name = content.find((c) => c.el === nameEl)
  const title = content.find((c) => c.el === titleEl)
  const tabs = content.filter((c) => c.el === 'e5b4pau2').map((c) => c.text)
  const count = Math.max(1, tabs.length)
  const len = quote ? (quote.placeholder ? quote.chars : quote.text.length) : 0
  const quoteFor = (i) => {
    if (!quote) return ''
    if (i === 0 && !quote.placeholder) return /^[“"]/.test(quote.text) ? quote.text : `“${quote.text}”`
    return `“${placeholder(Math.max(1, len - 2), i)}”` // the curly quotes count toward the recorded length
  }
  const list = Array.from({ length: count }, (_, i) => ({
    photo: photo?.src || null,
    quote: quoteFor(i),
    logo: logo || null,
    name: name?.text || '',
    title: title?.text || '',
  }))
  return { list, tabs }
}
