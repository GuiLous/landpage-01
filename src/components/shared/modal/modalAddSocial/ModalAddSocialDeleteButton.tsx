'use client'

import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { SocialHandles } from '@/functions'

import { CustomIcon, SocialHashType } from '@/components/shared'

interface ModalAddSocialDeleteButtonProps {
  socials: SocialHandles
  item: SocialHashType
  handleDeleteSocials: (item: SocialHashType) => void
}

export function ModalAddSocialDeleteButton({
  handleDeleteSocials,
  item,
  socials,
}: ModalAddSocialDeleteButtonProps) {
  return (
    <div className="max-w-fit flex-initial items-center gap-3">
      <span className="text-sm font-medium leading-none text-white">
        {socials[item]}
      </span>

      <CustomIcon
        icon={RiCloseFill}
        size={18}
        className={twMerge(
          'cursor-pointer transition-colors',
          'hover:text-gray-300'
        )}
        onClick={() => handleDeleteSocials(item)}
      />
    </div>
  )
}
