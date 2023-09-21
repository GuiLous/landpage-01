import { ComponentProps } from 'react'
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

type ButtonRootProps = ComponentProps<'button'> & VariantProps<typeof button>

export function ButtonRoot({ className, disabled, ...props }: ButtonRootProps) {
  return (
    <button
      disabled={disabled}
      className={button({ disabled, className })}
      {...props}
    >
      {props.children}
    </button>
  )
}
