import { twMerge } from 'tailwind-merge'

export function ModalReloadCoinsCardGradient() {
  return (
    <div
      className={twMerge(
        'absolute bottom-0 left-0 right-0 top-full transition-all',
        'group-hover:top-0 group-hover:bg-gradient_rc_card'
      )}
    />
  )
}
