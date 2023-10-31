'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SiDiscord, SiSteam, SiTwitch, SiYoutube } from 'react-icons/si'
import { twMerge } from 'tailwind-merge'

import { SocialHandles } from '@/contexts'

import {
  Button,
  CustomIcon,
  ModalAddSocial,
  ModalAddSocialList,
  Tooltip,
} from '@/components/shared'

export type Socials = 'steam' | 'twitch' | 'youtube' | 'discord'

interface ProfileHeaderSocialButtonsProps {
  socials: SocialHandles
  isUserLogged: boolean
}

export function ProfileHeaderSocialButtons({
  isUserLogged,
  socials,
}: ProfileHeaderSocialButtonsProps) {
  const [openModalAddSocial, setOpenModalAddSocial] = useState(false)

  const socialLinkedKeys = Object.keys(socials).filter(
    (key) => socials[key as Socials] !== null
  ) as Socials[]

  const socialIcons = {
    steam: SiSteam,
    discord: SiDiscord,
    twitch: SiTwitch,
    youtube: SiYoutube,
  }

  const socialsLinksPrefix = {
    steam: 'https://steamcommunity.com/profiles/',
    discord: 'https://discord.gg/',
    twitch: 'https://www.twitch.tv/',
    youtube: 'https://www.youtube.com/',
  }

  return (
    <div className={twMerge('flex-initial items-center gap-3.5', '3xl:gap-3')}>
      {socialLinkedKeys?.map((item) => (
        <Tooltip
          key={item}
          content={`Visitar perfil ${item}`}
          side="bottom"
          className="px-2 py-2 text-xs"
        >
          <Link href={socialsLinksPrefix[item] + socials[item]} target="_blank">
            <CustomIcon icon={socialIcons[item]} />
          </Link>
        </Tooltip>
      ))}

      {isUserLogged && (
        <Tooltip
          content="Adicionar rede social"
          side="bottom"
          className="px-2 py-2 text-xs"
        >
          <div className="max-w-fit flex-initial">
            <Button.Root
              ghost
              className="min-h-[16px] min-w-[16px]"
              onClick={() => {
                setOpenModalAddSocial(true)
              }}
            >
              <Button.Content className="text-sm leading-none">
                +
              </Button.Content>
            </Button.Root>
          </div>
        </Tooltip>
      )}

      <ModalAddSocial open={openModalAddSocial} setOpen={setOpenModalAddSocial}>
        <ModalAddSocialList
          socials={socials}
          socialsLinked={socialLinkedKeys}
        />
      </ModalAddSocial>
    </div>
  )
}
