import { useCallback, useEffect, useRef, useState } from 'react'

// Port of the original useTabGroup(start, stepMs): progress 0→100 in steps of 1 every stepMs, then the
// next index (wrapping). Auto-advance starts the first time `rootRef` enters the viewport; selecting a
// tab resets progress and stops auto-advance for good. Reduced motion: no auto-advance.
export default function useTabGroup(count, stepMs, rootRef) {
  const [state, setState] = useState({ index: 0, progress: 0 })
  const [running, setRunning] = useState(false)
  const stopped = useRef(false)

  useEffect(() => {
    const el = rootRef?.current
    if (!el || count < 2) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        if (!stopped.current) setRunning(true)
        io.disconnect()
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [rootRef, count])

  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => {
      setState((s) => (s.progress + 1 >= 100
        ? { index: (s.index + 1) % count, progress: 0 }
        : { index: s.index, progress: s.progress + 1 }))
    }, stepMs)
    return () => clearInterval(id)
  }, [running, stepMs, count])

  const select = useCallback((i) => {
    stopped.current = true
    setRunning(false)
    setState({ index: i, progress: 0 })
  }, [])

  return { ...state, select }
}
