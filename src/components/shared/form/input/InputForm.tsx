import { ComponentProps, ReactNode, Ref } from 'react'
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
        container:
          'outline outline-1 outline-green-400 focus-within:outline-green-400',
        input: '',
      },
    },
    error: {
      true: {
        container:
          'outline outline-1 outline-red-500 focus-within:outline-red-500',
        input: '',
      },
    },
    neutral: {
      true: {
        container: 'bg-gray-700',
        input: 'text-xs text-white',
      },
    },
    secondary: {
      true: {
        container:
          'border border-gray-700 bg-gray-1200 transition-colors hover:bg-gray-700',
        input: 'px-2 text-xs text-white',
      },
    },
    signup: {
      true: {
        container:
          'border border-gray-700 bg-gray-1000 transition-colors hover:bg-gray-700',
        input: 'pl-12 pr-2 text-sm font-light text-gray-300',
      },
    },
  },
  defaultVariants: {
    success: false,
    error: false,
    neutral: false,
    signup: false,
  },
})

type InputFormProps = ComponentProps<'input'> &
  VariantProps<typeof inputWrapper> & {
    children?: ReactNode
    forwardRef?: Ref<HTMLInputElement>
  }

export function InputForm({
  className,
  children,
  success,
  error,
  neutral,
  signup,
  secondary,
  forwardRef,
  ...props
}: InputFormProps) {
  const { container, input } = inputWrapper({
    error,
    neutral,
    success,
    secondary,
    signup,
  })

  return (
    <div className={container({ success, error, neutral, secondary, signup })}>
      <input
        type="text"
        className={input({ neutral, secondary, signup, className })}
        ref={forwardRef}
        {...props}
      />

      {children}
    </div>
  )
}
