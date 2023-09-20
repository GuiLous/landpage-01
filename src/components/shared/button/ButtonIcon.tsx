import { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonIconProps {
  icon: ElementType
  className?: string
}

export function ButtonIcon({ icon: Icon, className }: ButtonIconProps) {
  return <Icon className={twMerge('text-white', className)} />
}
