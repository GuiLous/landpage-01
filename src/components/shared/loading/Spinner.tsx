import { twMerge } from 'tailwind-merge'

export function Spinner() {
  return (
    <div
      className={twMerge(
        'h-8 w-8 flex-initial items-center justify-center rounded-full',
        'bg-gradient-to-tr from-gray-300 to-transparent',
        'animate-spin'
      )}
    >
      <div
        className={twMerge('h-6 w-6 flex-initial rounded-full bg-gray-800')}
      />
    </div>
  )
}
