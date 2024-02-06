import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const textArea = tv({
  base: [
    'min-h-[98px] w-full resize-none rounded border border-gray-700 bg-gray-1200 text-xs text-white',
    'placeholder:text-gray-300',
    'hover:border-purple-400',
    'focus:border-purple-400 focus:text-white focus:ring-0 focus:placeholder:text-white',
    '3xl:min-h-[68px]',
    'ultrawide:min-h-32 ultrawide:text-xl ultrawide:placeholder:text-xl',
  ],
  variants: {
    error: {
      true: 'border-red-500',
    },
  },
  defaultVariants: {
    error: false,
  },
})

type TextAreaProps = ComponentProps<'textarea'> & VariantProps<typeof textArea>

export function TextArea({ error, className, ...props }: TextAreaProps) {
  return <textarea className={textArea({ error, className })} {...props} />
}
