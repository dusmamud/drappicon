import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { reloadOnceForStaleChunk } from './lib/chunkRecovery'

// Self-hosted fonts (Fontsource): the WOFF2 files are bundled by Vite and
// served from our own origin — the browser makes zero requests to Google
// Fonts at runtime. Only the Latin subset and the weights the UI actually
// uses are imported (Inter 400–800, Caveat 600–700); each @font-face rule
// already carries font-display: swap and a unicode-range.
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/inter/latin-800.css'
import '@fontsource/caveat/latin-600.css'
import '@fontsource/caveat/latin-700.css'
import inter800Url from '@fontsource/inter/files/inter-latin-800-normal.woff2?url'

// Preload the one critical font file — the hero headline is weight 800, the
// largest above-the-fold text — so it is fetched with the document instead
// of being discovered late through the CSS. crossorigin is required for
// fonts even when self-hosted, or the browser fetches the file twice.
const fontPreload = document.createElement('link')
fontPreload.rel = 'preload'
fontPreload.as = 'font'
fontPreload.type = 'font/woff2'
fontPreload.crossOrigin = 'anonymous'
fontPreload.href = inter800Url
document.head.appendChild(fontPreload)

// Vite fires this when a lazy chunk fails to load — the classic symptom of a
// tab running a pre-deployment build whose chunk files no longer exist.
// Reload once (loop-guarded) so the user lands on the fresh build instead of
// a dead "Failed to fetch dynamically imported module" error.
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault()
  reloadOnceForStaleChunk()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
