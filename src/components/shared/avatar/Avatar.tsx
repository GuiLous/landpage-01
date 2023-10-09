'use client'

import * as PrimitiveAvatar from '@radix-ui/react-avatar'
import { VariantProps, tv } from 'tailwind-variants'

import { Status } from '@/store/slices/userSlice'

import { Badge } from '@/components/shared'

const avatar = tv({
  base: 'relative inline-flex h-11 w-11 select-none items-center justify-center rounded-full 3xl:h-[38px] 3xl:w-[38px]',
  variants: {
    xxs: {
      true: 'h-4 w-4',
    },
    xs: {
      true: 'h-6 w-6',
    },
    sm: {
      true: 'h-8 w-8',
    },
    smd: {
      true: 'h-[38px] w-[38px]',
    },
    md: {
      true: 'h-11 w-11 3xl:h-[38px] 3xl:w-[38px]',
    },
    lg: {
      true: 'h-16 w-16',
    },
    xl: {
      true: 'h-24 w-24 border-[4px]',
    },
    '2xl': {
      true: 'h-28 w-28  border-[4px]',
    },
  },
  defaultVariants: {
    xxs: false,
    xs: false,
    sm: false,
    smd: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  },
})

type AvatarProps = VariantProps<typeof avatar> & {
  avatarUrl: string | undefined
  status?: Status | undefined
  alt?: string
  className?: string
}

export function Avatar({
  avatarUrl,
  status,
  alt = '',
  className,
  ...props
}: AvatarProps) {
  return (
    <PrimitiveAvatar.Root className={avatar({ ...props, className })}>
      <PrimitiveAvatar.Image
        src={avatarUrl}
        alt={alt}
        className="h-full w-full rounded-[inherit] object-cover"
      />

      {status && (
        <Badge
          online={status === 'online'}
          offline={status === 'offline'}
          queued={status === 'queued'}
          in_game={status === 'in_game'}
          teaming={status === 'teaming'}
        />
      )}
    </PrimitiveAvatar.Root>
  )
}
