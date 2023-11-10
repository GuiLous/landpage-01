import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { InviteRequiredMessage } from '@/components/pages'

import { Footer, LogoutButtonRedirect } from '@/components/shared'

import logo from '@/assets/images/logo_type_white.svg'
import notInvitedText from '@/assets/images/not_invited_text.png'

export default function InviteRequired() {
  return (
    <main
      className={twMerge(
        'relative h-screen w-screen flex-col',
        'bg-not_invited bg-cover bg-no-repeat'
      )}
    >
      <section
        className={twMerge(
          'flex-col items-center justify-center gap-[12.5rem] pb-11',
          '3xl:gap-[11.25rem]'
        )}
      >
        <div className="flex-initial items-center justify-center">
          <Image src={logo} alt="Reload logo" width={200} />
        </div>

        <section
          className={twMerge(
            'flex-initial flex-col items-center justify-center gap-14',
            '3xl:gap-12'
          )}
        >
          <div
            className={twMerge(
              'flex-initial flex-col items-center justify-center gap-9',
              '3xl:gap-8'
            )}
          >
            <Image src={notInvitedText} alt="Que pano" className="w-[15.1%]" />

            <InviteRequiredMessage />

            <LogoutButtonRedirect />
          </div>
        </section>
      </section>

      <Footer />
    </main>
  )
}
