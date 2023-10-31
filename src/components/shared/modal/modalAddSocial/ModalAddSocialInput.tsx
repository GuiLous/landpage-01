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
          className="max-h-[28px] min-h-[28px] min-w-[170px] text-xs"
          onChange={handleChange}
          onKeyDown={(e) => handleKeyEnterDown(e, item)}
        />
      </Input.Root>

      <span
        className={twMerge(
          'leading-none text-gray-300 text-xs font-medium transition-colors',
          !disableSend && 'hover:text-white',
          !disableSend && 'cursor-pointer'
        )}
        onClick={() => handleUpdateSocials(item)}
      >
        Enviar
      </span>

      <CustomIcon
        icon={RiCloseFill}
        size={26}
        className={twMerge(
          'cursor-pointer transition-colors -ml-1',
          'hover:text-gray-300'
        )}
        onClick={() => setActiveSocialItem('')}
      />
    </div>
  )
}
