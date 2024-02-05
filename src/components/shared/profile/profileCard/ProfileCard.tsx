import { ComponentProps, ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

import { ProfileCardIcon } from './ProfileCardIcon'

const cardWrapper = tv({
  slots: {
    container: [
      'flex-col gap-9 rounded bg-gray-1100 p-6',
      '3xl:gap-7 3xl:p-5',
      'ultrawide:gap-14',
    ],
    cardTitle: [
      'font-bold uppercase leading-none text-white',
      'ultrawide:text-2xl ultrawide:leading-none',
    ],
  },
  variants: {
    variant: {
      account: {
        container: 'gap-8 p-10 3xl:gap-7 3xl:p-6',
        cardTitle: 'font-semibold',
      },
    },
  },
})

type ProfileCardProps = ComponentProps<'div'> &
  VariantProps<typeof cardWrapper> & {
    children?: ReactNode
    title?: string
    icon?: ElementType
    description?: string
    maxWidth?: string
  }

export function ProfileCard({
  children,
  variant,
  title,
  icon,
  description,
  maxWidth = '100%',
}: ProfileCardProps) {
  const { container, cardTitle } = cardWrapper({ variant })

  return (
    <section
      className={container({ variant })}
      style={{ maxWidth: `${maxWidth}` }}
    >
      {title && (
        <div className="flex-initial flex-col gap-3">
          <div className="items-center gap-2.5">
            {icon && (
              <ProfileCardIcon
                icon={icon}
                className={twMerge('text-[1.375rem] ultrawide:text-3xl')}
              />
            )}

            <h3 className={cardTitle({ variant })}>{title}</h3>
          </div>

          {description && (
            <p
              className={twMerge(
                'text-gray-300',
                '3xl:text-sm',
                'ultrawide:text-2xl'
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  )
}
