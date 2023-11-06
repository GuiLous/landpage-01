import NextLink from 'next/link'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Link } from '../Link'

type GoBackLinkProps = ComponentProps<typeof NextLink>

export function GoBackLinkRoot({
  children,
  className,
  ...props
}: GoBackLinkProps) {
  return (
    <div
      className={twMerge(
        'absolute left-8 top-8 max-w-fit flex-initial',
        className
      )}
    >
      <Link className="flex items-center gap-2.5" {...props}>
        {children}
      </Link>
    </div>
  )
}
