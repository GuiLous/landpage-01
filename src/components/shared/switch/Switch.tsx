'use client'

import * as PrimitiveSwitch from '@radix-ui/react-switch'
import { twMerge } from 'tailwind-merge'

type SwitchProps = PrimitiveSwitch.SwitchProps
type SwitchThumbProps = PrimitiveSwitch.SwitchThumbProps

export function Switch({ className, children, ...props }: SwitchProps) {
  return (
    <PrimitiveSwitch.Root
      className={twMerge(
        'relative h-5 w-[34px] cursor-default rounded-full bg-red-500 outline-non',
        'data-[state=checked]:bg-blue-500',
        'data-[disabled]:bg-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </PrimitiveSwitch.Root>
  )
}

export function SwitchThumb({ className, ...props }: SwitchThumbProps) {
  return (
    <PrimitiveSwitch.Thumb
      className={twMerge(
        'block h-4 w-4 translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform',
        'data-[state=checked]:translate-x-[16px]',
        className
      )}
      {...props}
    />
  )
}

Switch.Thumb = SwitchThumb
