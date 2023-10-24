import { Slot } from '@radix-ui/react-slot'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { ReactNode } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const link = tv({
  base: [
    'text-gray-300',
    'transition-colors duration-[0.2s] ease-in-out',
    'active:text-white',
    'hover:text-white',
  ],
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
    asChild?: boolean
  }

export function Link({
  children,
  inline,
  className,
  asChild,
  ...props
}: LinkProps) {
  const Component = asChild ? Slot : NextLink

  return (
    <Component className={link({ inline, className })} {...props}>
      {children}
    </Component>
  )
}
