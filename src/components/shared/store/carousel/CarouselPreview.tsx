import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

interface CarouselPreviewProps {
  featured: StoreItem[]
  indexContent: number
  setIndexContent: (state: number) => void
}

export function CarouselPreview({
  featured = [],
  indexContent,
  setIndexContent,
}: CarouselPreviewProps) {
  return (
    <div
      className={twMerge(
        'max-w-fit flex-initial items-center gap-4 cursor-pointer absolute right-28 top-[calc(100%_-_58.5px)] z-10',
        '3xl:gap-3.5 3xl:right-[4.625rem] 3xl:top-[calc(100%_-_40.5px)]'
      )}
    >
      {featured.map((item, index) => (
        <div
          key={index}
          className={twMerge(
            'bg-no-repeat bg-cover border border-transparent rounded-lg max-h-[106px] min-h-[106px] max-w-[198px] min-w-[198px] opacity-80 overflow-hidden transition-all',
            'hover:border-white hover:opacity-100',
            indexContent === index && 'border-white opacity-100',
            '3xl:max-h-[76px] 3xl:min-h-[76px] 3xl:max-w-[138px] 3xl:min-w-[138px]'
          )}
          onClick={() => setIndexContent(index)}
          style={{ backgroundImage: `url(${item.featured_image})` }}
        />
      ))}
    </div>
  )
}
