import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Code2, Settings2, X } from 'lucide-react'
import { ControlsBody, DropzoneBox } from './Controls'
import PreviewStage from './PreviewStage'
import type { GeneratorApi } from './useGenerator'

export default function MobileGenerator({ api }: { api: GeneratorApi }) {
  const { state, actions } = api
  const [sheetOpen, setSheetOpen] = useState(false)
  const [apiPillVisible, setApiPillVisible] = useState(true)
  const lastUrl = useRef<string | null>(null)

  // Auto-open the Customize sheet shortly after a fresh upload (matches reference UX).
  useEffect(() => {
    if (state.foregroundUrl && state.foregroundUrl !== lastUrl.current) {
      lastUrl.current = state.foregroundUrl
      const t = setTimeout(() => setSheetOpen(true), 800)
      return () => clearTimeout(t)
    }
  }, [state.foregroundUrl])

  // API pill is zone-scoped: hide it once the user scrolls past the generator area.
  useEffect(() => {
    const onScroll = () => setApiPillVisible(window.scrollY < window.innerHeight * 1.15)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToApi = () => document.getElementById('api')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="mx-auto w-full max-w-xl px-4">
      {!state.foregroundUrl ? (
        <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-slate-100">
          <h2 className="text-center text-xl font-extrabold text-slate-900">Ready to Create?</h2>
          <p className="mb-4 mt-1 text-center text-sm text-slate-500">
            Tap to upload an image and see live previews for iOS and Android
          </p>
          <DropzoneBox
            onFile={actions.handleForeground}
            url={null}
            label="Tap to upload an image"
          />
          {state.error && (
            <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {state.error}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-slate-100">
            <h3 className="mb-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              Live Preview
            </h3>
            <PreviewStage api={api} />
          </div>
          <button
            type="button"
            disabled={state.generating}
            onClick={() => void actions.generate()}
            className="w-full rounded-2xl bg-primary-600 py-4 text-base font-bold text-white shadow-lg shadow-primary-600/25 transition active:scale-[0.99] disabled:opacity-50"
          >
            {state.generating ? 'Generating…' : 'Download Icons'}
          </button>
          {state.error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {state.error}
            </p>
          )}
        </div>
      )}

      {/* Floating pills — stacked vertically so they never overlap (defect in the reference, fixed here). */}
      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5">
        <AnimatePresence>
          {apiPillVisible && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              type="button"
              onClick={scrollToApi}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-600 to-fuchsia-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg"
            >
              <Code2 className="h-4 w-4" /> Try our powerful API
            </motion.button>
          )}
        </AnimatePresence>
        {state.foregroundUrl && (
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-lg"
          >
            <Settings2 className="h-4 w-4" /> Customize
          </button>
        )}
      </div>

      {/* Customize bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-[2px]"
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-8 shadow-2xl nice-scroll"
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Customize Icon</h2>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="rounded-full bg-slate-100 p-1.5 text-slate-500"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ControlsBody api={api} onDone={() => setSheetOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
