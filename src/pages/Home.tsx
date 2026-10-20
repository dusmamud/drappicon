import IconGeneratorWrapper from '../features/icon-generator/IconGeneratorWrapper'
import { useTitle } from '../lib/useTitle'
import { Features, Instructions } from '../features/home/Sections'
import Footer from '../components/Footer'

export default function Home() {
  useTitle('DrAppIcon - Create Mobile App Icons')
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
