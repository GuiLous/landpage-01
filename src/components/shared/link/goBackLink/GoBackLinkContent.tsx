import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type GoBackLinkContentProps = ComponentProps<'span'>

export function GoBackLinkContent({
  children,
  className,
}: GoBackLinkContentProps) {
  return <span className={twMerge('font-medium', className)}>{children}</span>
}
