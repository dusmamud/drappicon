import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/support-us" element={<Support />} />
            <Route path="/privacy-policy" element={<Legal markdown={PRIVACY_MD} />} />
            <Route path="/terms-of-service" element={<Legal markdown={TERMS_MD} />} />
            <Route path="/cookie-policy" element={<Legal markdown={COOKIE_MD} />} />
            <Route path="/dpa" element={<Legal markdown={DPA_MD} />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
