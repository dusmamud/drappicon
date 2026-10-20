import { Link } from 'react-router'
import { ArrowRight, Check } from 'lucide-react'
import { Features } from '../features/home/Sections'
import FaqBlock, { useFaqJsonLd, type Faq } from '../features/home/FaqBlock'
import { usePageMeta } from '../lib/useTitle'

const DEEP_DIVES: Array<{ title: string; paras: string[]; points: string[] }> = [
  {
    title: 'iOS icons: the complete AppIcon set, generated correctly',
    paras: [
      'An iOS app icon is not one image — it is a set of 18 files at exact pixel sizes, described by a Contents.json manifest that Xcode reads to match every file to a device and context. DrAppIcon generates the whole set from your single image: notification, settings, spotlight, and app icons for iPhone and iPad, at the @1x, @2x and @3x scale factors each context requires.',
      'The set also includes the 1024×1024 App Store icon, rendered without an alpha channel as Apple requires, so the same download that fills your asset catalog also covers your store listing. File names follow the convention Xcode expects, and the Contents.json is written for you — drag the folder into Assets.xcassets and the set is complete, with no warnings to chase.',
    ],
    points: [
      'All 18 sizes: 20, 29, 40, 60, 76 and 83.5 points at their required scales',
      '1024×1024 marketing icon included, alpha removed as the App Store requires',
      'Ready-made Contents.json with matching file names',
      'Badge overlays only on sizes of 40 points and up, where they stay legible',
    ],
  },
  {
    title: 'Android: legacy, round and adaptive icons in one pass',
    paras: [
      'Android needs three families of launcher icons. Legacy and round icons ship at five densities, from ldpi at 36×36 pixels to xxxhdpi at 192×192. Adaptive icons — the modern standard — are built from layers: a foreground image at up to 432×432 pixels, a background colour, and XML descriptors in mipmap-anydpi-v26 that tell the launcher how to combine them.',
      'DrAppIcon generates all three families together, in PNG or WebP. If you add a monochrome version of your artwork, it is exported as its own drawable and wired into the adaptive XML as the monochrome layer — the layer Android 13 and later use to build themed icons that match the user\u2019s wallpaper and dark or light theme.',
    ],
    points: [
      'Legacy and round icons for ldpi, mdpi, hdpi, xhdpi, xxhdpi and xxxhdpi',
      'Adaptive foregrounds at 108–432 px with anydpi-v26 XML descriptors',
      'Optional monochrome layer for Android themed icons',
      'Background colour exported as a named colour resource',
      'Icon file names validated to the lowercase rules Android build tools enforce',
    ],
  },
  {
    title: 'Customization that respects the artwork',
    paras: [
      'When you upload an image, DrAppIcon reads its dominant colour and proposes it as the icon background, so the set feels designed rather than pasted. The size control works the way icon designers think: add padding to shrink the artwork inside its canvas, or zoom to fill more of the frame — and the live preview on real iPhone and Android device frames shows exactly what each setting does before you download.',
      'A badge adds a short strip of text — a version number, a “NEW” flag, a beta marker — across the bottom of the icon, automatically fitted so it never clips at small sizes. Every choice is previewed on the shapes tab and on both phone mockups, in light and dark contexts.',
    ],
    points: [
      'Background colour auto-picked from your artwork, editable by hex or swatch',
      'Size slider from 100% padding to 100% zoom, mirrored exactly in the export',
      'Badge text with automatic fitting, drawn above the artwork on every shape',
      'Live preview on straight iPhone and Pixel frames with your wallpaper of choice',
    ],
  },
  {
    title: 'Fast and private, because nothing leaves your device',
    paras: [
      'There is no upload step. Your image is drawn onto canvases inside your own browser tab, every size is rendered there, and the ZIP is assembled there too. That is why a full set is ready in seconds, why there is no queue at busy times, and why the tool works the same for a hobby project as for an unreleased product whose artwork is still confidential.',
      'Nothing about your image is transmitted, stored or logged, and there is no account system to sign up for. Close the tab and the artwork is gone from memory; the only copy of the generated set is the ZIP you downloaded.',
    ],
    points: [
      '100% client-side rendering — no server receives your image',
      'A complete iOS + Android set in seconds, no queues or waiting rooms',
      'No accounts, no sign-up, no watermarks, no locked sizes',
      'Free to use for personal and commercial apps',
    ],
  },
]

