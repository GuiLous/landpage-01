import { DateTime } from 'luxon'
import { twMerge } from 'tailwind-merge'

import { ItemSubType, ItemType } from '@/functions'

interface ModalBuyItemInfosDescriptionProps {
  isBox: boolean
  description: string
  release_date: string
  item_type: ItemType
  subtype?: ItemSubType
}

export function ModalBuyItemInfosDescription({
  isBox,
  description,
  release_date,
  item_type,
  subtype,
}: ModalBuyItemInfosDescriptionProps) {
  return (
    <div className={twMerge('flex-col gap-9', '3xl:gap-8')}>
      <div className="flex-col gap-4">
        <p
          className={twMerge(
            'text-white text-sm',
            'leading-none',
            '3xl:text-xs'
          )}
        >
          {description}
        </p>

        <p className={twMerge('text-white text-xs', 'leading-none')}>
          No jogo desde{' '}
          <span className="font-bold leading-none">
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

      {item_type === 'wear' && (
        <div className="flex-col gap-2 rounded bg-gray-700/50 p-3">
          <p className={twMerge('text-white text-sm', '3xl:text-xs')}>
            Esse item será exibido no jogo apenas quando o jogador estiver no{' '}
            <span className="font-semibold">
              lado {subtype === 'ata' ? 'atacante' : 'defensor'}
            </span>
            .
          </p>
        </div>
      )}
    </div>
  )
}
