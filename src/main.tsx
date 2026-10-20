import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { reloadOnceForStaleChunk } from './lib/chunkRecovery'

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
