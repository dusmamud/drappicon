import { useState } from 'react'
import {
  Apple,
  ArrowRight,
  BadgeCheck,
  Code2,
  Copy,
  Check,
  Download,
  FileArchive,
  FolderOpen,
  Gauge,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  Palette,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { AndroidBot } from '../icon-generator/PreviewBits'
import logo from '../../assets/logo.svg'

/* ---------------------------------- API ---------------------------------- */

const API_CODE = `const response = await fetch('https://api.drappicon.dusrel.com/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'YOUR_API_KEY'
  },
  body: JSON.stringify({
    uploadedImage: 'data:image/png;base64,YOUR_BASE64_IMAGE',
    showBadge: false,
    format: 'png',
    ...
  })
});

// Returns a ZIP with every iOS & Android icon size`

export function ApiPromotion() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(API_CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { /* clipboard unavailable */ }
  }
  const mini = [
    { icon: Apple, title: 'All iOS Sizes', text: 'Every size from 20×20 up to the 1024×1024 App Store icon.' },
    { icon: AndroidBot, title: 'All Android Sizes', text: 'Adaptive icons for every density, mdpi through xxxhdpi.' },
    { icon: BadgeCheck, title: 'Badge Support', text: 'Optional text badges baked into the generated set.' },
    { icon: ImageIcon, title: 'Multiple Formats', text: 'PNG or WebP output, packaged and ready to drop in.' },
  ]
  return (
    <section id="api" className="relative mt-16 overflow-hidden bg-[#0b1526] py-20">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2.5">
            <img src={logo} alt="" className="h-9 w-9 rounded-lg bg-white/95 p-0.5" />
            <span className="font-hand text-4xl font-bold text-white">DrAppIcon</span>
            <span className="rounded-md bg-orange-500 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">API</span>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-[44px]">
            Simple{' '}
            <span className="bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">
              Integration
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate-300">
            One REST call turns an image into a complete icon set. Post your artwork, get back a
            ZIP with every size your apps need.
          </p>
          <a
            href="mailto:support@drappicon.dusrel.com?subject=DrAppIcon%20API%20access"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-emerald-500 px-6 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-primary-900/40 transition hover:brightness-110"
          >
            Explore the API <ArrowRight className="h-4.5 w-4.5 h-[18px] w-[18px]" />
          </a>
        </div>

        <div className="mt-14 grid items-start gap-5 [&>*]:min-w-0 lg:grid-cols-2">
          <div className="grid gap-5 sm:grid-cols-2">
            {mini.map((m) => (
              <div key={m.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/30 to-emerald-500/20 text-primary-300">
                  <m.icon className="h-5.5 w-5.5 h-[22px] w-[22px]" />
                </span>
                <h3 className="mt-3.5 font-bold text-white">{m.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400 dark:text-slate-500">{m.text}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1b30] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-auto flex items-center gap-1.5 font-mono text-xs text-slate-400 dark:text-slate-500">
                <Code2 className="h-3.5 w-3.5" /> example.js
              </span>
              <button
                type="button"
                onClick={copy}
                className="ml-2 flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[11px] font-semibold text-slate-300 transition hover:bg-white/5"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="nice-scroll overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-emerald-300/90">{API_CODE}</pre>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- Features -------------------------------- */

export function Features() {
  const items = [
    { icon: Apple, chip: 'bg-purple-100 text-purple-600', title: 'iOS Ready', text: 'The complete AppIcon set — App Store, iPhone and iPad sizes, with a ready-made Contents.json.' },
    { icon: AndroidBot, chip: 'bg-blue-100 text-blue-600', title: 'Android Compatible', text: 'Adaptive icons done properly: foreground, background colour XML and the anydpi descriptors.' },
    { icon: Gauge, chip: 'bg-yellow-100 text-yellow-600', title: 'Lightning Fast', text: 'The whole set renders in seconds on your own machine — no queues, no uploads, no waiting.' },
    { icon: Palette, chip: 'bg-pink-100 text-pink-600', title: 'Easy Customization', text: 'Background colour is picked from your artwork automatically, then fine-tune size, badges and more.' },
    { icon: FileArchive, chip: 'bg-sky-100 text-sky-600', title: 'Multiple Formats', text: 'One tidy ZIP with everything inside, or PNG and WebP variants for Android — your choice.' },
    { icon: ShieldCheck, chip: 'bg-green-100 text-green-600', title: 'Privacy First', text: 'Generation happens entirely in your browser. Your artwork never leaves your device.' },
  ]
  const stats = [
    { n: '18+', l: 'Icon Sizes' },
    { n: '100%', l: 'Free to Use' },
    { n: '2', l: 'Platforms' },
    { n: '0', l: 'Data Collected' },
  ]
  return (
    <section id="features" className="bg-white py-20 dark:bg-night-900">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-[32px] font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
          Why Choose DrAppIcon?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[17px] leading-relaxed text-slate-500 dark:text-slate-400 dark:text-slate-500">
          Everything a developer needs to ship polished app icons, without the busywork.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-100 dark:border-white/5 bg-white p-6 shadow-card transition hover:-translate-y-0.5 dark:bg-night-800">
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.chip}`}>
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink dark:text-white">{f.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 dark:text-slate-500">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="text-4xl font-extrabold text-primary-600">{s.n}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Instructions ------------------------------ */

const IOS_SIZES: Array<[string, string, string]> = [
  ['App Store', 'App Store submission', '1024×1024'],
  ['iPhone @3x', 'iPhone home screen (3x)', '180×180'],
  ['iPhone @2x', 'iPhone home screen (2x)', '120×120'],
  ['iPad Pro', 'iPad Pro home screen', '167×167'],
  ['iPad @2x', 'iPad home screen (2x)', '152×152'],
  ['Spotlight @3x', 'Spotlight search (3x)', '120×120'],
  ['Settings @3x', 'Settings app (3x)', '87×87'],
]

const ANDROID_SIZES: Array<[string, string, string]> = [
  ['Play Store', 'Store listing icon', '512×512'],
  ['xxxhdpi', 'Adaptive foreground', '432×432'],
  ['xxhdpi', 'Adaptive foreground', '324×324'],
  ['xhdpi', 'Adaptive foreground', '216×216'],
  ['hdpi', 'Adaptive foreground', '162×162'],
  ['mdpi', 'Adaptive foreground', '108×108'],
  ['Legacy', 'ldpi → xxxhdpi round + square', '36→192'],
]

function StepsCard({ platform }: { platform: 'ios' | 'android' }) {
  const steps =
    platform === 'ios'
      ? [
          { t: 'Download & Extract', d: 'Download the generated ZIP file and extract the iOS folder.', code: 'ios/AppIcon.appiconset/' },
          { t: 'Open Xcode Project', d: 'Open your iOS project in Xcode and navigate to Assets.xcassets.' },
          { t: 'Replace AppIcon Set', d: 'Drag the AppIcon.appiconset folder into Assets.xcassets to replace the existing one.' },
          { t: 'Verify in Project Settings', d: 'Go to your target settings and ensure the App Icon Source is set correctly.', code: 'Target → General → App Icons and Launch Images' },
        ]
      : [
          { t: 'Download & Extract', d: 'Download the generated ZIP file and extract the Android folder.', code: 'android/mipmap-*/' },
          { t: 'Copy the mipmap Folders', d: 'Copy every mipmap folder into your project’s res/ directory, replacing the old ones.' },
          { t: 'Check the Manifest', d: 'Make sure android:icon and android:roundIcon point at your launcher name.', code: '@mipmap/ic_launcher · @mipmap/ic_launcher_round' },
          { t: 'Rebuild & Run', d: 'Rebuild the app and check the icon on a real launcher, light and dark themes included.' },
        ]
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card dark:bg-night-800 sm:p-7">
      <h3 className="flex items-center gap-2 text-lg font-bold text-ink dark:text-white">
        <FolderOpen className="h-5 w-5 text-primary-600" />
        {platform === 'ios' ? 'iOS Integration Steps' : 'Android Integration Steps'}
      </h3>
      <ol className="mt-6 space-y-6">
        {steps.map((s, i) => (
          <li key={s.t} className="flex gap-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-ink dark:text-white">{s.t}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400 dark:text-slate-500">{s.d}</p>
              {s.code && (
                <p className="mt-2 max-w-full overflow-x-auto whitespace-nowrap rounded-lg bg-slate-900 px-3.5 py-2.5 font-mono text-xs text-cyan-300 nice-scroll">
                  {s.code}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function SizesCard({ platform }: { platform: 'ios' | 'android' }) {
  const rows = platform === 'ios' ? IOS_SIZES : ANDROID_SIZES
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card dark:bg-night-800 sm:p-7">
      <h3 className="flex items-center gap-2 text-lg font-bold text-ink dark:text-white">
        <Code2 className="h-5 w-5 text-primary-600" />
        {platform === 'ios' ? 'iOS Icon Sizes' : 'Android Icon Sizes'}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {rows.map(([name, desc, size]) => (
          <li key={name} className="flex items-center justify-between gap-3 rounded-xl bg-primary-50/70 dark:bg-primary-500/10 px-4 py-3 ring-1 ring-primary-100/60">
            <span>
              <span className="block text-sm font-semibold text-ink dark:text-white">{name}</span>
              <span className="block text-xs text-slate-400 dark:text-slate-500">{desc}</span>
            </span>
            <span className="shrink-0 rounded-full bg-primary-600 px-3 py-1 font-mono text-xs font-semibold text-white">{size}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Instructions() {
  const [tab, setTab] = useState<'ios' | 'android'>('ios')
  const tips = [
    'Always check your icons on a real device — tiny sizes hide nothing.',
    'See how the icon reads on both light and dark wallpapers before shipping.',
    'Simple artwork wins at small sizes; fine detail disappears below 48 px.',
    'Follow the App Store and Google Play icon guidelines for review-safe results.',
  ]
  return (
    <section id="instructions" className="bg-slate-50/80 dark:bg-white/5 py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-[32px] font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
          How to Use Your Icons
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[17px] leading-relaxed text-slate-500 dark:text-slate-400 dark:text-slate-500">
          Step-by-step guides for adding your generated icons to iOS and Android projects.
        </p>
        <div className="mt-9 flex justify-center">
          <div className="flex rounded-xl bg-white p-1.5 shadow-card dark:bg-night-800">
            <button
              type="button"
              onClick={() => setTab('ios')}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${tab === 'ios' ? 'bg-primary-500 text-white shadow' : 'text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:text-slate-200'}`}
            >
              <Smartphone className="h-4 w-4" /> iOS Setup
            </button>
            <button
              type="button"
              onClick={() => setTab('android')}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${tab === 'android' ? 'bg-primary-500 text-white shadow' : 'text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:text-slate-200'}`}
            >
              <Smartphone className="h-4 w-4" /> Android Setup
            </button>
          </div>
        </div>
        <div className="mt-8 grid items-start gap-5 [&>*]:min-w-0 lg:grid-cols-2">
          <StepsCard platform={tab} />
          <SizesCard platform={tab} />
        </div>
        <div className="mt-6 rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-indigo-50 p-6 sm:p-7">
          <h3 className="flex items-center gap-2 font-bold text-primary-900">
            <Lightbulb className="h-5 w-5 text-amber-500" /> Pro Tips
          </h3>
          <ul className="mt-3 space-y-2">
            {tips.map((t) => (
              <li key={t} className="flex gap-2.5 text-[15px] text-primary-900/80">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-slate-400 dark:text-slate-500">
          <Download className="h-4 w-4" /> Every size listed here is included in the ZIP DrAppIcon generates.
          <Layers className="h-4 w-4" />
        </p>
      </div>
    </section>
  )
}
