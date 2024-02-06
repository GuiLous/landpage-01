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
      <span
        className={twMerge(
          'text-sm font-medium text-white',
          'leading-none',
          'ultrawide:text-2xl ultrawide:leading-none'
        )}
      >
        {socials[item]}
      </span>

      <CustomIcon
        icon={RiCloseFill}
        className={twMerge(
          'cursor-pointer transition-colors text-xl',
          'hover:text-gray-300',
          'ultrawide:text-6xl'
        )}
        onClick={() => handleDeleteSocials(item)}
      />
    </div>
  )
}
