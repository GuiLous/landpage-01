import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CustomScrollBarProps extends ComponentProps<'div'> {
  children: ReactNode
  wrapperClassName?: string
}

export function CustomScrollBar({
  children,
  className,
  wrapperClassName,
}: CustomScrollBarProps) {
  return (
    <div
      className={twMerge(
        'relative overflow-hidden min-h-[106%]',
        wrapperClassName
      )}
    >
      <div
        className={twMerge(
          'box-content h-full overflow-auto pr-4 w-full',
          '[&::-webkit-scrollbar]:w-1',
          '[&::-webkit-scrollbar-thumb]:bg-purple-400 [&::-webkit-scrollbar-thumb]:rounded',
          '[&::-webkit-scrollbar-track]:bg-white/[0.15] [&::-webkit-scrollbar-track]:rounded',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
