import { HomeMobileSection, HomeWebSection } from '@/components/pages'

import { Footer } from '@/components/shared'

export default function Home() {
  return (
    <main className="h-screen flex-col">
      <HomeWebSection />

      <HomeMobileSection />

      <Footer />
    </main>
  )
}
