import { ComponentProps, ElementType } from 'react'
import { IconBaseProps } from 'react-icons'
import { VariantProps, tv } from 'tailwind-variants'

const icon = tv({
  base: [
    'absolute right-2 top-1/2 -translate-y-2/4 text-[1.375rem] text-white',
    'ultrawide:text-5xl',
    'group-focus-within:text-white',
  ],
  variants: {
    success: {
      true: 'text-green-400 group-focus-within:text-green-400',
    },
    error: {
      true: 'text-red-500 group-focus-within:text-red-500',
    },
  },
  defaultVariants: {
    success: false,
    error: false,
  },
})

type InputIconProps = ComponentProps<'button'> &
  VariantProps<typeof icon> &
  IconBaseProps & {
    icon: ElementType
  }

export function InputIcon({
  icon: Icon,
  success,
  error,
  className,
  ...props
}: InputIconProps) {
  return <Icon className={icon({ success, error, className })} {...props} />
}
