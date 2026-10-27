// Event dates (company-shared.md S14), formatted in the viewer's timezone with Intl.
//   formatEventDate(iso)      → '25 Jun 2026'            (date-fns 'dd LLL yyyy')
//   formatEventTime(iso)      → '12:00AM'                ('h:mma')
//   formatEventZone(iso)      → 'PDT' / 'GMT+5:30'       ('zzz')
//   formatEventDateTime(iso)  → '25 Jun 2026 12:00AM PDT' (sidebar [START]/[END])
//   isUpcoming(iso, now?)     → startDate >= now
const pick = (parts, type) => parts.find((p) => p.type === type)?.value || ''

export function formatEventDate(iso) {
  const parts = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).formatToParts(new Date(iso))
  return `${pick(parts, 'day')} ${pick(parts, 'month').slice(0, 3)} ${pick(parts, 'year')}`
}

export function formatEventTime(iso) {
  const parts = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).formatToParts(new Date(iso))
  return `${pick(parts, 'hour')}:${pick(parts, 'minute')}${pick(parts, 'dayPeriod').toUpperCase()}`
}

export function formatEventZone(iso) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(new Date(iso))
  return pick(parts, 'timeZoneName')
}

export function formatEventDateTime(iso) {
  return `${formatEventDate(iso)} ${formatEventTime(iso)} ${formatEventZone(iso)}`
}

export function isUpcoming(iso, now = Date.now()) {
  return new Date(iso).getTime() >= now
}
