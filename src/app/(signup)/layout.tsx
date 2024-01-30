import Image from 'next/image'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { SignupLayoutHeader } from '@/components/pages'

import { Footer } from '@/components/shared'

const liquidObject = '/assets/images/liquid_object.png'
const logo = '/assets/images/logo_type_white.svg'
const rectangle = '/assets/images/signup_bg_top_right.png'

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className={twMerge(
        'select-none relative h-screen flex-col items-center',
        'bg-sign_up_bottom_left bg-cover bg-repeat-round'
      )}
    >
      <SignupLayoutHeader />

      <div className="absolute bottom-[80px] left-0 z-0 w-[26%]">
        <Image src={liquidObject} alt="Liquid object" priority />
      </div>

      <Image
        src={rectangle}
        alt="Rectangle"
        className="absolute right-10 top-10"
      />

      <section className="flex-col items-center justify-center gap-[55px]">
        <div className="w-[19%] flex-initial items-end justify-center">
          <Image src={logo} alt="Reload logo" />
        </div>

        {children}
      </section>

      <Footer />
    </main>
  )
}
