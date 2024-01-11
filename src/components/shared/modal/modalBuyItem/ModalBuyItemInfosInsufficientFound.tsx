import { RiErrorWarningFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { useUserStore } from '@/store/userStore'

import { CustomIcon } from '@/components/shared'

interface ModalBuyItemInfosInsufficientFoundProps {
  price: number
}

export function ModalBuyItemInfosInsufficientFound({
  price = 0,
}: ModalBuyItemInfosInsufficientFoundProps) {
  const user = useUserStore.getState().user
  const coins = user?.account?.coins || 0

  return (
    coins < price && (
      <div className="max-w-fit flex-initial items-center gap-2">
        <CustomIcon
          icon={RiErrorWarningFill}
          className={twMerge('text-lg text-yellow-400', '3xl:text-base')}
        />

        <span className={twMerge('leading-none text-white', '3xl:text-sm')}>
          Saldo insuficiente:{' '}
          <span className="font-semibold leading-none">{coins} RC</span>
        </span>
      </div>
    )
  )
}
