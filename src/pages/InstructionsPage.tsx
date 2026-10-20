import { Link } from 'react-router'
import { ArrowRight, AlertTriangle, ImageIcon } from 'lucide-react'
import { Instructions } from '../features/home/Sections'
import FaqBlock, { useFaqJsonLd, type Faq } from '../features/home/FaqBlock'
import { usePageMeta } from '../lib/useTitle'

const BEFORE_POINTS = [
  'Start from a square image — 1024×1024 pixels or larger gives the sharpest result at every generated size.',
  'PNG, JPG, SVG and WebP are accepted, up to 10 MB. Vector artwork (SVG) stays crisp at the largest sizes.',
  'Keep important details away from the edges: launchers crop icons into circles and rounded shapes, and adaptive icons reserve the outer ring as a safe-zone margin.',
  'If your artwork has a transparent background, pick the background colour deliberately — DrAppIcon proposes the dominant colour of your image, and you can override it.',
]

const MISTAKES: Array<{ title: string; text: string }> = [
  {
    title: 'Uploading a small or rectangular source',
    text: 'A 200-pixel or wide-format source has to be stretched and upscaled, which blurs the big sizes. Use a square source of at least 1024×1024 whenever you can.',
  },
  {
    title: 'Designing right up to the edge',
    text: 'Android launchers mask adaptive icons into circles, squircles and teardrops. Artwork that touches the corners will be clipped — keep the key content inside the centre safe zone.',
  },
  {
    title: 'Putting text in the icon',
    text: 'Words become unreadable below about 48 pixels and app names already appear under the icon. A simple, bold symbol reads better at home-screen size.',
  },
  {
    title: 'Skipping the monochrome layer on Android',
    text: 'Without a monochrome version, Android themed icons fall back to a plain rendering of your colour icon. Add the monochrome artwork in the Advanced options so themed icons look intentional.',
  },
  {
    title: 'Renaming files after download',
    text: 'The generated names are load-bearing: Xcode matches files through Contents.json and Android build tools require lowercase resource names. Keep the names as generated.',
  },
]

const FAQS: Faq[] = [
  {
    q: 'How do I add the generated icons to an iOS project?',
    a: 'Unzip the download, open your project in Xcode, select Assets.xcassets, and drag the AppIcon.appiconset folder onto the asset catalog. Xcode matches every size automatically through the included Contents.json.',
  },
  {
    q: 'How do I add the generated icons to an Android project?',
    a: 'Copy the mipmap-* folders and the mipmap-anydpi-v26 folder from the ZIP into your app\u2019s res/ directory, replacing the generated defaults. The adaptive icon XML and background colour resource are already wired to your chosen icon name.',
  },
  {
    q: 'What size should my source image be?',
    a: '1024×1024 pixels or larger, square. That matches the largest generated size (the App Store icon), so no generated file ever has to be upscaled.',
  },
  {
    q: 'Why does my Android icon name have to be lowercase?',
    a: 'Android build tools (AAPT) only accept resource file names with lowercase letters, digits and underscores. DrAppIcon validates the name for you and falls back to ic_launcher if the field is left empty.',
  },
  {
    q: 'Do the generated icons work for the Play Store and App Store listings?',
    a: 'Yes. The ZIP includes the 512×512 Play Store icon and the 1024×1024 App Store icon (without alpha, as Apple requires), alongside the in-project icon sets.',
  },
]

export default function InstructionsPage() {
  usePageMeta(
    'Instructions · DrAppIcon',
    'Detailed DrAppIcon instructions: what to prepare before generating, step-by-step Xcode and Android Studio guides, full iOS and Android icon size tables, common mistakes, and answers to frequent questions.',
  )
  useFaqJsonLd(FAQS, 'instructions-faq-jsonld')
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

      <div className="mx-auto mt-12 w-full max-w-4xl px-4 sm:px-6">
        <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300">
              <ImageIcon className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight text-ink dark:text-white">
              Before you start
            </h2>
          </div>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            {BEFORE_POINTS.map((p) => (
              <li key={p.slice(0, 24)}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <Instructions bare />
      </div>

      <div className="mx-auto mt-20 w-full max-w-4xl px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2.5 text-center">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2 className="text-2xl font-extrabold tracking-tight text-ink dark:text-white">
            Common mistakes to avoid
          </h2>
        </div>
        <div className="mt-6 space-y-4">
          {MISTAKES.map((m) => (
            <div
              key={m.title}
              className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10"
            >
              <h3 className="font-bold text-ink dark:text-white">{m.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <FaqBlock faqs={FAQS} />
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
