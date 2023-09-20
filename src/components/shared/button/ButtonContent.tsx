import { ComponentProps, ReactNode } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const content = tv({
  base: 'uppercase text-white',
  variants: {
    disabled: {
      true: 'text-sm font-semibold text-gray-400',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

type ButtonContentProps = ComponentProps<'p'> &
  VariantProps<typeof content> & {
    children: ReactNode
    loadingText?: string
    isLoading?: boolean
  }

export function ButtonContent({
  className,
  children,
  disabled,
  loadingText = 'Enviando',
  isLoading = false,
  ...props
}: ButtonContentProps) {
  return (
    <p className={content({ disabled, className })} {...props}>
      {isLoading ? loadingText : children}
    </p>
  )
}
