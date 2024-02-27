'use client'

import * as PrimitiveAvatar from '@radix-ui/react-avatar'
import { VariantProps, tv } from 'tailwind-variants'

import { Status } from '@/store/userStore'

import { Badge } from '@/components/shared'

const avatar = tv({
  base: [
    'relative inline-flex max-h-11 min-h-11 min-w-11 max-w-11 select-none items-center justify-center rounded-full',
    '3xl:max-h-[38px] 3xl:min-h-[38px] 3xl:min-w-[38px] 3xl:max-w-[38px]',
    'ultrawide:max-h-20 ultrawide:min-h-20 ultrawide:min-w-20 ultrawide:max-w-20',
  ],
  variants: {
    size: {
      xxs: 'max-h-4 min-h-4 min-w-4 max-w-4',
      xs: 'max-h-6 min-h-6 min-w-6 max-w-6',
      sm: 'max-h-8 min-h-8 min-w-8 max-w-8',
      smd: 'max-h-[38px] min-h-[38px] min-w-[38px] max-w-[38px]',
      md: 'max-h-11 min-h-11 min-w-11 max-w-11 3xl:max-h-[38px] 3xl:min-h-[38px] 3xl:min-w-[38px] 3xl:max-w-[38px] ultrawide:max-h-20 ultrawide:min-h-20 ultrawide:min-w-20 ultrawide:max-w-20',
      lg: 'max-h-16 min-h-16 min-w-16 max-w-16',
      xl: 'max-h-24 min-h-24 min-w-24 max-w-24 border-[4px]',
      xxl: 'max-h-28 min-h-28 min-w-28 max-w-28 border-[4px] 3xl:max-h-24 3xl:min-h-24 3xl:min-w-24 3xl:max-w-24 ultrawide:max-h-44 ultrawide:min-h-44 ultrawide:min-w-44 ultrawide:max-w-44',
    },
  },
  defaultVariants: {
    size: 'md',
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
  size,
}: AvatarProps) {
  return (
    <PrimitiveAvatar.Root className={avatar({ size, className })}>
      <PrimitiveAvatar.Image
        src={avatarUrl}
        alt={alt}
        className="h-full min-w-full rounded-[inherit] object-contain"
      />

      {status && <Badge variant={status} />}
    </PrimitiveAvatar.Root>
  )
}