const SPEC_ROWS: Array<{ label: string; ios: string; android: string }> = [
  { label: 'Deliverable', ios: 'AppIcon.appiconset + Contents.json', android: 'mipmap folders + anydpi XML' },
  { label: 'Sizes', ios: '18 files, 20×20 up to 1024×1024', android: '36×36 up to 432×432 per density' },
  { label: 'Store icon', ios: '1024×1024, no alpha', android: '512×512 Play Store icon' },
  { label: 'Formats', ios: 'PNG (as Xcode requires)', android: 'PNG or WebP' },
  { label: 'Extras', ios: 'Badge on 40 pt and larger', android: 'Adaptive + monochrome (themed) layers' },
]

const FAQS: Faq[] = [
  {
    q: 'What does DrAppIcon generate?',
    a: 'From one uploaded image, DrAppIcon generates the complete app icon set for iOS (AppIcon.appiconset with 18 sizes and Contents.json) and Android (legacy, round and adaptive icons for every density), plus the 512×512 Play Store icon — delivered as a single ZIP.',
  },
  {
    q: 'Does DrAppIcon support Android adaptive icons?',
    a: 'Yes. Adaptive icons are generated with a foreground layer per density, a background colour resource, mipmap-anydpi-v26 descriptors, and an optional monochrome layer used for themed icons on Android 13 and later.',
  },
  {
    q: 'Which image formats can I upload and download?',
    a: 'Uploads can be PNG, JPG, SVG or WebP up to 10 MB. iOS icons download as PNG, as Xcode requires; Android icons can be PNG or WebP.',
  },
  {
    q: 'Is there a watermark or a size limit on the free version?',
    a: 'No. DrAppIcon has no paid tier: every size, every format and every feature is free, with no watermarks and no account required.',
  },
]

export default function FeaturesPage() {
  usePageMeta(
    'Features · DrAppIcon',
    'DrAppIcon features in detail: complete iOS AppIcon sets with Contents.json, Android legacy, round and adaptive icons with monochrome layers, PNG and WebP output, badges, and private in-browser generation — free.',
  )
  useFaqJsonLd(FAQS, 'features-faq-jsonld')
  return (
    <main className="py-14">
      <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink dark:text-white">
          Features
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[17px] leading-relaxed text-slate-500 dark:text-slate-400">
          Everything a developer needs to ship polished app icons, without the
          busywork — free, private, and entirely in your browser.
        </p>
      </div>

      <div className="mt-4">
        <Features bare />
      </div>

      <div className="mx-auto mt-20 w-full max-w-4xl space-y-14 px-4 sm:px-6">
        {DEEP_DIVES.map((d) => (
          <section key={d.title}>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink dark:text-white">
              {d.title}
            </h2>
            {d.paras.map((p) => (
              <p key={p.slice(0, 24)} className="mt-3 text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
                {p}
              </p>
            ))}
            <ul className="mt-4 space-y-2">
              {d.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-[15px] text-slate-600 dark:text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-300" />
                  {pt}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mx-auto mt-20 w-full max-w-4xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-ink dark:text-white">
          The full set at a glance
        </h2>
        <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10">
          <div className="grid grid-cols-[110px_1fr_1fr] gap-4 border-b border-slate-100 px-6 py-4 text-sm font-bold text-ink dark:border-white/5 dark:text-white sm:grid-cols-[160px_1fr_1fr]">
            <span></span>
            <span>iOS</span>
            <span>Android</span>
          </div>
          {SPEC_ROWS.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-[110px_1fr_1fr] gap-4 border-b border-slate-100 px-6 py-4 text-sm last:border-0 dark:border-white/5 sm:grid-cols-[160px_1fr_1fr]"
            >
              <span className="font-bold text-ink dark:text-white">{r.label}</span>
              <span className="text-slate-500 dark:text-slate-400">{r.ios}</span>
              <span className="text-slate-500 dark:text-slate-400">{r.android}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Need the exact numbers per size? The{' '}
          <Link to="/instructions" className="font-semibold text-primary-600 hover:underline dark:text-primary-300">
            instructions
          </Link>{' '}
          carry the full iOS and Android size tables.
        </p>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <FaqBlock faqs={FAQS} />
      </div>

      <div className="mx-auto mt-16 w-full max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink dark:text-white">
            Try it on your own artwork
          </h2>
          <p className="mx-auto mt-2 max-w-md text-slate-500 dark:text-slate-400">
            Drop in one image and get the complete iOS and Android icon set in
            seconds.
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
