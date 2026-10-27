// Wireframe globe projection for §7 "Make your software self improving" (CLONE_SPEC.md §7 motion).
// Group coordinates: sphere centre (360,360), radius 360, drawn inside translate(56 60).

export const LATITUDES = [-60, -45, -30, -15, 0, 15, 30, 45, 60, 75]
const LONGITUDE_COUNT = 18
const LONGITUDE_SAMPLES = 49 // over -90..90° latitude
const LATITUDE_SAMPLES = 97 // over 0..360° longitude
const NODE_COUNT = 22
const TILT = (28.3 * Math.PI) / 180
const DEG = Math.PI / 180

function project(lat, lon) {
  const a = Math.cos(lat) * Math.cos(lon)
  const n = Math.sin(lat)
  const i = Math.cos(lat) * Math.sin(lon)
  const r = n * Math.cos(TILT) - i * Math.sin(TILT)
  const depth = n * Math.sin(TILT) + i * Math.cos(TILT)
  return { x: 360 + 360 * a, y: 360 - 360 * r, depth }
}

// Only front-hemisphere points (depth > 0) are drawn; hidden runs break the path into subpaths.
function toPath(points) {
  let d = ''
  let pen = false
  for (const p of points) {
    if (p.depth > 0) {
      d += `${pen ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`
      pen = true
    } else {
      pen = false
    }
  }
  return d
}

export function latitudePaths() {
  return LATITUDES.map((latDeg) => {
    const lat = latDeg * DEG
    const pts = []
    for (let j = 0; j < LATITUDE_SAMPLES; j++) pts.push(project(lat, (j / (LATITUDE_SAMPLES - 1)) * 2 * Math.PI))
    return toPath(pts)
  })
}

export function longitudePaths(offset) {
  const out = []
  for (let k = 0; k < LONGITUDE_COUNT; k++) {
    const lon = (k / LONGITUDE_COUNT) * 2 * Math.PI + offset
    const pts = []
    for (let j = 0; j < LONGITUDE_SAMPLES; j++) pts.push(project((-90 + (180 * j) / (LONGITUDE_SAMPLES - 1)) * DEG, lon))
    out.push(toPath(pts))
  }
  return out
}

export function nodes(offset) {
  const out = []
  for (let t = 0; t < NODE_COUNT; t++) {
    const lat = LATITUDES[(7 * t) % 10] * DEG
    const lon = (((5 * t) % 18) / 18) * 2 * Math.PI + offset
    const p = project(lat, lon)
    out.push({ x: p.x, y: p.y, opacity: Math.min(1, Math.max(0, 5 * p.depth)) })
  }
  return out
}

// Scroll progress → angle in degrees (spec §7 motion).
const clamp01 = (x) => Math.min(1, Math.max(0, x))
export function trackAngle(rect, vh) {
  if (rect.top > 0) return -75 * (1 - clamp01(1 - rect.top / vh))
  if (rect.bottom > vh) return 180 * clamp01(-rect.top / (rect.height - vh))
  return 180 + 75 * clamp01(1 - rect.bottom / vh)
}

export const STEP_ANGLES = [0, 45, 90, 135, 180]
// Original: STEP_ANGLES.reduce((acc, a, i) => (p >= a - .01 ? i : acc), 0) - step 1 is already shown
// while the dot approaches 0deg (p < 0).
export function activeStepFor(p) {
  let idx = 0
  STEP_ANGLES.forEach((a, i) => { if (p >= a - 0.01) idx = i })
  return idx
}

export function ringPoint(deg) {
  const r = deg * DEG
  return { x: 420 + 420 * Math.sin(r), y: 420 - 420 * Math.cos(r) }
}
