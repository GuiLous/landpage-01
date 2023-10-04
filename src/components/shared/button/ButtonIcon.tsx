import { ComponentProps, ElementType } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const icon = tv({
  base: 'text-white',
  variants: {
    disabled: {
      true: 'text-gray-400',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

type ButtonIconProps = ComponentProps<'button'> &
  VariantProps<typeof icon> & {
    icon: ElementType
  }

export function ButtonIcon({
  icon: Icon,
  className,
  disabled,
  ...props
}: ButtonIconProps) {
  return <Icon className={icon({ disabled, className })} {...props} />
}
