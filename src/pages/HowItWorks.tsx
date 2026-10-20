import { useEffect } from 'react'
import { Link } from 'react-router'
import {
  ArrowRight,
  Download,
  FolderOpen,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
} from 'lucide-react'
import { usePageMeta } from '../lib/useTitle'

const STEPS = [
  {
    icon: Upload,
    title: '1. Upload one image',
    text: 'Drop in a PNG, JPG, SVG or WebP — ideally 1024×1024 or larger. The image is read locally on your device; nothing is sent anywhere.',
  },
  {
    icon: SlidersHorizontal,
    title: '2. Customize the look',
    text: 'The background colour is picked from your artwork automatically. Fine-tune the size, add a badge, or include a monochrome layer for Android themed icons.',
  },
  {
    icon: Download,
    title: '3. Download the ZIP',
    text: 'One click renders every size and packs it into a single tidy ZIP — iOS AppIcon set, Android mipmaps, adaptive-icon files and the Play Store icon.',
  },
  {
    icon: FolderOpen,
    title: '4. Drop it into your project',
    text: 'Drag the AppIcon.appiconset into Xcode, or the mipmap folders into Android Studio. Names, sizes and descriptors are already exactly where the tools expect them.',
  },
]

const ZIP_ROWS: Array<{ label: string; items: string }> = [
  {
    label: 'iOS',
    items:
      'AppIcon.appiconset with all 18 sizes (20 pt through the 1024 App Store icon) and a ready-made Contents.json.',
  },
  {
    label: 'Android legacy',
    items:
      'Round and square launcher icons for every density — ldpi 36 px up to xxxhdpi 192 px — in PNG or WebP.',
  },
  {
    label: 'Android adaptive',
    items:
      'Foreground artwork for each density, an optional monochrome layer for themed icons, the mipmap-anydpi-v26 descriptors and the background colour XML.',
  },
  {
    label: 'Store & web',
    items: 'The 512×512 Play Store icon and a matching web icon, rendered from the same artwork.',
  },
]

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'Is DrAppIcon free?',
    a: 'Yes — completely free, with no watermarks, no locked sizes and no account to create.',
  },
  {
    q: 'Are my images uploaded to a server?',
    a: 'No. Generation runs entirely in your browser tab using canvas; your artwork never leaves your device and nothing is stored.',
  },
  {
    q: 'What image should I upload?',
    a: 'A PNG, JPG, SVG or WebP up to 10 MB. A square image of 1024×1024 px or larger gives the sharpest results at every size.',
  },
  {
    q: 'Which icon sizes do I get?',
    a: 'For iOS, all 18 AppIcon sizes including the 1024 px App Store icon, with Contents.json. For Android, legacy and round icons from ldpi 36 px to xxxhdpi 192 px, adaptive foregrounds up to 432 px, and the 512 px Play Store icon.',
  },
  {
    q: 'Does it support Android adaptive and themed icons?',
    a: 'Yes. The ZIP includes adaptive-icon foregrounds, a background colour resource, mipmap-anydpi-v26 descriptors, and — if you add a monochrome image — the monochrome layer Android uses for themed icons.',
  },
  {
    q: 'Can I choose PNG or WebP for Android?',
    a: 'Yes. Android output can be generated as PNG or WebP; iOS icons are always PNG, as Xcode requires.',
  },
]

export default function HowItWorks() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'faq-jsonld'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [])
  usePageMeta('How It Works · DrAppIcon', 'How DrAppIcon works: upload one image, customize background, size, badge and monochrome, download one ZIP with every iOS and Android icon size, and drop it into your project.')
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink dark:text-white">
          How It Works
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[17px] leading-relaxed text-slate-500 dark:text-slate-400">
          From a single image to a complete, store-ready icon set in four steps —
          all inside your browser.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {STEPS.map((s) => (
          <div
            key={s.title}
            className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300">
              <s.icon className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-lg font-bold text-ink dark:text-white">{s.title}</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
              {s.text}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-center text-2xl font-extrabold tracking-tight text-ink dark:text-white">
        What's inside the ZIP
      </h2>
      <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10">
        {ZIP_ROWS.map((r, i) => (
          <div
            key={r.label}
            className={`flex flex-col gap-1 px-6 py-5 sm:flex-row sm:gap-6 ${
              i > 0 ? 'border-t border-slate-100 dark:border-white/5' : ''
            }`}
          >
            <span className="w-36 shrink-0 font-bold text-ink dark:text-white">{r.label}</span>
            <p className="text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
              {r.items}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-center text-2xl font-extrabold tracking-tight text-ink dark:text-white">
        Under the hood
      </h2>
      <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
        <p>
          When you drop an image into DrAppIcon, the browser decodes it locally and
          draws it onto a canvas once per output size, at the exact pixel
          dimensions each platform requires — the 1024×1024 App Store icon, the
          432×432 xxxhdpi adaptive foreground, and every step in between. Because
          each file is rendered from your original at its target size, edges stay
          as sharp as the source allows; nothing is upscaled from a smaller copy.
        </p>
        <p>
          The background colour is chosen by sampling your artwork and weighing its
          most frequent opaque colours, which is why the proposal usually feels
          native to the design. Badge text is measured and shrunk until it fits its
          strip, so a long badge never overflows the icon, and the round Android
          variant clips only the artwork — never the badge. Finally, the files are
          named to the rules each platform enforces (including Android's lowercase
          resource names), packed with their manifests, and handed to you as one
          ZIP.
        </p>
      </div>

      <div className="mt-10 flex items-start gap-4 rounded-3xl bg-primary-50 p-6 ring-1 ring-primary-100 dark:bg-primary-500/10 dark:ring-primary-500/20">
        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary-600 dark:text-primary-300" />
        <div>
          <h2 className="font-bold text-ink dark:text-white">Private by design</h2>
          <p className="mt-1 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            There is no server in the middle. Your image is drawn onto canvases in
            your own browser tab and the ZIP is assembled there too — close the
            tab and nothing remains. No accounts, no uploads, no tracking of your
            artwork.
          </p>
        </div>
      </div>

      <h2 className="mt-16 text-center text-2xl font-extrabold tracking-tight text-ink dark:text-white">
        Common questions
      </h2>
      <div className="mt-6 space-y-4">
        {FAQS.map((f) => (
          <div
            key={f.q}
            className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10"
          >
            <h3 className="font-bold text-ink dark:text-white">{f.q}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
              {f.a}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/#editor"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700"
        >
          Create your icons <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  )
}
