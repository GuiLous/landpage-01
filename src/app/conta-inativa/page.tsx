import {
  InactiveGoBackLink,
  InactiveHeroImage,
  InactiveMessage,
  InactiveSocialLinks,
} from '@/components/pages'

import { Footer } from '@/components/shared'

export default function Inactive() {
  return (
    <main className="relative h-screen flex-col items-center justify-center bg-home bg-cover bg-no-repeat">
      <section className="flex-col items-center justify-center">
        <InactiveHeroImage />

        <h2 className="text-xl font-bold uppercase">Sua conta está inativa</h2>

        <InactiveMessage />

        <InactiveSocialLinks />

        <InactiveGoBackLink />
      </section>

      <Footer />
    </main>
  )
}
