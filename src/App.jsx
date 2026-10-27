import { useEffect } from 'react'
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom'
import Banner from './components/Banner.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { ChromeProvider } from './chrome.jsx'
import { routes } from './routes.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Routes() {
  return useRoutes(routes)
}

export default function App() {
  return (
    <BrowserRouter>
      <ChromeProvider>
        <ScrollToTop />
        <Banner />
        <Navbar />
        <Routes />
        <Footer />
      </ChromeProvider>
    </BrowserRouter>
  )
}
