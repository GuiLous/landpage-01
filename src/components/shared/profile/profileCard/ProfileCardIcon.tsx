import { ElementType } from '@react-spring/web'
import { IconBaseProps } from 'react-icons'
import { twMerge } from 'tailwind-merge'

type ProfileCardIconProps = IconBaseProps & {
  icon: ElementType
}

export function ProfileCardIcon({
  icon: Icon,
  className,
  ...props
}: ProfileCardIconProps) {
  return <Icon className={twMerge('text-white', className)} {...props} />
}
