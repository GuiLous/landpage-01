import { twMerge } from 'tailwind-merge'

export function LineupHiddenBox() {
  return (
    <div
      className={twMerge(
        'h-[73px] max-h-[73px] w-full',
        '3xl:h-[53px] 3xl:max-h-[53px]',
        'ultrawide:h-36 ultrawide:max-h-36'
      )}
    />
  )
}
