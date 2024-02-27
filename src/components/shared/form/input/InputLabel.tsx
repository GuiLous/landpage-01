import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputLabelProps extends ComponentProps<'label'> {
  className?: string
  label: string
}

export function InputLabel({ className, label, ...props }: InputLabelProps) {
  return (
    <label
      className={twMerge(
        'font-medium text-white leading-none',
        'ultrawide:text-2xl ultrawide:leading-none',
        className
      )}
      {...props}
    >
      {label}
    </label>
  )
}
