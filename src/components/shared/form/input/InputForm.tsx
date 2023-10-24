import { ComponentProps, ReactNode } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const inputWrapper = tv({
  slots: {
    container: [
      'relative flex-initial rounded bg-white',
      'group',
      'focus-within:outline focus-within:outline-1 focus-within:outline-purple-400',
    ],
    input: [
      'h-full min-h-[42px] w-full rounded border-none bg-transparent px-4 text-gray-500',
      'placeholder:text-gray-300',
      'focus:ring-0',
    ],
  },
  variants: {
    success: {
      true: {
        container: 'outline outline-1 outline-green-400',
        input: '',
      },
    },
    error: {
      true: {
        container: 'outline outline-1 outline-red-500',
        input: '',
      },
    },
    neutral: {
      true: {
        container: 'bg-gray-700',
        input: 'text-xs text-white',
      },
    },
  },
  defaultVariants: {
    success: false,
    error: false,
    neutral: false,
  },
})

type InputFormProps = ComponentProps<'input'> &
  VariantProps<typeof inputWrapper> & {
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
  const { container, input } = inputWrapper({ error, neutral, success })

  return (
    <div className={container({ success, error, neutral })}>
      <input type="text" className={input({ neutral, className })} {...props} />

      {children}
    </div>
  )
}
