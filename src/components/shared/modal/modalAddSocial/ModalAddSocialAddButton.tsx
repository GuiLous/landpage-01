'use client'

import { twMerge } from 'tailwind-merge'

import { Button, SocialHashType } from '@/components/shared'

interface ModalAddSocialAddButtonProps {
  isFetching: boolean
  isLoading: boolean
  handleChangeActiveSocialName: (item: SocialHashType) => void
  item: SocialHashType
}

export function ModalAddSocialAddButton({
  isFetching,
  isLoading,
  handleChangeActiveSocialName,
  item,
}: ModalAddSocialAddButtonProps) {
  return (
    <Button.Root
      className={twMerge(
        'h-7 min-w-[82.5px] rounded-[67px] px-4 py-2.5',
        'ultrawide:min-h-12 ultrawide:max-h-12'
      )}
      disabled={isFetching}
      onClick={() => handleChangeActiveSocialName(item)}
    >
      {isLoading && <Button.Spinner />}

      {!isLoading && (
        <Button.Content
          className="text-xs font-medium capitalize leading-none"
          isLoading={isLoading}
          disabled={isFetching}
        >
          Vincular
        </Button.Content>
      )}
    </Button.Root>
  )
}
