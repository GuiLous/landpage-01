import { ElementType } from 'react'
import { IconBaseProps } from 'react-icons'
import { twMerge } from 'tailwind-merge'

interface CustomIconProps extends IconBaseProps {
  icon: ElementType
}

export function CustomIcon({
  icon: Icon,
  className,
  ...props
}: CustomIconProps) {
  return (
    <Icon className={twMerge('text-white text-lg', className)} {...props} />
  )
}
