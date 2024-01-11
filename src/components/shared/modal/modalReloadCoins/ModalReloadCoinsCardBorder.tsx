import { twMerge } from 'tailwind-merge'

export function ModalReloadCoinsCardBorder() {
  return (
    <div
      className={twMerge(
        'bg-purple-400 rounded-t-lg opacity-0 transition-opacity min-h-1.5',
        'group-hover:opacity-100',
        '3xl:min-h-1'
      )}
    />
  )
}
