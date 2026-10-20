import { useState } from 'react'
import {
  Apple,
  Code2,
  Download,
  FileArchive,
  FolderOpen,
  Gauge,
  Layers,
  Lightbulb,
  Palette,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { AndroidBot } from '../icon-generator/PreviewBits'

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
    <section id="features" className="py-20">
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
          <li key={name} className="flex items-center justify-between gap-3 rounded-xl bg-primary-50/70 px-4 py-3 ring-1 ring-primary-100/60 dark:bg-white/5 dark:ring-white/10">
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
    <section id="instructions" className="py-20">
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
        <div className="mt-6 rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-indigo-50 p-6 dark:border-primary-500/25 dark:from-primary-500/10 dark:to-primary-500/5 sm:p-7">
          <h3 className="flex items-center gap-2 font-bold text-primary-900 dark:text-primary-200">
            <Lightbulb className="h-5 w-5 text-amber-500" /> Pro Tips
          </h3>
          <ul className="mt-3 space-y-2">
            {tips.map((t) => (
              <li key={t} className="flex gap-2.5 text-[15px] text-primary-900/80 dark:text-primary-100/80">
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
