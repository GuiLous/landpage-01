import { twMerge } from 'tailwind-merge'

import { FooterCopyright } from './FooterCopyright'
import { FooterLogo } from './FooterLogo'
import { FooterSocials } from './FooterSocials'

export function Footer() {
  return (
    <footer className="z-10 flex-initial items-center justify-center bg-black px-0 py-7">
      <section
        className={twMerge(
          'max-w-[1320px] items-center justify-center',
          'xl:flex-col xl:gap-6'
        )}
      >
        <FooterLogo />

        <FooterCopyright />

        <FooterSocials />
      </section>
    </footer>
  )
}
