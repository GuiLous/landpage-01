import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { ReactNode } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const link = tv({
  base: 'text-gray-300 transition-colors duration-[0.2s] ease-in-out hover:text-white active:text-white',
  variants: {
    inline: {
      true: 'underline',
    },
  },
  defaultVariants: {
    inline: false,
  },
})

type LinkProps = NextLinkProps &
  VariantProps<typeof link> & {
    children: ReactNode
    className?: string
    target?: string
  }

export function Link({ children, inline, className, ...props }: LinkProps) {
  return (
    <NextLink className={link({ inline, className })} {...props}>
      {children}
    </NextLink>
  )
}
