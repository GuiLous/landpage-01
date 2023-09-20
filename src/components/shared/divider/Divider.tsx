import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type DividerProps = ComponentProps<'div'>

export function Divider({ className, ...props }: DividerProps) {
  return (
    <div
      className={twMerge(
        'min-h-[1px] flex-initial bg-gray-500 opacity-60',
        className
      )}
      {...props}
    />
  )
}
