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
        'max-w-fit flex-initial items-center gap-2.5 cursor-pointer absolute left-[7.5%] top-[calc(100%_-_58.5px)] z-10',
        '3xl:top-[calc(100%_-_40.5px)]'
      )}
    >
      {featured.map((_, index) => (
        <div
          key={index}
          className={twMerge(
            'min-w-2 h-2 bg-white/40 overflow-hidden transition-all cursor-pointer rounded-full',
            indexContent === index && 'min-w-8'
          )}
          onClick={() => setIndexContent(index)}
        >
          {indexContent === index && (
            <div className="animate-carousel-preview bg-white/80" />
          )}
        </div>
      ))}
    </div>
  )
}
