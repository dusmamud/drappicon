import IconGeneratorWrapper from '../features/icon-generator/IconGeneratorWrapper'
import { ApiPromotion, Features, Instructions } from '../features/home/Sections'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-night-900 dark:via-night-950 dark:to-night-950">
      <main className="py-8">
        <IconGeneratorWrapper />
        <ApiPromotion />
        <Features />
        <Instructions />
      </main>
      <Footer />
    </div>
  )
}
