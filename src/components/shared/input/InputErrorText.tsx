import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputErrorTextProps extends ComponentProps<'p'> {
  className?: string
  errorMsg: ReactNode
}

export function InputErrorText({
  className,
  errorMsg,
  ...props
}: InputErrorTextProps) {
  return (
    <p className={twMerge('text-sm text-red-500', className)} {...props}>
      {errorMsg}
    </p>
  )
}
