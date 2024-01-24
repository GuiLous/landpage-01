import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

const customScrollBar = tv({
  base: [
    'box-content h-full w-full overflow-auto pr-4',
    '[&::-webkit-scrollbar]:w-1',
    '[&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-purple-400',
    '[&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-track]:bg-white/[0.15]',
  ],
  variants: {
    dark: {
      true: 'pr-[0.3125rem] [&::-webkit-scrollbar-thumb]:bg-gray-1100 [&::-webkit-scrollbar-track]:bg-transparent',
    },
  },
  defaultVariants: {
    dark: false,
  },
})

type CustomScrollBarProps = ComponentProps<'div'> &
  VariantProps<typeof customScrollBar> & {
    wrapperClassName?: string
  }

export function CustomScrollBar({
  children,
  className,
  wrapperClassName,
  dark,
}: CustomScrollBarProps) {
  return (
    <div
      className={twMerge(
        'relative overflow-hidden min-h-[106%]',
        wrapperClassName
      )}
    >
      <div
        className={customScrollBar({
          dark,
          className,
        })}
      >
        {children}
      </div>
    </div>
  )
}
