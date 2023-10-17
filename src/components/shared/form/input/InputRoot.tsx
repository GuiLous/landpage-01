import { ComponentProps, ReactNode } from 'react'

interface InputRootProps extends ComponentProps<'div'> {
  children: ReactNode
}

export function InputRoot({ children, ...props }: InputRootProps) {
  return (
    <div className="flex-initial flex-col gap-2" {...props}>
      {children}
    </div>
  )
}
