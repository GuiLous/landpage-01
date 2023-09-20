import { ComponentProps, ElementType } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const icon = tv({
  base: 'absolute right-2 top-1/4 text-[22px] text-white',
  variants: {
    success: {
      true: 'text-green-400',
    },
    error: {
      true: 'text-red-500',
    },
  },
  defaultVariants: {
    success: false,
    error: false,
  },
})

type InputRightIconProps = ComponentProps<'button'> &
  VariantProps<typeof icon> & {
    icon: ElementType
  }

export function InputRightIcon({
  icon: Icon,
  success,
  error,
  className,
}: InputRightIconProps) {
  return <Icon className={icon({ success, error, className })} />
}
