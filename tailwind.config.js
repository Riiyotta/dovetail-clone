/** @type {import('tailwindcss').Config} */
// Tokens measured from the live site — see CLONE_SPEC.md §0.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      // max-width tiers used by the original (desktop-first)
      'xl-cap': { max: '1512px' },
      md: { max: '1280px' },
      'nav-collapse': { max: '1185px' },
      'loop-mobile': { max: '1023px' },
      sm: { max: '799px' },
      xs: { max: '588px' },
      desktop: { min: '1281px' },
      'short-desktop': { raw: '(min-width: 1281px) and (max-height: 800px)' },
      hover: { raw: '(hover: hover)' },
    },
    extend: {
      colors: {
        bg: '#0A0A0A',
        'text-strong': '#FAFAFA',
        'text-muted': 'rgba(255,255,255,0.64)',
        'text-dim': '#A7A7A7',
        'chat-grey': '#B1B1B1',
        blue: { DEFAULT: '#0044FF', 80: '#0238CE' },
        surface: { 1: '#121212', 2: '#191919', 3: '#1D1D1D', 4: '#272727' },
        'pill-hover': '#2C2C2C',
        line: '#3B3B3B',
        'globe-line': '#626262',
        'border-subtle': 'rgba(255,255,255,0.08)',
        'border-strong': 'rgba(255,255,255,0.24)',
        'pill-border': 'rgba(250,250,250,0.16)',
        'fill-08': 'rgba(255,255,255,0.08)',
        'banner-bg': 'rgba(255,255,255,0.16)',
        twin: { text: '#A65CFF', chip: '#5D00A1', glow: '#9601FF' },
        tile: { twins: '#9601FF', agents: '#5D00A1', channels: '#982500', docs: '#99004F', chat: '#0029A6', dash: '#154C14' },
        overlay: 'rgba(10,10,10,0.64)',
        'white-hover': '#CECECE',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Helvetica', 'Arial', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Consolas', 'Roboto', 'sans-serif'],
        serif: ['"PP Mondwest"', 'Georgia', 'serif'],
      },
      borderRadius: { DEFAULT: '8px', sm: '4px' },
      maxWidth: { container: '1512px' },
    },
  },
  plugins: [],
}
