import { Avatar, Tooltip } from '@/components/shared'

import { ProfileHeaderAvatarSync } from './ProfileHeaderAvatarSync'

interface ProfileHeaderAvatarProps {
  avatarUrl: string
  isUserLogged: boolean
}

export function ProfileHeaderAvatar({
  avatarUrl,
  isUserLogged,
}: ProfileHeaderAvatarProps) {
  return (
    <div className="relative max-w-fit flex-initial">
      <Avatar
        avatarUrl={avatarUrl}
        alt="Foto do usuário"
        size="xxl"
        className="border-white"
      />

      {isUserLogged && (
        <Tooltip
          content="Sincronizar com Steam"
          side="bottom"
          className="px-2 py-2 text-xs"
        >
          <ProfileHeaderAvatarSync />
        </Tooltip>
      )}
    </div>
  )
}
