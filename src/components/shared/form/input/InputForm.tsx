import { ComponentProps, ReactNode } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const inputWrapper = tv({
  base: 'group relative flex-initial rounded-[4px] bg-white focus-within:outline focus-within:outline-1 focus-within:outline-purple-400',
  variants: {
    success: {
      true: 'outline outline-1 outline-green-400',
    },
    error: {
      true: 'outline outline-1 outline-red-500',
    },
    neutral: {
      true: 'bg-gray-700',
    },
  },
  defaultVariants: {
    success: false,
    error: false,
    neutral: false,
  },
})

const input = tv({
  base: 'h-full min-h-[42px] w-full rounded-[4px] border-none bg-transparent px-4 text-gray-500 placeholder:text-gray-300 focus:ring-0',
  variants: {
    neutral: {
      true: 'text-xs text-white',
    },
  },
  defaultVariants: {
    neutral: false,
  },
})

type InputFormProps = ComponentProps<'input'> &
  VariantProps<typeof inputWrapper> &
  VariantProps<typeof input> & {
    children: ReactNode
  }

export function InputForm({
  className,
  children,
  success,
  error,
  neutral,
  ...props
}: InputFormProps) {
  return (
    <div className={inputWrapper({ success, error, neutral })}>
      <input type="text" className={input({ neutral, className })} {...props} />

      {children}
    </div>
  )
}
