import { useUserStore } from '@/store/userStore'

import { Button } from '@/components/shared'

interface InviteBarProps {
  setOpenModalSendInvites: (state: boolean) => void
}

export function InviteBar({ setOpenModalSendInvites }: InviteBarProps) {
  const user = useUserStore.getState().user

  return (
    <header className="mt-12 max-h-12 animate-show-invite-bar items-center justify-center gap-6 bg-purple-400 py-2">
      <h2 className="leading-none text-white">
        Você ainda tem{' '}
        <span className="font-semibold leading-none text-white">
          {String(user?.invites_available_count).padStart(2, '0')} convites
        </span>{' '}
        sobrando. Chama sua tropa e jogue agora!
      </h2>

      <Button.Root
        onClick={() => setOpenModalSendInvites(true)}
        className="max-h-[38px] min-h-[38px] max-w-fit bg-purple-700 px-4"
      >
        <Button.Content className="text-sm font-semibold">
          Convidar
        </Button.Content>
      </Button.Root>
    </header>
  )
}
