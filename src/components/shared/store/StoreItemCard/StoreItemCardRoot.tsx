import { ReactNode } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

interface StoreItemCardRootProps {
  purchased?: boolean
  children: ReactNode
}

export function StoreItemCardRoot({
  purchased = false,
  children,
}: StoreItemCardRootProps) {
  const bgGradient =
    'linear-gradient(180deg, rgba(27, 27, 27, 0.6) 0%, #1b1b1b 100%)'

  return (
    <div
      className={twMerge(
        'relative rounded-lg p-px transition-colors',
        !purchased && 'hover:bg-gradient_store_item',
        'group'
      )}
    >
      <div
        className={twMerge(
          'relative z-10 h-[430px] max-h-[430px] cursor-pointer flex-col gap-4 overflow-hidden rounded-lg bg-gray-1100 p-4',
          '3xl:h-[390px] 3xl:max-h-[390px] 3xl:p-3.5'
        )}
      >
        {children}
      </div>

      {purchased && (
        <div
          className="absolute z-10 h-full w-full items-center justify-center gap-2 rounded-lg backdrop-blur-[2px]"
          style={{ background: bgGradient }}
        >
          <BsCheckCircleFill className="text-white" size={20} />

          <span className="text-lg font-bold uppercase text-white">
            Item adquirido
          </span>
        </div>
      )}
    </div>
  )
}
