import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Coffee, X } from 'lucide-react'
import DesktopGenerator from './DesktopGenerator'
import MobileGenerator from './MobileGenerator'
import { useGenerator } from './useGenerator'
import mascotGif from '../../assets/mascot.gif'

export default function IconGeneratorWrapper() {
  const api = useGenerator()
  const { state, actions } = api

  return (
    <section id="generator" className="relative">
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
                className="pointer-events-auto w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => actions.setShowThankYou(false)}
                  className="float-right rounded-full bg-slate-100 p-1.5 text-slate-500"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <img
                  src={mascotGif}
                  alt="DrAppIcon mascot"
                  className="mx-auto h-28 w-28 rounded-2xl object-cover"
                />
                <h2 className="mt-3 text-xl font-extrabold text-slate-900">
                  Thank you for using our services!
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Downloading your icons now. Enjoy!
                </p>
                <a
                  href="https://www.buymeacoffee.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-[#ffdd00] py-3 text-sm font-bold text-slate-900 shadow"
                >
                  <Coffee className="h-4 w-4" /> Buy me a coffee
                </a>
                <div className="mt-2.5 flex gap-2.5">
                  <button
                    type="button"
                    onClick={actions.reset}
                    className="flex-1 rounded-2xl bg-slate-900 py-3 text-sm font-bold text-white"
                  >
                    Start Over
                  </button>
                  <Link
                    to="/support-us"
                    onClick={() => actions.setShowThankYou(false)}
                    className="flex-1 rounded-2xl bg-primary-600 py-3 text-sm font-bold text-white"
                  >
                    Give us some help
                  </Link>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
