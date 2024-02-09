'use client'

import { Slot } from '@radix-ui/react-slot'
import { ButtonHTMLAttributes, MouseEvent } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

import { useAudio } from '@/hooks'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

const button = tv({
  base: [
    'flex items-center justify-center gap-2 rounded bg-purple-400 py-[0.6875rem]',
    'group',
    'transition-colors duration-[0.2s] ease-in-out',
    'hover:bg-purple-300',
    'active:bg-purple-700',
    'ultrawide:max-h-20 ultrawide:min-h-20',
  ],
  variants: {
    disabled: {
      true: 'cursor-not-allowed bg-gray-800 text-sm font-semibold text-gray-400 hover:bg-gray-800 active:bg-gray-800',
    },
    queued: {
      true: 'bg-purple-500 hover:bg-purple-500',
    },
    restricted: {
      true: 'bg-red-500 hover:bg-red-400 active:bg-red-600',
    },
    neutral: {
      true: 'bg-gray-700 hover:bg-gray-600 active:bg-gray-800 disabled:hover:bg-gray-800',
    },
    profile: {
      true: 'gap-3.5 bg-gray-1100/50 p-3 hover:bg-gray-1100/80 hover:outline hover:outline-1 hover:outline-gray-300/50 active:bg-gray-1100/80',
    },
    ghost: {
      true: 'max-w-fit gap-0 border border-white bg-transparent p-0 hover:bg-transparent active:bg-transparent',
    },
    pagination: {
      true: 'h-8 w-8 cursor-pointer rounded border border-gray-700/50 bg-transparent hover:bg-gray-700/50 active:bg-gray-700/50 disabled:cursor-default disabled:bg-gray-700/50 disabled:hover:bg-gray-700/50',
    },
    light: {
      true: 'bg-purple-300 hover:bg-purple-300 active:bg-purple-300 disabled:bg-purple-300',
    },
  },
  defaultVariants: {
    disabled: false,
    queued: false,
    restricted: false,
    neutral: false,
    profile: false,
    ghost: false,
    pagination: false,
    light: false,
  },
})

type ButtonRootProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    asChild?: boolean
    disableClickSound?: boolean
    disableHoverSound?: boolean
  }

export function ButtonRoot({
  className,
  disabled,
  asChild,
  queued,
  restricted,
  neutral,
  profile,
  ghost,
  pagination,
  light,
  onClick,
  disableClickSound = false,
  disableHoverSound = false,
  ...props
}: ButtonRootProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disableClickSound) playSoundClick()

    if (onClick) onClick(event)
  }

  const Component = asChild ? Slot : 'button'

  return (
    <Component
      onMouseEnter={
        !disabled && !disableHoverSound ? playSoundHover : undefined
      }
      onClick={!disabled ? handleClick : undefined}
      disabled={disabled}
      className={button({
        disabled,
        queued,
        restricted,
        neutral,
        profile,
        ghost,
        pagination,
        light,
        className,
      })}
      {...props}
    >
      {props.children}
    </Component>
  )
}
