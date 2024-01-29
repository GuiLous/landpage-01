import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import {
  SignupContent,
  SignupHero,
  SignupLayoutHeader,
} from '@/components/pages'

import { Footer } from '@/components/shared'

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className={twMerge(
        'select-none relative bg-signup bg-no-repeat bg-cover h-screen flex-col items-center justify-center'
      )}
    >
      <SignupLayoutHeader />

      <div className="items-center justify-center">
        <div className="min-h-[333px] max-w-[784px] flex-initial overflow-hidden rounded-lg">
          <SignupHero />

          <SignupContent>{children}</SignupContent>
        </div>
      </div>

      <Footer />
    </main>
  )
}
