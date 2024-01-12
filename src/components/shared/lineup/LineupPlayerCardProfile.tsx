import { Avatar } from '@/components/shared'

interface LineupPlayerCardProfileProps {
  avatar: string
}

export function LineupPlayerCardProfile({
  avatar,
}: LineupPlayerCardProfileProps) {
  return (
    <Avatar
      avatarUrl={avatar}
      size="md"
      alt="Imagem de perfil"
      className="border-2 border-white "
    />
  )
}
