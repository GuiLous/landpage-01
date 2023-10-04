import { Slot } from '@radix-ui/react-slot'
import { ButtonHTMLAttributes } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center gap-2 rounded-[4px] bg-purple-400 py-[0.6875rem] transition-colors duration-[0.2s] ease-in-out hover:bg-purple-300 active:bg-purple-700',
  variants: {
    disabled: {
      true: 'cursor-not-allowed bg-gray-800 text-sm font-semibold text-gray-400 hover:bg-gray-800 active:bg-gray-800',
    },
  },
  defaultVariants: {
    disabled: false,
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
  ...props
}: ButtonRootProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      disabled={disabled}
      className={button({ disabled, className })}
      {...props}
    >
      {props.children}
    </Component>
  )
}
