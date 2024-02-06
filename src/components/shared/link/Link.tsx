'use client'

import { Slot } from '@radix-ui/react-slot'
import NextLink from 'next/link'
import { ComponentProps, MouseEvent, ReactNode, Ref } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

import { useAudio } from '@/hooks'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

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
  onClick,
  ...props
}: LinkProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    playSoundClick()

    if (onClick) onClick(event)
  }

  const Component = asChild ? Slot : NextLink

  return (
    <Component
      ref={forwardRef}
      onMouseEnter={!inline ? playSoundHover : undefined}
      onClick={handleClick}
      className={link({ inline, className })}
      {...props}
    >
      {children}
    </Component>
  )
}
