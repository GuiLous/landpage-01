import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

const reloadCredits = '/assets/images/reload_credits.png'

export function ModalReloadCoinsCardImage() {
  return (
    <div
      className={twMerge(
        'relative h-16 max-w-16 z-10 flex-initial',
        '3xl:max-w-12 3xl:h-12'
      )}
    >
      <Image
        src={reloadCredits}
        alt="Reload Credits"
        fill
        sizes="100%"
        priority
        draggable={false}
      />
    </div>
  )
}
