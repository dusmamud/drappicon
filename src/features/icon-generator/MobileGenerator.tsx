import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Download, Loader2, Settings, X } from 'lucide-react'
import Panel from './Panel'
import Stage from './Stage'
import type { GeneratorApi } from './useGenerator'

export default function MobileGenerator({ api }: { api: GeneratorApi }) {
  const { state, actions } = api
  const [sheetOpen, setSheetOpen] = useState(false)
  const [pastApi, setPastApi] = useState(false)
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
      if (el) setPastApi(el.getBoundingClientRect().top < window.innerHeight * 0.4)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToApi = () => document.getElementById('api')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div data-mobile-root className="mx-auto w-full max-w-xl px-4">
      {/* Always-mounted picker for the empty-state stage (the sheet's dropzone only exists while the sheet is open). */}
      <input
        type="file"
        data-mobile-upload
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) void actions.handleForeground(f)
          e.target.value = ''
        }}
      />
      <Stage api={api} mobile />

      {state.error && (
        <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{state.error}</p>
      )}

      {/* Floating pills, stacked so they never collide. */}
      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5">
        {state.foregroundUrl && (
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2.5 text-[13px] font-bold text-white"
            style={{ boxShadow: '0 10px 25px -6px rgb(37 99 235 / 0.5)' }}
          >
            <Settings className="h-4 w-4" /> Customize
          </button>
        )}
        <button
          type="button"
          onClick={scrollToApi}
          className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-bold text-white shadow-pillwarm"
          style={{ background: 'linear-gradient(135deg,#f59e0b 0%,#f97316 40%,#ef4444 100%)' }}
        >
          Try our powerful API
          <ArrowDown className={`h-4 w-4 transition-transform ${pastApi ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Customize bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50">
          <div className="animate-fade-in absolute inset-0 bg-slate-900/50" onClick={() => setSheetOpen(false)} />
          <div className="animate-sheet-up nice-scroll absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
              <h2 className="text-xl font-bold text-ink">Customize Icon</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-5 py-5">
              <Panel api={api} variant="sheet" />
              <button
                type="button"
                disabled={state.generating}
                onClick={() => void actions.generate()}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 text-base font-bold text-white shadow-md transition active:scale-[0.99] disabled:opacity-60"
              >
                {state.generating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                {state.generating ? 'Generating…' : 'Download Icons'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
