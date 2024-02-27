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
  const nameSpliced = name.split(' ')
  const firstSentence = nameSpliced[0]
  const secondSentence = nameSpliced.filter((_, index) => index !== 0).join(' ')

  return (
    <div
      key={currentIndex}
      className={twMerge(
        'max-w-fit flex-initial flex-col gap-10 left-[7.42%] absolute top-[15%] z-20',
        'animate-carousel',
        '3xl:gap-6',
        'ultrawide:left-[4.2%]'
      )}
    >
      <div className="max-w-fit flex-initial flex-col">
        <h2
          className={twMerge(
            'font-light -ml-0.5 uppercase text-4xl leading-none text-white',
            'ultrawide:text-5xl'
          )}
        >
          {firstSentence}
        </h2>
        <h2
          className={twMerge(
            'font-bold -ml-0.5 uppercase text-5xl text-start leading-none text-white max-w-[485px]',
            '3xl:max-w-[450px] 3xl:text-4xl',
            'ultrawide:text-6xl'
          )}
        >
          {secondSentence}
        </h2>
      </div>

      <p
        className={twMerge(
          'text-left text-white max-w-[390px]',
          '3xl:text-sm 3xl:max-w-[285px]',
          'ultrawide:text-2xl ultrawide:max-w-[490px]'
        )}
      >
        {description}
      </p>

      {children}
    </div>
  )
}
