import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface LinkProps extends NextLinkProps {
  children: ReactNode
  className?: string
}

export function Link({ children, className, ...props }: LinkProps) {
  return (
    <NextLink
      className={twMerge(
        'text-gray-300 transition-colors duration-[0.2s] ease-in-out hover:text-white active:text-white',
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}
