'use client'

import { ChangeEvent, KeyboardEvent } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { hasUrlOnText } from '@/utils'

import {
  CustomIcon,
  Input,
  SocialHashType,
  socialHashes,
} from '@/components/shared'

interface ModalAddSocialDeleteButtonProps {
  socialName: string
  item: SocialHashType
  setSocialName: (state: string) => void
  handleUpdateSocials: (item: SocialHashType) => void
  setActiveSocialItem: (state: string) => void
}

export function ModalAddSocialInput({
  socialName,
  item,
  setSocialName,
  handleUpdateSocials,
  setActiveSocialItem,
}: ModalAddSocialDeleteButtonProps) {
  const disableSend = socialName === '' || hasUrlOnText(socialName)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSocialName(value)
  }

  const handleKeyEnterDown = (
    event: KeyboardEvent<HTMLInputElement>,
    item: SocialHashType
  ) => {
    if (event.key === 'Enter') {
      handleUpdateSocials(item)
    }
  }

  return (
    <div className="max-w-fit flex-initial items-center gap-3.5">
      <Input.Root>
        <Input.Input
          autoFocus
          secondary
          value={socialName}
          error={hasUrlOnText(socialName)}
          placeholder={socialHashes[item].placeholder}
          className={twMerge(
            'max-h-[28px] min-h-[28px] min-w-[170px] text-xs',
            'ultrawide:max-h-10 ultrawide:min-h-10 ultrawide:min-w-48 ultrawide:text-lg'
          )}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyEnterDown(e, item)}
        />
      </Input.Root>

      <span
        className={twMerge(
          'text-gray-300 text-xs font-medium transition-colors',
          'leading-none',
          !disableSend && 'hover:text-white',
          !disableSend && 'cursor-pointer',
          'ultrawide:text-lg'
        )}
        onClick={() => handleUpdateSocials(item)}
      >
        Enviar
      </span>

      <CustomIcon
        icon={RiCloseFill}
        className={twMerge(
          'cursor-pointer transition-colors -ml-1 text-3xl',
          'hover:text-gray-300',
          'ultrawide:text-6xl'
        )}
        onClick={() => setActiveSocialItem('')}
      />
    </div>
  )
}
