import {
  Apple,
  Code2,
  Download,
  Gauge,
  Layers,
  MousePointerClick,
  Palette,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Upload,
} from 'lucide-react'

export function Hero() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-8 pt-10 text-center lg:pt-14">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700 ring-1 ring-primary-100">
        <Sparkles className="h-3.5 w-3.5" /> iOS + Adaptive Android Icon
      </span>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Generate your <span className="text-primary-600">app icon</span> easily.
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
        One image in — every size out. DrAppIcon builds your complete iOS and Android icon set in
        seconds, right in your browser.
      </p>
    </div>
  )
}

const API_CODE = `POST https://api.drappicon.dusrel.com/generate
Authorization: YOUR_API_KEY
Content-Type: application/json

{
  "image": "base64_encoded_image",
  "background_color": "#8b5cf6",
  "formats": ["png", "webp"]
}`

export function ApiPromotion() {
  return (
    <section id="api" className="mx-auto mt-16 w-full max-w-6xl scroll-mt-24 px-4">
      <div className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-soft sm:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-primary-200">
              <Code2 className="h-3.5 w-3.5" /> DEVELOPER API
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              Try our powerful API
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
              Generate complete icon sets from your own pipeline — CI, build scripts, or your app.
              Send one image, get back a ZIP with every platform size.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {[
                ['All sizes', 'iOS + Android, one call'],
                ['ZIP output', 'Ready to drop into a project'],
                ['Base64 in', 'No uploads to manage'],
                ['Fast', 'Generated in seconds'],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
                  <p className="font-bold">{t}</p>
                  <p className="text-xs text-slate-400">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <pre className="overflow-x-auto rounded-2xl bg-black/50 p-5 font-mono text-xs leading-relaxed text-emerald-300 ring-1 ring-white/10 nice-scroll">
            {API_CODE}
          </pre>
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  {
    icon: Apple,
    title: 'iOS Ready',
    text: 'Every required iPhone and iPad size, plus a ready-to-use Contents.json for Xcode.',
  },
  {
    icon: Smartphone,
    title: 'Android Compatible',
    text: 'Legacy and round icons for every density, adaptive foregrounds, and the anydpi XML.',
  },
  {
    icon: Gauge,
    title: 'Lightning Fast',
    text: 'Icons are rendered instantly on your own device — no queues, no waiting rooms.',
  },
  {
    icon: Palette,
    title: 'Easy Customization',
    text: 'Padding, background colour (auto-picked from your art), badges and a monochrome layer.',
  },
  {
    icon: Layers,
    title: 'Multiple Formats',
    text: 'PNG or WebP for Android, store-ready PNG for iOS — all packed into one ZIP.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    text: 'Your images never leave your browser. Generation happens 100% on your device.',
  },
]

export function Features() {
  return (
    <section className="mx-auto mt-16 w-full max-w-6xl px-4">
      <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        Everything an app icon needs
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 transition hover:-translate-y-0.5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-bold text-slate-900">{f.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const STEPS = [
  {
    icon: Upload,
    title: '1. Upload your image',
    text: 'Drop in a PNG, JPG, SVG or WebP up to 10 MB — a square 1024×1024 image works best.',
  },
  {
    icon: MousePointerClick,
    title: '2. Customize it',
    text: 'Set padding, pick a background colour, add a badge or a monochrome layer, and watch the live previews.',
  },
  {
    icon: Download,
    title: '3. Download the ZIP',
    text: 'One click builds every iOS and Android file, neatly organised and ready to ship.',
  },
]

export function Instructions() {
  return (
    <section className="mx-auto mt-16 w-full max-w-6xl px-4">
      <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        How it works
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.title} className="rounded-3xl bg-primary-50/60 p-6 ring-1 ring-primary-100">
            <s.icon className="h-6 w-6 text-primary-600" />
            <h3 className="mt-3 font-bold text-slate-900">{s.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
