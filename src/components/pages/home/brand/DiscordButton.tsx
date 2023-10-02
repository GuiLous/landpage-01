'use client'

import { useCallback } from 'react'
import { SiDiscord } from 'react-icons/si'

import { DISCORD_LINK } from '@/constants'

import { Button } from '@/components/shared'

export function DiscordButton() {
  const handleRedirectToDiscord = useCallback(() => {
    window.open(DISCORD_LINK, '_blank')
  }, [])

  return (
    <Button.Root className="w-full" onClick={handleRedirectToDiscord}>
      <Button.Icon icon={SiDiscord} className="text-[1.625rem]" />
      <Button.Content className="font-semibold sm:text-sm">
        Faça parte do nosso{' '}
        <strong className="inline-block font-bold">Discord</strong>
      </Button.Content>
    </Button.Root>
  )
}
