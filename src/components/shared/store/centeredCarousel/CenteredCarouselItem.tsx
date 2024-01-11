import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface CenteredCarouselItemProps {
  foreground_image: string
  index: number
  activeSlide: number
}

export function CenteredCarouselItem({
  activeSlide,
  foreground_image,
  index,
}: CenteredCarouselItemProps) {
  return (
    <div
      className={twMerge(
        'bg-gray-700/40 rounded cursor-pointer h-full overflow-hidden p-1 relative',
        activeSlide === index && 'border border-purple-400'
      )}
    >
      <Image
        src={foreground_image}
        alt=""
        className="object-scale-down p-0.5"
        fill
        sizes="100%"
      />
    </div>
  )
}
