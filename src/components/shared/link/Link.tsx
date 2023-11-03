import { Slot } from '@radix-ui/react-slot'
import NextLink from 'next/link'
import { ComponentProps, ReactNode, Ref } from 'react'
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

type LinkProps = VariantProps<typeof link> &
  ComponentProps<typeof NextLink> & {
    children: ReactNode
    className?: string
    target?: string
    asChild?: boolean
    forwardRef?: Ref<HTMLAnchorElement>
  }

export function Link({
  children,
  inline,
  className,
  asChild,
  forwardRef,
  ...props
}: LinkProps) {
  const Component = asChild ? Slot : NextLink

  return (
    <Component
      ref={forwardRef}
      className={link({ inline, className })}
      {...props}
    >
      {children}
    </Component>
  )
}
