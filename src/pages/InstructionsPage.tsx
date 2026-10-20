import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Instructions } from '../features/home/Sections'
import { usePageMeta } from '../lib/useTitle'

export default function InstructionsPage() {
  usePageMeta('Instructions · DrAppIcon', 'How to add generated app icons to your iOS and Android projects: step-by-step Xcode and Android Studio guides with the full icon size tables for both platforms.')
  return (
    <main className="py-14">
      <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink dark:text-white">
          Instructions
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[17px] leading-relaxed text-slate-500 dark:text-slate-400">
          Step-by-step guides for adding your generated icons to iOS and Android
          projects, with every size the stores expect.
        </p>
      </div>
      <div className="mt-4">
        <Instructions bare />
      </div>
      <div className="mx-auto mt-16 w-full max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink dark:text-white">
            Haven't generated your icons yet?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-slate-500 dark:text-slate-400">
            One image in, a complete store-ready icon set out — it takes less
            than a minute.
          </p>
          <Link
            to="/#editor"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700"
          >
            Open the Generator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
