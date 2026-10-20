import IconGeneratorWrapper from '../features/icon-generator/IconGeneratorWrapper'
import { usePageMeta } from '../lib/useTitle'
import { Features, Instructions } from '../features/home/Sections'
import Footer from '../components/Footer'
import { Link } from 'react-router'

export default function Home() {
  usePageMeta('DrAppIcon - Create Mobile App Icons', 'DrAppIcon — Generate your app icon easily. Create iOS and Android app icons in all sizes from a single image, free and fully in your browser.')
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-night-950">
      <main className="py-8">
        <IconGeneratorWrapper />
        <Features />
        <Instructions />
        <section className="pb-20 pt-4">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <h2 className="text-center text-[32px] font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
              An app icon generator for iOS and Android
            </h2>
            <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                DrAppIcon is a free online app icon generator. Upload one image and it
                creates every icon your app needs: the complete iOS AppIcon set —
                iPhone, iPad and the 1024×1024 App Store icon, with a ready-made
                Contents.json — and the full Android set, including legacy and round
                launcher icons at every density, adaptive icon foregrounds with a
                background colour, an optional monochrome layer for themed icons, and
                the 512×512 Play Store icon. Everything arrives as one organized ZIP,
                named exactly the way Xcode and Android Studio expect.
              </p>
              <p>
                Unlike server-based generators, DrAppIcon renders every size in your
                own browser. Your artwork is never uploaded, generation takes seconds
                instead of a queue, and there is nothing to sign up for and no
                watermark to remove. Adjust the background colour (picked automatically
                from your image), fine-tune the padding or zoom, add a badge, and
                preview the result on real iPhone and Android device frames before
                you download.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
              <Link to="/features" className="rounded-xl bg-white px-5 py-2.5 text-slate-600 shadow-card transition hover:text-primary-700 dark:bg-night-800 dark:text-slate-300 dark:hover:text-primary-300">
                Explore the features
              </Link>
              <Link to="/how-it-works" className="rounded-xl bg-white px-5 py-2.5 text-slate-600 shadow-card transition hover:text-primary-700 dark:bg-night-800 dark:text-slate-300 dark:hover:text-primary-300">
                See how it works
              </Link>
              <Link to="/instructions" className="rounded-xl bg-white px-5 py-2.5 text-slate-600 shadow-card transition hover:text-primary-700 dark:bg-night-800 dark:text-slate-300 dark:hover:text-primary-300">
                Read the instructions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
