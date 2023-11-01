import { Slot } from '@radix-ui/react-slot'
import { ButtonHTMLAttributes } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: [
    'flex items-center justify-center gap-2 rounded bg-purple-400 py-[0.6875rem]',
    'group',
    'transition-colors duration-[0.2s] ease-in-out',
    'hover:bg-purple-300',
    'active:bg-purple-700',
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
      true: 'gap-3.5 border border-gray-700 bg-gray-1100/50 p-3 hover:border-gray-300/50 hover:bg-gray-1100/80 active:bg-gray-1100/80',
    },
    ghost: {
      true: 'max-w-fit gap-0 border border-white bg-transparent p-0 hover:bg-transparent active:bg-transparent',
    },
    pagination: {
      true: 'h-8 w-8 cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-400 active:bg-gray-700 disabled:cursor-default disabled:bg-gray-400 disabled:hover:bg-gray-400',
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
  },
})

type ButtonRootProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    asChild?: boolean
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
  ...props
}: ButtonRootProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      disabled={disabled}
      className={button({
        disabled,
        queued,
        restricted,
        neutral,
        profile,
        ghost,
        pagination,
        className,
      })}
      {...props}
    >
      {props.children}
    </Component>
  )
}
