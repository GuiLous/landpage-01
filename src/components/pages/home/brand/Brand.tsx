import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import logo from '@/assets/images/logo_type_white.svg'

import { DiscordButton } from './DiscordButton'
import { LoginForm } from './LoginForm'

export function Brand() {
  return (
    <div
      className={twMerge(
        'flex-col gap-7 ',
        'xl:mt-3 xl:items-start xl:justify-center xl:gap-3 xl:pb-10'
      )}
    >
      <header
        className={twMerge('max-w-[305px]', 'xl:w-[75%] xl:flex-initial')}
      >
        <Image src={logo} alt="Reload" />
      </header>

      <p className="max-w-[310px] leading-7">
        Jogue partidas 5x5 ranqueadas no GTA. Plante, desarme, suba de nível e
        prove seu valor. Reload.
      </p>

      <footer className={twMerge('max-w-[305px]', 'xl:hidden')}>
        <LoginForm />
      </footer>

      <footer className={twMerge('hidden max-h-[4rem]', 'xl:flex xl:max-h-12')}>
        <DiscordButton />
      </footer>
    </div>
  )
}
