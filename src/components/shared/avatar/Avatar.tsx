'use client'

import * as PrimitiveAvatar from '@radix-ui/react-avatar'
import { twMerge } from 'tailwind-merge'

import { Status } from '@/store/slices/userSlice'

import { Badge } from '@/components/shared'

interface AvatarProps {
  avatarUrl: string | undefined
  status: Status | undefined
  alt?: string
  rootStyle?: string
  imageStyle?: string
}

export function Avatar({
  avatarUrl,
  status,
  alt = '',
  imageStyle,
  rootStyle,
}: AvatarProps) {
  return (
    <PrimitiveAvatar.Root
      className={twMerge(
        'relative inline-flex h-11 w-11 select-none items-center justify-center rounded-full 3xl:h-[38px] 3xl:w-[38px]',
        rootStyle
      )}
    >
      <PrimitiveAvatar.Image
        src={avatarUrl}
        alt={alt}
        className={twMerge(
          'h-full w-full rounded-[inherit] object-cover',
          imageStyle
        )}
      />

      <Badge
        online={status === 'online'}
        offline={status === 'offline'}
        queued={status === 'queued'}
        in_game={status === 'in_game'}
        teaming={status === 'teaming'}
      />
    </PrimitiveAvatar.Root>
  )
}
