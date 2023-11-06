import { ElementType } from '@react-spring/web'
import { IconBaseProps } from 'react-icons'
import { twMerge } from 'tailwind-merge'

type GoBackLinkIconProps = IconBaseProps & {
  icon: ElementType
}

export function GoBackLinkIcon({
  icon: Icon,
  className,
  ...props
}: GoBackLinkIconProps) {
  return <Icon className={twMerge(className)} {...props} />
}
