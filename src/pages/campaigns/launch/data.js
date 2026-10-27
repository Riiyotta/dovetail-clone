import data from '../../../data/marketing/launch__suns-out.json'

// Accessors over src/data/marketing/launch__suns-out.json so all copy is read verbatim from the data file.
export const section = (slice) => data.sections.find((s) => s.slice === slice)
export const pick = (sec, el) => sec.content.filter((c) => c.el === el)
export const textOf = (sec, el, i = 0) => pick(sec, el)[i]?.text

// Spacers in DOM order; heights for >1280 / ≤1280 / ≤799 come from the 1440 / 1280 / 768 measurements.
export const spacers = data.sections.filter((s) => s.slice === 'Spacer').map((s) => s.height)
export const spacerStyle = (h) => ({ '--h': `${h['1440']}px`, '--h-md': `${h['1280']}px`, '--h-sm': `${h['768']}px` })

export default data
