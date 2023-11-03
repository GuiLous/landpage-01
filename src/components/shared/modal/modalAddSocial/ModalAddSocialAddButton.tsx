'use client'

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
      className="h-7 min-w-[82.5px] rounded-[67px] px-4 py-2.5"
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
