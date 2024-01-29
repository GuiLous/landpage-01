import { DateTime } from 'luxon'
import { twMerge } from 'tailwind-merge'

interface ModalBuyItemInfosDescriptionProps {
  isBox: boolean
  description: string
  release_date: string
}

export function ModalBuyItemInfosDescription({
  isBox,
  description,
  release_date,
}: ModalBuyItemInfosDescriptionProps) {
  return (
    <div className={twMerge('flex-col gap-9', '3xl:gap-8')}>
      <div className="flex-col gap-2">
        <p
          className={twMerge('text-white text-sm', 'leading-6', '3xl:text-xs')}
        >
          {description}
        </p>

        <p
          className={twMerge(
            'text-white text-sm',
            'leading-none',
            '3xl:text-xs'
          )}
        >
          No jogo desde -{' '}
          <span className="font-semibold leading-none">
            {DateTime.fromISO(release_date).toFormat('dd MMMM yyyy', {
              locale: 'pt',
            })}
            .
          </span>
        </p>
      </div>

      {isBox && (
        <p className={twMerge('text-white text-sm', '3xl:text-xs')}>
          Ao abrir uma caixa, você receberá{' '}
          <span className="font-semibold">aleatoriamente</span> uma das
          recompensas abaixo.
        </p>
      )}
    </div>
  )
}
