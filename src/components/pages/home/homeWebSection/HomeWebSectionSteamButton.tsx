'use client'

import { SiSteam } from 'react-icons/si'

import { Button } from '@/components/shared'

const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/accounts/login/steam/`

export function HomeWebSectionSteamButton() {
  return (
    <form className="w-full" action={url} method="POST">
      <Button.Root className="min-h-[48px] w-full max-w-full" type="submit">
        <Button.Icon icon={SiSteam} className="text-lg" />
        <Button.Content className="text-sm">
          Entrar com <strong className="font-bold">Steam</strong>
        </Button.Content>
      </Button.Root>
    </form>
  )
}
