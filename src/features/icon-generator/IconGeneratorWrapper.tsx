import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import DesktopGenerator from './DesktopGenerator'
import MobileGenerator from './MobileGenerator'
import { useGenerator } from './useGenerator'
import mascotGif from '../../assets/mascot.gif'

export default function IconGeneratorWrapper() {
  const api = useGenerator()
  const { state, actions } = api
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeThankYou = () => actions.setShowThankYou(false)

  // Thank-you dialog behaviour (WAI-APG modal pattern): while it is open the
  // background is scroll-locked, Escape closes it, Tab stays inside it, and
  // focus starts on the dialog itself so screen readers announce it.
  useEffect(() => {
    if (!state.showThankYou) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeThankYou()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.showThankYou])

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
              onClick={closeThankYou}
            />
            <div className="pointer-events-none fixed inset-0 z-[61] flex items-center justify-center p-3 sm:p-6">
              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="thankyou-title"
                tabIndex={-1}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                className="pointer-events-auto relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl outline-none dark:bg-night-800"
              >
                <button
                  type="button"
                  onClick={closeThankYou}
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-slate-200"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid sm:grid-cols-[290px_1fr]">
                  {/* Brand / mascot column */}
                  <div className="relative flex items-center justify-center overflow-hidden bg-primary-50 px-6 py-8 dark:bg-night-700 sm:py-10">
                    <div className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full bg-primary-200/60 blur-2xl dark:bg-primary-500/20" />
                    <div className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-primary-300/40 blur-2xl dark:bg-primary-500/10" />
                    <img
                      src={mascotGif}
                      alt="DrAppIcon mascot"
                      className="relative h-36 w-36 object-contain sm:h-52 sm:w-52"
                    />
                  </div>

                  {/* Content column */}
                  <div className="px-6 py-7 text-center sm:px-9 sm:py-9 sm:text-left">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[13px] font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                      <Check className="h-3.5 w-3.5" />
                      Downloading your icons now.
                    </span>
                    <h2
                      id="thankyou-title"
                      className="mt-4 text-[28px] font-extrabold leading-tight text-ink dark:text-white sm:text-[32px]"
                    >
                      Thank you for using our services!
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
                      Your complete icon set is on its way to your downloads folder —
                      ready to drop straight into Xcode and Android Studio.
                    </p>
                    <div className="my-5 border-t border-slate-100 dark:border-white/10" />
                    <p className="text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
                      If DrAppIcon saved you some time, sharing it with a fellow developer
                      keeps it free for everyone who finds it next.
                    </p>
                  </div>
                </div>

                {/* Action footer */}
                <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 dark:border-white/10 dark:bg-white/5 sm:px-9">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={actions.reset}
                      className="rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:bg-night-700 dark:text-slate-200 dark:hover:bg-night-600"
                    >
                      Start Over
                    </button>
                    <Link
                      to="/support-us"
                      onClick={closeThankYou}
                      className="rounded-xl bg-primary-600 py-3 text-center text-sm font-bold text-white transition hover:bg-primary-700"
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
