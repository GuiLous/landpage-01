import { FooterCopyright } from './FooterCopyright'
import { FooterLogo } from './FooterLogo'
import { FooterSocials } from './FooterSocials'

export function Footer() {
  return (
    <div className="relative flex-initial items-center justify-center bg-black px-0 py-[1.875rem]">
      <section className="max-w-[1320px] items-center justify-center xl:flex-col xl:gap-6">
        <FooterLogo />

        <FooterCopyright />

        <FooterSocials />
      </section>
    </div>
  )
}
