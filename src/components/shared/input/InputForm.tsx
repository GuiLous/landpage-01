import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

const input = tv({
  base: 'relative flex-initial rounded-[4px] bg-white focus-within:outline focus-within:outline-1 focus-within:outline-purple-400',
  variants: {
    success: {
      true: 'outline outline-1 outline-green-400',
    },
    error: {
      true: 'outline outline-1 outline-red-500',
    },
  },
  defaultVariants: {
    success: false,
    error: false,
  },
})

type InputFormProps = ComponentProps<'input'> &
  VariantProps<typeof input> & {
    children: ReactNode
  }

export function InputForm({
  className,
  children,
  success,
  error,
  ...props
}: InputFormProps) {
  return (
    <div className={input({ success, error, className })}>
      <input
        type="text"
        className={twMerge(
          'h-full min-h-[42px] w-full rounded-[4px] border-none bg-transparent px-4 text-gray-500 placeholder:text-gray-300 focus:ring-0'
        )}
        {...props}
      />

      {children}
    </div>
  )
}
