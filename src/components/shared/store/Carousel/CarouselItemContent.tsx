import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CarouselItemContentProps {
  name: string
  description: string
  currentIndex: number
  children: ReactNode
}

export function CarouselItemContent({
  name,
  description,
  currentIndex,
  children,
}: CarouselItemContentProps) {
  return (
    <div
      key={currentIndex}
      className={twMerge(
        'max-w-fit flex-initial flex-col gap-10 left-[5%] absolute top-[26%] z-20',
        'animate-carousel',
        '3xl:gap-6'
      )}
    >
      <div className="max-w-fit flex-initial flex-col">
        <h2
          className={twMerge(
            'font-bold uppercase text-5xl leading-none text-white max-w-[485px]',
            '3xl:max-w-[450px] 3xl:text-4xl'
          )}
        >
          {name}
        </h2>
      </div>

      <p
        className={twMerge(
          'text-left text-white max-w-[390px]',
          '3xl:text-sm 3xl:max-w-[285px]'
        )}
      >
        {description}
      </p>

      {children}
    </div>
  )
}
