import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CustomScrollBarProps extends ComponentProps<'div'> {
  children: ReactNode
  height: number
}

export function CustomScrollBar({
  children,
  height,
  className,
}: CustomScrollBarProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ maxHeight: `${height}px`, minHeight: '106%' }}
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
