import { BsCheckCircleFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { CustomIcon } from '@/components/shared'

export function ModalReloadCoinConfirmationHeader() {
  return (
    <>
      <div className="min-h-[52px] min-w-[52px] max-w-[52px] items-center justify-center rounded-[50%] bg-green-600/15">
        <CustomIcon
          icon={BsCheckCircleFill}
          className={twMerge(
            'text-green-600 text-[2rem]',
            '3xl:text-[1.75rem]',
            'ultrawide:text-5xl'
          )}
        />
      </div>

      <div className={twMerge('flex-col items-center gap-3.5', '3xl:gap-3')}>
        <span
          className={twMerge(
            'text-lg font-medium text-green-600',
            'leading-none',
            '3xl:text-base',
            'ultrawide:text-2xl'
          )}
        >
          Sucesso!
        </span>

        <span
          className={twMerge(
            'font-semibold text-white text-xl',
            'leading-none',
            '3xl:text-lg',
            'ultrawide:text-3xl'
          )}
        >
          Compra concluída.
        </span>
      </div>
    </>
  )
}
