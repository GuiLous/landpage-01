import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: 'flex gap-2 py-[0.6875rem] items-center justify-center bg-purple-400 rounded-[4px] hover:bg-purple-300 transition-colors ease-in-out duration-[0.2s] active:bg-purple-700',
  variants: {
    disabled: {
      true: 'bg-gray-800 text-gray-400 font-semibold text-sm cursor-not-allowed hover:bg-gray-800 active:bg-gray-800',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

type ButtonRootProps = ComponentProps<'button'> & VariantProps<typeof button>

export function ButtonRoot({ className, disabled, ...props }: ButtonRootProps) {
  return (
    <button className={button({ disabled, className })} {...props}>
      {props.children}
    </button>
  )
}
