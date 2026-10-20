import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrandGradientDefs } from './features/icon-generator/PreviewBits'
import Home from './pages/Home'
import Legal from './pages/Legal'
import Support from './pages/Support'
import FeaturesPage from './pages/FeaturesPage'
import InstructionsPage from './pages/InstructionsPage'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
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
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-night-950">
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
      <BrandGradientDefs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<SiteLayout />}>
          <Route path="/support-us" element={<Support />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/instructions" element={<InstructionsPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<Legal markdown={PRIVACY_MD} title="Privacy Policy · DrAppIcon" description="DrAppIcon privacy policy: icon generation runs entirely in your browser, your images are never uploaded or stored, and no account is needed." />} />
          <Route path="/terms-of-service" element={<Legal markdown={TERMS_MD} title="Terms of Service · DrAppIcon" description="The terms for using DrAppIcon, the free browser-based iOS and Android app icon generator by Dusrel." />} />
          <Route path="/cookie-policy" element={<Legal markdown={COOKIE_MD} title="Cookie Policy · DrAppIcon" description="How DrAppIcon uses cookies and local storage — a theme preference only; no advertising or cross-site tracking cookies." />} />
          <Route path="/dpa" element={<Legal markdown={DPA_MD} title="Data Processing Addendum · DrAppIcon" description="DrAppIcon data processing addendum: because generation is fully client-side, DrAppIcon does not receive, store or process your images." />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
