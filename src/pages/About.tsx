import { Link } from 'react-router'
import { ArrowRight, Eye, Heart, Mail, Smartphone, User, Zap } from 'lucide-react'
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

const MAKES: Array<{ label: string; text: string }> = [
  {
    label: 'For iOS',
    text: 'The complete AppIcon.appiconset: 18 icon files covering notifications, settings, spotlight and the home screen for iPhone and iPad, the 1024×1024 App Store icon, and the Contents.json manifest that ties them together.',
  },
  {
    label: 'For Android',
    text: 'Legacy and round launcher icons at every density from ldpi to xxxhdpi, adaptive icon foregrounds with anydpi-v26 descriptors and a background colour resource, an optional monochrome layer for themed icons, and the 512×512 Play Store icon.',
  },
  {
    label: 'For the web',
    text: 'A matching 512×512 web icon rendered from the same artwork, ready for a web app manifest or a favicon set.',
  },
]

const AUDIENCE = [
  {
    icon: User,
    title: 'Indie developers',
    text: 'One person shipping an app should not lose an evening to icon exports. DrAppIcon turns the chore into a one-minute step.',
  },
  {
    icon: Smartphone,
    title: 'Cross-platform teams',
    text: 'Flutter, React Native and dual native projects need both platforms\u2019 sets from the same artwork — generated together, always in sync.',
  },
  {
    icon: Eye,
    title: 'Designers handing off',
    text: 'Deliver one master image and let the tool produce every size with correct names, instead of exporting dozens of files by hand.',
  },
]

const FACTS = [
  { n: '18+', l: 'Icon sizes in every set' },
  { n: '2', l: 'Platforms — iOS & Android' },
  { n: '0', l: 'Images uploaded or stored' },
  { n: '100%', l: 'Free, no watermarks' },
]

export default function About() {
  usePageMeta(
    'About · DrAppIcon',
    'About DrAppIcon in detail: what it makes for iOS, Android and the web, who it is for, the principles behind it, and who builds it — a free, private, browser-based app icon generator by Dusrel.',
  )
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
        <p>
          The tool is deliberately narrow. It does one job — app icons — and tries
          to do it completely: both stores, every density, the adaptive and
          themed-icon layers modern Android expects, and the manifests that make
          the files land in the right places without manual renaming. When a
          platform rule exists (a size, a file-name constraint, an alpha-channel
          requirement), DrAppIcon follows it quietly instead of leaving you a
          warning to fix.
        </p>
      </div>

      <h2 className="mt-14 text-center text-2xl font-extrabold tracking-tight text-ink dark:text-white">
        What DrAppIcon makes
      </h2>
      <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10">
        {MAKES.map((m, i) => (
          <div
            key={m.label}
            className={`flex flex-col gap-1 px-6 py-5 sm:flex-row sm:gap-6 ${
              i > 0 ? 'border-t border-slate-100 dark:border-white/5' : ''
            }`}
          >
            <span className="w-28 shrink-0 font-bold text-ink dark:text-white">{m.label}</span>
            <p className="text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
              {m.text}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-center text-2xl font-extrabold tracking-tight text-ink dark:text-white">
        Who it is for
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {AUDIENCE.map((a) => (
          <div
            key={a.title}
            className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10"
          >
            <a.icon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
            <h3 className="mt-3 font-bold text-ink dark:text-white">{a.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {a.text}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-center text-2xl font-extrabold tracking-tight text-ink dark:text-white">
        The principles
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <div
            key={p.title}
            className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10"
          >
            <p.icon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
            <h3 className="mt-3 font-bold text-ink dark:text-white">{p.title}</h3>
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
