import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { staticBlurDataUrl } from '@/utils'

interface ModalBuyItemConfirmationImageProps {
  backgroundImage?: string
  foregroundImage: string
}

export function ModalBuyItemConfirmationImage({
  backgroundImage,
  foregroundImage,
}: ModalBuyItemConfirmationImageProps) {
  const hasBackgroundImage = !!backgroundImage

  return (
    <div
      className={twMerge(
        'relative h-[240px] min-h-[240px] w-[240px] overflow-hidden rounded-lg bg-gray-750/40 bg-cover bg-no-repeat',
        '3xl:h-180px 3xl:min-h-[180px] 3xl:w-180px'
      )}
      style={{
        backgroundImage: hasBackgroundImage ? `url(${backgroundImage})` : '',
      }}
    >
      <Image
        src={foregroundImage}
        alt="item image"
        fill
        sizes="100vw"
        priority
        className="absolute object-scale-down p-1"
        placeholder="blur"
        blurDataURL={staticBlurDataUrl()}
      />
    </div>
  )
}
