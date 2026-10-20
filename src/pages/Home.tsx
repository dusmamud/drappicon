import IconGeneratorWrapper from '../features/icon-generator/IconGeneratorWrapper'
import { usePageMeta } from '../lib/useTitle'
import { Features, Instructions } from '../features/home/Sections'
import Footer from '../components/Footer'

export default function Home() {
  usePageMeta('DrAppIcon - Create Mobile App Icons', 'DrAppIcon — Generate your app icon easily. Create iOS and Android app icons in all sizes from a single image, free and fully in your browser.')
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-night-950">
      <main className="py-8">
        <IconGeneratorWrapper />
        <Features />
        <Instructions />
      </main>
      <Footer />
    </div>
  )
}
