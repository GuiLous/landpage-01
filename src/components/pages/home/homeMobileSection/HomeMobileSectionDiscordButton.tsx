'use client'

import { useCallback } from 'react'
import { SiDiscord } from 'react-icons/si'

import { DISCORD_LINK } from '@/constants'

import { Button } from '@/components/shared'

export function HomeMobileSectionDiscordButton() {
  const handleRedirectToDiscord = useCallback(() => {
    window.open(DISCORD_LINK, '_blank')
  }, [])

  return (
    <Button.Root className="w-full" onClick={handleRedirectToDiscord}>
      <Button.Icon icon={SiDiscord} className="text-[1.625rem]" />
      <Button.Content className="text-sm">
        Junte-se a{' '}
        <strong className="inline-block font-bold">Comunidade</strong>
      </Button.Content>
    </Button.Root>
  )
}
