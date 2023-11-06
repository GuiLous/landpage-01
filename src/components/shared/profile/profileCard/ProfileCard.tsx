import { ComponentProps, ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

import { ProfileCardIcon } from './ProfileCardIcon'

const cardWrapper = tv({
  slots: {
    container: ['flex-col gap-9 rounded bg-gray-1100 p-6', '3xl:gap-7 3xl:p-5'],
    cardTitle: 'font-bold uppercase leading-none text-white',
  },
  variants: {
    variant: {
      account: {
        container: 'gap-8 p-10 3xl:gap-7 3xl:p-6',
        title: 'font-semibold',
      },
    },
  },
})

type ProfileCardProps = ComponentProps<'input'> &
  VariantProps<typeof cardWrapper> & {
    children?: ReactNode
    title?: string
    icon?: ElementType
    description?: string
  }

export function ProfileCard({
  children,
  variant,
  title,
  icon,
  description,
}: ProfileCardProps) {
  const { container, cardTitle } = cardWrapper({ variant })

  return (
    <section className={container({ variant })}>
      {title && (
        <div className="flex-col gap-3">
          <div className="items-center gap-2.5">
            {icon && <ProfileCardIcon icon={icon} size={22} />}

            <h3 className={cardTitle({ variant })}>{title}</h3>
          </div>

          {description && (
            <p className={twMerge('text-gray-300', '3xl:text-sm')}>
              {description}
            </p>
          )}
        </div>
      )}

      <div>{children}</div>
    </section>
  )
}
