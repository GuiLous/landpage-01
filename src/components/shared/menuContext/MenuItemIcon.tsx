import { ElementType } from 'react'
import { IconBaseProps } from 'react-icons'
import { twMerge } from 'tailwind-merge'

interface MenuItemIconProps extends IconBaseProps {
  icon: ElementType
}

export function MenuItemIcon({
  icon: Icon,
  className,
  ...props
}: MenuItemIconProps) {
  return (
    <Icon
      className={twMerge('text-gray-300 transition', className)}
      {...props}
    />
  )
}
