import { useRouter } from 'next/navigation'
import { BsCheckCircleFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { revalidatePath } from '@/utils'

import { useAppStore } from '@/store/appStore'
import { useInvitesStore } from '@/store/invitesStore'
import { useUserStore } from '@/store/userStore'

import { lobbyApi } from '@/modelsApi'

import { useAuth, useShowErrorToast } from '@/hooks'

import { menuItems } from './MenuContext'
import { MenuItemIcon } from './MenuItemIcon'

export type keysMenuType = 'invite' | 'profile' | 'steam' | 'report'

interface MenuItemProps {
  isAvailable: boolean
  alreadyInvited: boolean
  alreadyOnTeam: boolean
  user_id: number
  steam_url: string
  keyMenu: keysMenuType
  setOpenModalSupport: (state: boolean) => void
}

export function MenuItem({
  alreadyInvited,
  alreadyOnTeam,
  isAvailable,
  steam_url,
  user_id,
  keyMenu,
  setOpenModalSupport,
}: MenuItemProps) {
  const user = useUserStore.getState().user

  const router = useRouter()

  const auth = useAuth()
  const showErrorToast = useShowErrorToast()

  const isDisabled = keyMenu === 'invite' && !isAvailable
  const isInvited = keyMenu === 'invite' && alreadyInvited
  const isOnTeam = keyMenu === 'invite' && alreadyOnTeam

  const handleInvite = async () => {
    if (
      !isAvailable ||
      alreadyInvited ||
      alreadyOnTeam ||
      !auth?.token ||
      !user?.lobby_id ||
      !user?.id
    ) {
      return
    }

    const response = await lobbyApi.createInvite(
      auth.token,
      user?.lobby_id,
      user?.id,
      user_id
    )

    if (response.errorMsg) showErrorToast(response.errorMsg)
    else if (response) {
      useInvitesStore.getState().addInvite(response)

      useAppStore.getState().addToast({
        title: 'Convite enviado',
        variant: 'success',
      })

      revalidatePath({ path: '/' })
    }
  }

  const onClickFunction = () => {
    switch (keyMenu) {
      case 'invite':
        handleInvite()
        break

      case 'profile':
        useAppStore.getState().toggleFriendList(false)
        revalidatePath({ path: `/perfil/${user_id}` })
        router.push(`/perfil/${user_id}`)
        break

      case 'steam':
        window.open(steam_url, '_blank')
        break

      case 'report':
        setOpenModalSupport(true)
        break

      default:
        return null
    }
  }

  return (
    <div
      className={twMerge(
        'min-w-[224px] items-center cursor-pointer gap-[1.125rem] px-[1.125rem] py-3 transition-colors',
        'group',
        'hover:bg-gradient_menu_item',
        isOnTeam && 'hover:bg-gray-700',
        isDisabled && 'bg-gray-800 cursor-default hover:bg-gray-800',
        isInvited && 'bg-gradient_menu_invited cursor-default'
      )}
      onClick={onClickFunction}
    >
      <MenuItemIcon
        icon={isInvited ? BsCheckCircleFill : menuItems[keyMenu].icon}
        className={twMerge(
          'group-hover:text-white',
          isDisabled && 'text-gray-400 group-hover:text-gray-400',
          isInvited && 'text-white'
        )}
        size={18}
      />

      <span
        className={twMerge(
          'text-xs text-gray-300 transition-colors',
          'group-hover:text-white',
          isDisabled && 'text-gray-400 group-hover:text-gray-400',
          isInvited && 'text-white'
        )}
      >
        {isInvited ? 'Convite enviado!' : menuItems[keyMenu].label}
      </span>
    </div>
  )
}
