import { createContext, useContext, useLayoutEffect, useState } from 'react'

// Per-page settings for the shared chrome (banner, nav, footer).
// Pages call usePageChrome({ ... }) once; anything omitted falls back to DEFAULT_CHROME.
export const DEFAULT_CHROME = {
  theme: 'dark',      // 'dark' | 'light' — light pages: guides, contributors
  // Footer links only; pages that show "The best never guess" render <FinalCta /> themselves.
  footer: 'default',  // 'default' | 'plain' (inline "Turn customer feedback…" CTA + footer) | 'plain-light' (= default)
                      // | 'cta-band' (solutions: 560px CTA band + footer) | 'none'
  footerCta: null,    // heading text for the 'cta-band' footer
  navSpacer: true,    // false on pages that skip the 88px spacer under the nav
  banner: 'default',  // 'default' | 'accent' (white 16% veil over `accent`) | 'none'
  bannerTheme: null,  // force the banner's look regardless of page theme: 'dark' | 'light-palette'
  nav: 'default',     // 'default' | 'none' (campaign pages render their own nav)
  navBg: null,        // solid nav background, e.g. product accent colour
  navButtons: true,   // false hides the Log in / Book a demo group (legal docs)
  accent: null,       // product accent colour used by banner: 'accent'
  palette: 'default', // 'default' | 'legal' (tools-shared §I light palette for banner + nav dropdowns)
  navOverlay: false,  // hero slides under the nav (roles, solutions); pages handle the -88px pull themselves
}

const ChromeContext = createContext({ chrome: DEFAULT_CHROME, setChrome: () => {} })

export function ChromeProvider({ children }) {
  const [chrome, setChrome] = useState(DEFAULT_CHROME)
  return <ChromeContext.Provider value={{ chrome, setChrome }}>{children}</ChromeContext.Provider>
}

export function useChrome() {
  return useContext(ChromeContext).chrome
}

export function usePageChrome(overrides = {}) {
  const { setChrome } = useContext(ChromeContext)
  const key = JSON.stringify(overrides)
  useLayoutEffect(() => {
    setChrome({ ...DEFAULT_CHROME, ...overrides })
    document.documentElement.dataset.theme = overrides.theme || DEFAULT_CHROME.theme
    return () => setChrome(DEFAULT_CHROME)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}
