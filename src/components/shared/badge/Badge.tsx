import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const badge = tv({
  base: 'absolute -bottom-[1px] -right-[1px] h-3 w-3 rounded-full border-2 border-gray-1100',
  variants: {
    online: {
      true: 'bg-green-600',
    },
    offline: {
      true: 'bg-gray-300',
    },
    teaming: {
      true: 'bg-purple-300',
    },
    in_game: {
      true: 'bg-yellow-500',
    },
    queued: {
      true: 'bg-yellow-500',
    },
    highlight: {
      true: 'relative flex max-w-fit items-center justify-center border-0 bg-purple-400 px-2 py-[0.690rem] text-[0.625rem] uppercase text-white',
    },
  },
  defaultVariants: {
    online: false,
    offline: false,
    teaming: false,
    in_game: false,
    queued: false,
    highlight: false,
  },
})

type BadgeProps = ComponentProps<'div'> & VariantProps<typeof badge>

export function Badge({
  online,
  offline,
  teaming,
  in_game,
  queued,
  highlight,
  className,
  children,
}: BadgeProps) {
  return (
    <div
      className={badge({
        online,
        offline,
        teaming,
        in_game,
        queued,
        highlight,
        className,
      })}
    >
      {children}
    </div>
  )
}
