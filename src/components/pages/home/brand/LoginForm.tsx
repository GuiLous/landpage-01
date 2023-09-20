'use client'

import { SiSteam } from 'react-icons/si'

import { Button } from '@/components/shared'

const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/accounts/login/steam/`

export function LoginForm() {
  return (
    <form className="flex w-full xl:hidden" action={url} method="POST">
      <Button.Root className="w-full" type="submit">
        <Button.Icon icon={SiSteam} className="text-[1.625rem]" />
        <Button.Content>
          Entrar com <strong className="inline-block font-bold">Steam</strong>
        </Button.Content>
      </Button.Root>
    </form>
  )
}
