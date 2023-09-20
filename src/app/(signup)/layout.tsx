import Image from 'next/image'

import { LayoutHeader } from '@/components/pages'

import { Footer } from '@/components/shared'

import liquidObject from '@/assets/images/liquid_object.png'
import logo from '@/assets/images/logo_type_white.svg'
import rectangle from '@/assets/images/signup_bg_top_right.png'

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="bg-sign_up_bottom_left relative h-screen flex-col items-center bg-cover bg-repeat-round">
      <LayoutHeader />

      <div className="absolute bottom-[85px] left-0 z-0 w-[26%]">
        <Image src={liquidObject} alt="Liquid object" />
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
