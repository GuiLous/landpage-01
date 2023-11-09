import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { MaintenanceLogoutButton } from '@/components/pages'

import { Footer } from '@/components/shared'

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

            <p className="max-w-[786px] text-center text-white">
              Muito maneiro saber que você quer participar da trocação sincera
              aqui na ReloadClub! <br /> No momento, estamos operando em um modo{' '}
              <span className="font-semibold">
                &quot;somente para convidados&quot;
              </span>{' '}
              enquanto ajustamos alguns detalhes para tornar a experiência ainda
              mais incrível.
            </p>

            <p className="max-w-[786px] text-center text-white">
              Você pode pedir um convite pra alguém que{' '}
              <span className="font-semibold">já faz parte</span> da ReloadClub.{' '}
              <br />
              Mas se não conseguir, fica suave. Já já a gente abre as portas pra
              todo mundo!
            </p>

            <MaintenanceLogoutButton />
          </div>
        </section>
      </section>

      <Footer />
    </main>
  )
}
