import { ComponentProps, ReactNode } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const content = tv({
  base: 'uppercase text-white',
  variants: {
    disabled: {
      true: 'text-sm font-semibold text-gray-400',
    },
    neutral: {
      true: 'text-gray-300 transition-colors group-hover:text-white',
    },
    profile: {
      true: 'text-sm normal-case text-gray-300 transition-colors group-hover:text-white 3xl:text-xs',
    },
    pagination: {
      true: 'text-base font-semibold normal-case text-gray-300 transition-colors group-hover:text-white',
    },
  },
  defaultVariants: {
    disabled: false,
    neutral: false,
    profile: false,
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
  neutral,
  profile,
  pagination,
  ...props
}: ButtonContentProps) {
  return (
    <p
      className={content({ disabled, neutral, profile, pagination, className })}
      {...props}
    >
      {isLoading ? loadingText : children}
    </p>
  )
}
