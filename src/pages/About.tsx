import { Link } from 'react-router'
import { ArrowRight, Eye, Heart, Mail, Zap } from 'lucide-react'
import logo from '../assets/logo.svg'
import { usePageMeta } from '../lib/useTitle'

const PRINCIPLES = [
  {
    icon: Zap,
    title: 'No busywork',
    text: 'Resizing one icon into dozens of files by hand is exactly the kind of task a tool should absorb. One upload, one download, done.',
  },
  {
    icon: Eye,
    title: 'Private by design',
    text: 'Generation runs entirely in your browser. Your artwork never leaves your device, and there is no account to create.',
  },
  {
    icon: Heart,
    title: 'Free, for everyone',
    text: 'DrAppIcon is free to use, with no watermarks and no locked sizes. If it saves you time, sharing it is the best support.',
  },
]

const FACTS = [
  { n: '18+', l: 'Icon sizes in every set' },
  { n: '2', l: 'Platforms — iOS & Android' },
  { n: '0', l: 'Images uploaded or stored' },
  { n: '100%', l: 'Free, no watermarks' },
]

export default function About() {
  usePageMeta('About · DrAppIcon', 'About DrAppIcon: a free, private, browser-based app icon generator by Dusrel — one image becomes the complete iOS and Android icon set, with nothing uploaded.')
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <img src={logo} alt="DrAppIcon logo" className="mx-auto h-20 w-20" />
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink dark:text-white">
          About DrAppIcon
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[17px] leading-relaxed text-slate-500 dark:text-slate-400">
          A small, careful tool that turns one image into the complete app icon
          set your iOS and Android projects need.
        </p>
      </div>

      <div className="mt-10 space-y-4 text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
        <p>
          Every app ships with the same quiet chore: one piece of artwork has to
          become dozens of correctly sized, correctly named icon files before a
          store will even look at it. DrAppIcon exists to make that chore
          disappear — drop in your artwork, adjust the background, size, badge or
          monochrome layer with a live preview on real device frames, and
          download a single ZIP that drops straight into Xcode or Android Studio.
        </p>
        <p>
          DrAppIcon is built and maintained by <strong className="text-ink dark:text-white">Dusrel</strong>,
          an independent one-person studio. It is part of a family of small,
          single-purpose tools made to be fast, honest and pleasant to use.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <div
            key={p.title}
            className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10"
          >
            <p.icon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
            <h2 className="mt-3 font-bold text-ink dark:text-white">{p.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {p.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {FACTS.map((f) => (
          <div key={f.l} className="text-center">
            <p className="text-4xl font-extrabold text-primary-600 dark:text-primary-400">{f.n}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{f.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10">
        <Mail className="mx-auto h-6 w-6 text-primary-600 dark:text-primary-300" />
        <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink dark:text-white">
          Say hello
        </h2>
        <p className="mx-auto mt-2 max-w-md text-slate-500 dark:text-slate-400">
          Questions, ideas or a bug to report — write to{' '}
          <a
            href="mailto:support@drappicon.dusrel.com"
            className="font-semibold text-primary-600 hover:underline dark:text-primary-300"
          >
            support@drappicon.dusrel.com
          </a>{' '}
          or visit the support page.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/#editor"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700"
          >
            Open the Generator <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/support-us"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-night-700 dark:text-slate-200 dark:hover:bg-night-600"
          >
            Support DrAppIcon
          </Link>
        </div>
      </div>
    </main>
  )
}
