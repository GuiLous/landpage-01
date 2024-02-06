import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

interface CarouselPreviewProps {
  featured: StoreItem[]
  indexContent: number
  openModalBuyItem: boolean
  setIndexContent: (state: number) => void
}

export function CarouselPreview({
  featured = [],
  indexContent,
  openModalBuyItem,
  setIndexContent,
}: CarouselPreviewProps) {
  const showTimer = featured.length > 1

  return (
    <div
      className={twMerge(
        'max-w-fit flex-initial items-center gap-2.5 cursor-pointer absolute left-[7.5%] top-[calc(100%_-_58.5px)] z-10',
        '3xl:top-[calc(100%_-_40.5px)]',
        'ultrawide:left-[4.2%]'
      )}
    >
      {featured.map((_, index) => (
        <div
          key={index}
          className={twMerge(
            'min-w-2 h-2 bg-white/40 overflow-hidden transition-all cursor-pointer rounded-full',
            indexContent === index && showTimer && 'min-w-8'
          )}
          onClick={() => setIndexContent(index)}
        >
          {indexContent === index && showTimer && (
            <div
              className={twMerge(
                !openModalBuyItem && 'animate-carousel-preview bg-white/80'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
