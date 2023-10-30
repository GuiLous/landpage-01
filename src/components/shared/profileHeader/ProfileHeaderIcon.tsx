import { ElementType } from 'react'
import { IconBaseProps } from 'react-icons'
import { twMerge } from 'tailwind-merge'

interface ProfileHeaderIconProps extends IconBaseProps {
  icon: ElementType
}

export function ProfileHeaderIcon({
  icon: Icon,
  className,
  ...props
}: ProfileHeaderIconProps) {
  return (
    <Icon className={twMerge('text-white text-lg', className)} {...props} />
  )
}
