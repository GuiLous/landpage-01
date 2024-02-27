import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface PrefixProps extends ComponentProps<'span'> {
  prefix: string
}

export function Prefix({ prefix, className }: PrefixProps) {
  return (
    <span
      className={twMerge(
        'text-sm uppercase leading-none text-gray-300',
        'ultrawide:text-lg ultrawide:leading-none',
        className
      )}
    >
      {prefix}:
    </span>
  )
}
