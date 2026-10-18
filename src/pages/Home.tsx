import IconGeneratorWrapper from '../features/icon-generator/IconGeneratorWrapper'
import { ApiPromotion, Features, Hero, Instructions } from '../features/home/Sections'

export default function Home() {
  return (
    <main>
      <Hero />
      <IconGeneratorWrapper />
      <ApiPromotion />
      <Features />
      <Instructions />
    </main>
  )
}
