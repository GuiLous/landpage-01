import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ErrorMessageProps {
  children: ReactNode
  className?: string
}

export function ErrorMessage({ children, className }: ErrorMessageProps) {
  return (
    <p
      className={twMerge(
        'mt-3 text-xs font-medium text-red-500',
        'ultrawide:text-xl',
        className
      )}
    >
      {children}
    </p>
  )
}
