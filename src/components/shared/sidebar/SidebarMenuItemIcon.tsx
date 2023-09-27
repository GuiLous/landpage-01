import { ElementType } from 'react'
import { IconBaseProps } from 'react-icons'
import { twMerge } from 'tailwind-merge'

interface SidebarMenuItemIconProps extends IconBaseProps {
  icon: ElementType
}

export function SidebarMenuItemIcon({
  icon: Icon,
  className,
  ...props
}: SidebarMenuItemIconProps) {
  return <Icon className={twMerge('text-gray-300', className)} {...props} />
}
