import { twMerge } from 'tailwind-merge'

interface ModalBuyItemInfosNameProps {
  isBox: boolean
  isCollection: boolean
  name: string
}

export function ModalBuyItemInfosName({
  isBox,
  isCollection,
  name,
}: ModalBuyItemInfosNameProps) {
  return (
    (isBox || isCollection) && (
      <span
        className={twMerge(
          'font-semibold uppercase leading-none text-gray-300/50',
          '3xl:text-sm'
        )}
      >
        {name}
      </span>
    )
  )
}
