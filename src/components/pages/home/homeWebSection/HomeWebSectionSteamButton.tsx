'use client'

import { SiSteam } from 'react-icons/si'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/shared'

const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/accounts/login/steam/`

export function HomeWebSectionSteamButton() {
  return (
    <form className="w-full" action={url} method="POST">
      <Button.Root
        className={twMerge(
          'min-h-[48px] w-full max-w-full',
          'ultrawide:min-h-[96px] ultrawide:gap-5'
        )}
        type="submit"
      >
        <Button.Icon
          icon={SiSteam}
          className={twMerge('text-lg', 'ultrawide:text-4xl')}
        />
        <Button.Content className={twMerge('text-sm', 'ultrawide:text-3xl')}>
          Entrar com <strong className="font-bold">Steam</strong>
        </Button.Content>
      </Button.Root>
    </form>
  )
}
