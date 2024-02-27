import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const badge = tv({
  base: [
    'absolute -bottom-px -right-px h-3 w-3 rounded-full border-2 border-gray-1100',
    'ultrawide:-right-1 ultrawide:bottom-0.5 ultrawide:h-6 ultrawide:w-6 ultrawide:border-4',
  ],
  variants: {
    variant: {
      online: 'bg-green-600',
      offline: 'bg-gray-300',
      away: 'bg-gray-300',
      teaming: 'bg-yellow-300',
      in_game: 'bg-yellow-500',
      queued: 'bg-yellow-500',
      highlight: [
        'relative flex max-w-fit items-center justify-center border-0 bg-purple-400 px-2 py-[0.690rem] text-[0.625rem] uppercase text-white',
        'ultrawide:px-4 ultrawide:py-4 ultrawide:text-xl',
      ],
    },
  },
  defaultVariants: {
    variant: 'online',
  },
})

type BadgeProps = ComponentProps<'div'> & VariantProps<typeof badge>

export function Badge({ variant, className, children }: BadgeProps) {
  return (
    <div
      className={badge({
        variant,
        className,
      })}
    >
      {children}
    </div>
  )
}
