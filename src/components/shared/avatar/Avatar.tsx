'use client'

import * as PrimitiveAvatar from '@radix-ui/react-avatar'
import { VariantProps, tv } from 'tailwind-variants'

import { Status } from '@/store/slices/userSlice'

import { Badge } from '@/components/shared'

const avatar = tv({
  base: [
    'relative inline-flex h-11 w-11 select-none items-center justify-center rounded-full',
    '3xl:h-[38px] 3xl:w-[38px]',
  ],
  variants: {
    size: {
      xxs: 'h-4 w-4',
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      smd: 'h-[38px] w-[38px]',
      md: 'h-11 w-11 3xl:h-[38px] 3xl:w-[38px]',
      lg: 'h-16 w-16',
      xl: 'h-24 w-24 border-[4px]',
      xxl: 'h-28 w-28 border-[4px] 3xl:h-24 3xl:w-24',
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
        className="h-full w-full rounded-[inherit] object-cover"
      />

      {status && <Badge variant={status} />}
    </PrimitiveAvatar.Root>
  )
}
