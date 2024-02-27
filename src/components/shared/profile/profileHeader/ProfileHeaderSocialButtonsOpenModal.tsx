'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { SocialHandles } from '@/functions'

import { Button, ModalAddSocial, ModalAddSocialList } from '@/components/shared'

import { Socials } from './ProfileHeaderSocialButtons'

interface ProfileHeaderSocialButtonsOpenModalProps {
  socials: SocialHandles
  socialLinkedKeys: Socials[]
}

export function ProfileHeaderSocialButtonsOpenModal({
  socials,
  socialLinkedKeys,
}: ProfileHeaderSocialButtonsOpenModalProps) {
  const [openModalAddSocial, setOpenModalAddSocial] = useState(false)

  return (
    <div className="max-w-fit flex-initial" id="step-header02">
      <Button.Root
        ghost
        className={twMerge(
          'min-h-[16px] min-w-[16px]',
          'ultrawide:min-h-9 ultrawide:max-h-9 ultrawide:min-w-9 ultrawide:rounded-lg'
        )}
        onClick={() => {
          setOpenModalAddSocial(true)
        }}
      >
        <Button.Content className={twMerge('text-sm', 'leading-none')}>
          +
        </Button.Content>
      </Button.Root>

      <ModalAddSocial open={openModalAddSocial} setOpen={setOpenModalAddSocial}>
        <ModalAddSocialList
          socials={socials}
          socialsLinked={socialLinkedKeys}
        />
      </ModalAddSocial>
    </div>
  )
}
