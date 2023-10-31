import { SiDiscord, SiTwitch, SiYoutube } from 'react-icons/si'
import { twMerge } from 'tailwind-merge'

import { SocialHandles } from '@/contexts'

import { CustomIcon } from '@/components/shared'
import { Socials } from '@/components/shared/profileHeader/ProfileHeaderSocialButtons'

import { ModalAddSocialListRightContent } from './ModalAddSocialListRightContent'

export type SocialHashType = 'twitch' | 'discord' | 'youtube'

export const socialHashes = {
  twitch: {
    title: 'Twitch',
    icon: SiTwitch,
    helper: 'Nome do canal',
    placeholder: 'Ex: meucanal',
  },
  discord: {
    title: 'Servidor do Discord',
    icon: SiDiscord,
    helper: 'Hash de convite',
    placeholder: 'Ex: XXyy99ZZ',
  },
  youtube: {
    title: 'Youtube',
    icon: SiYoutube,
    helper: 'Nome do canal',
    placeholder: 'Ex: meucanal',
  },
}

interface ModalAddSocialListProps {
  socialsLinked: Socials[]
  socials: SocialHandles
}

export function ModalAddSocialList({
  socials,
  socialsLinked,
}: ModalAddSocialListProps) {
  const socialKeys = Object.keys(socialHashes) as SocialHashType[]

  return (
    <ul className="flex w-full flex-1 flex-col">
      {socialKeys.map((item) => (
        <li
          key={item}
          className={twMerge(
            'flex w-full flex-1 items-center justify-between border-b border-gray-700 pb-7 pt-7',
            'first:pt-0',
            'last:pb-0 last:border-0'
          )}
        >
          <div className="items-center gap-3.5">
            <div className="max-w-fit flex-initial">
              <CustomIcon icon={socialHashes[item].icon} />
            </div>

            <div className="flex-col gap-0.5">
              <span className="text-sm font-medium text-white">
                {socialHashes[item].title}
              </span>

              <span className="text-xs text-gray-200">
                {socialHashes[item].helper}
              </span>
            </div>
          </div>

          <ModalAddSocialListRightContent
            item={item}
            socialsLinked={socialsLinked}
            socials={socials}
          />
        </li>
      ))}
    </ul>
  )
}
