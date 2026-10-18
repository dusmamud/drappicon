import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Legal from './pages/Legal'
import Support from './pages/Support'
import { COOKIE_MD, DPA_MD, PRIVACY_MD, TERMS_MD } from './content/legal'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Sub-pages share the slim header + dark footer; the home page leads with its own brand hero.
function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<SiteLayout />}>
          <Route path="/support-us" element={<Support />} />
          <Route path="/privacy-policy" element={<Legal markdown={PRIVACY_MD} />} />
          <Route path="/terms-of-service" element={<Legal markdown={TERMS_MD} />} />
          <Route path="/cookie-policy" element={<Legal markdown={COOKIE_MD} />} />
          <Route path="/dpa" element={<Legal markdown={DPA_MD} />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
