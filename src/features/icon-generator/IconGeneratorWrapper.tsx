import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import DesktopGenerator from './DesktopGenerator'
import MobileGenerator from './MobileGenerator'
import { useGenerator } from './useGenerator'
import mascotGif from '../../assets/mascot.gif'

export default function IconGeneratorWrapper() {
  const api = useGenerator()
  const { state, actions } = api

  // Drag & drop anywhere on the page feeds the foreground dropzone.
  const onDragOver = (e: React.DragEvent) => e.preventDefault()
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) void actions.handleForeground(file)
  }

  return (
    <section id="editor" className="relative" onDragOver={onDragOver} onDrop={onDrop}>
      <div className="block lg:hidden">
        <MobileGenerator api={api} />
      </div>
      <div className="hidden lg:block">
        <DesktopGenerator api={api} />
      </div>

      <AnimatePresence>
        {state.showThankYou && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-[2px]"
              onClick={() => actions.setShowThankYou(false)}
            />
            <div className="pointer-events-none fixed inset-0 z-[61] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                className="pointer-events-auto w-full max-w-md overflow-hidden rounded-2xl bg-white text-center shadow-2xl dark:bg-night-800"
              >
                <div className="relative px-6 pt-7">
                  <button
                    type="button"
                    onClick={() => actions.setShowThankYou(false)}
                    className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-slate-200"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <img
                    src={mascotGif}
                    alt="DrAppIcon mascot"
                    className="mx-auto h-40 w-40 object-contain"
                  />
                  <h2 className="mt-4 text-[26px] font-extrabold leading-snug text-ink dark:text-white">
                    Thank you for using our services!
                  </h2>
                  <p className="mt-1.5 text-[15px] text-slate-500 dark:text-slate-400">Downloading your icons now.</p>
                </div>
                <div className="mx-6 mt-6 border-t border-slate-100 dark:border-white/10" />
                <p className="px-8 pt-5 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
                  If DrAppIcon saved you some time, sharing it with a fellow developer
                  keeps it free for everyone who finds it next.
                </p>
                <div className="mt-5 bg-slate-50 px-6 py-5 dark:bg-white/5">
                  <div className="mt-3 flex gap-2.5">
                    <button
                      type="button"
                      onClick={actions.reset}
                      className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:bg-night-700 dark:text-slate-200 dark:hover:bg-night-600"
                    >
                      Start Over
                    </button>
                    <Link
                      to="/support-us"
                      onClick={() => actions.setShowThankYou(false)}
                      className="flex-1 rounded-xl bg-primary-600 py-3 text-sm font-bold text-white transition hover:bg-primary-700"
                    >
                      Give us some help
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
