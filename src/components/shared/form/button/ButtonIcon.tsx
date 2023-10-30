import { ComponentProps, ElementType } from 'react'
import { IconBaseProps } from 'react-icons'
import { VariantProps, tv } from 'tailwind-variants'

const icon = tv({
  base: 'text-white',
  variants: {
    disabled: {
      true: 'text-gray-400',
    },
    profile: {
      true: 'text-gray-300 transition-colors group-hover:text-white',
    },
  },
  defaultVariants: {
    disabled: false,
    profile: false,
  },
})

type ButtonIconProps = ComponentProps<'button'> &
  VariantProps<typeof icon> &
  IconBaseProps & {
    icon: ElementType
  }

export function ButtonIcon({
  icon: Icon,
  className,
  disabled,
  profile,
  ...props
}: ButtonIconProps) {
  return <Icon className={icon({ disabled, profile, className })} {...props} />
}
