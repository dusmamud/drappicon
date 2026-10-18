import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Download, Loader2, SlidersHorizontal, X } from 'lucide-react'
import Panel from './Panel'
import Stage from './Stage'
import type { GeneratorApi } from './useGenerator'

export default function MobileGenerator({ api }: { api: GeneratorApi }) {
  const { state, actions } = api
  const [sheetOpen, setSheetOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const lastUrl = useRef<string | null>(null)

  // Auto-open the Customize sheet shortly after a fresh upload.
  useEffect(() => {
    if (state.foregroundUrl && state.foregroundUrl !== lastUrl.current) {
      lastUrl.current = state.foregroundUrl
      const t = setTimeout(() => setSheetOpen(true), 800)
      return () => clearTimeout(t)
    }
  }, [state.foregroundUrl])

  // The API pill arrow flips once the API section has been scrolled past.
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('api')
      if (el) setPastHero(el.getBoundingClientRect().top < window.innerHeight * 0.4)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToApi = () => document.getElementById('api')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div data-panel-root className="mx-auto w-full max-w-xl px-4">
      <Stage api={api} compact />

      {state.foregroundUrl && (
        <button
          type="button"
          disabled={state.generating}
          onClick={() => void actions.generate()}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 text-base font-bold text-white shadow-md transition active:scale-[0.99] disabled:opacity-60"
        >
          {state.generating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
          {state.generating ? 'Generating…' : 'Download Icons'}
        </button>
      )}
      {state.error && (
        <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{state.error}</p>
      )}

      {/* Floating pills, stacked so they never collide. */}
      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5">
        {state.foregroundUrl && (
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2.5 text-[13px] font-bold text-white shadow-pillwarm shadow-primary-600/40"
            style={{ boxShadow: '0 10px 25px -6px rgb(37 99 235 / 0.5)' }}
          >
            <SlidersHorizontal className="h-4 w-4" /> Customize
          </button>
        )}
        <button
          type="button"
          onClick={scrollToApi}
          className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-bold text-white shadow-pillwarm"
          style={{ background: 'linear-gradient(135deg,#f59e0b 0%,#f97316 40%,#ef4444 100%)' }}
        >
          Try our powerful API
          <ArrowDown className={`h-4 w-4 transition-transform ${pastHero ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Customize bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50">
          <div className="animate-fade-in absolute inset-0 bg-slate-900/50" onClick={() => setSheetOpen(false)} />
          <div className="animate-sheet-up nice-scroll absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-slate-50 p-3 pb-6 shadow-2xl">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-300" />
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white p-1.5 text-slate-500 shadow"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <Panel api={api} />
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="mt-4 w-full rounded-xl bg-slate-900 py-3.5 text-[15px] font-bold text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
