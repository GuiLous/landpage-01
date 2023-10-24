import { twMerge } from 'tailwind-merge'

interface ButtonSpinnerProps {
  bgStyle?: string
  circleStyle?: string
}

export function ButtonSpinner({ bgStyle, circleStyle }: ButtonSpinnerProps) {
  return (
    <div
      className={twMerge(
        'h-4 w-4 flex-initial items-center justify-center rounded-full',
        'bg-gradient-to-tr from-transparent to-gray-300',
        'animate-spin',
        circleStyle
      )}
    >
      <div
        className={twMerge(
          'h-3 w-3 flex-initial rounded-full bg-gray-800',
          bgStyle
        )}
      ></div>
    </div>
  )
}
