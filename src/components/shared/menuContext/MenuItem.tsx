'use client'

import { useRouter } from 'next/navigation'
import { BsCheckCircleFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { revalidatePath } from '@/utils'

import { useAppStore } from '@/store/appStore'
import { useFriendsStore } from '@/store/friendStore'
import { useInvitesStore } from '@/store/invitesStore'
import { useUserStore } from '@/store/userStore'

import { friendsApi, lobbyApi } from '@/modelsApi'

import { useAuth, useShowErrorToast } from '@/hooks'

import { menuItems } from './MenuContext'
import { MenuItemIcon } from './MenuItemIcon'

export type keysMenuType =
  | 'invite'
  | 'profile'
  | 'steam'
  | 'report'
  | 'remove'
  | 'exit'
  | 'friendRemove'
  | 'friendAdd'

interface MenuItemProps {
  isAvailable: boolean
  alreadyInvited: boolean
  alreadyOnTeam: boolean
  user_id: number
  steam_url: string
  keyMenu: keysMenuType
  username?: string
  isFriendRemove?: boolean
  isFriendAdd?: boolean
  onClose?: false | (() => Promise<void>)
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
  username,
  isFriendAdd = false,
  isFriendRemove = false,
  onClose,
}: MenuItemProps) {
  const { addToast, toggleFriendList } = useAppStore()
  const { user } = useUserStore()
  const {
    friends,
    addFriendSentRequest,
    removeFriend,
    removeFriendSentRequest,
  } = useFriendsStore()
  const { addInvite } = useInvitesStore()

  const router = useRouter()

  const auth = useAuth()
  const showErrorToast = useShowErrorToast()

  const userAlreadyInvitedToFriend = !!friends?.requests.sent.find(
    (invite) => invite.user_to.user_id === user_id
  )

  const isDisabled = keyMenu === 'invite' && !isAvailable
  const isInvited = keyMenu === 'invite' && alreadyInvited
  const isOnTeam = keyMenu === 'invite' && alreadyOnTeam

  const isKeyRemoveOrReport = keyMenu === 'remove' || keyMenu === 'report'

  const checkIfIsAlreadyInvited = () => {
    if (isInvited) return true
    if (isFriendAdd && userAlreadyInvitedToFriend) return true

    return false
  }

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
      addInvite(response)

      addToast({
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
        toggleFriendList(false)
        revalidatePath({ path: `/perfil/${user_id}` })
        router.push(`/perfil/${user_id}`)
        break

      case 'steam':
        window.open(steam_url, '_blank')
        break

      case 'report':
        setOpenModalSupport(true)
        break

      case 'remove':
        if (onClose) onClose()
        break

      case 'exit':
        if (onClose) onClose()
        break

      case 'friendAdd':
        handleFriendAdd()
        break

      case 'friendRemove':
        handleFriendRemove()
        break

      default:
        return null
    }
  }

  const handleFriendAdd = async () => {
    if (userAlreadyInvitedToFriend || !auth?.token || !username) return

    const response = await friendsApi.add(auth.token, username)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
      return
    }

    addToast({
      title: 'Solicitação enviada',
      variant: 'success',
    })

    addFriendSentRequest(response)

    revalidatePath({ path: '/' })
  }

  const handleFriendRemove = async () => {
    if (!auth?.token || !user_id) return

    const response = await friendsApi.remove(auth.token, user_id)
    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      return
    }

    removeFriendSentRequest(user_id)
    removeFriend('online', user_id)
    removeFriend('offline', user_id)

    addToast({
      title: 'Amigo removido',
      variant: 'info',
    })

    revalidatePath({ path: '/' })
  }

  return (
    <button
      className={twMerge(
        'min-w-[224px] flex flex-1 w-full items-center cursor-pointer gap-[1.125rem] px-[1.125rem] py-3 transition-colors',
        'group',
        'focus:border-none focus:outline-0',
        'hover:bg-gradient_menu_item',
        isOnTeam && 'hover:bg-gray-700',
        isDisabled && 'bg-gray-800 cursor-default hover:bg-gray-800',
        checkIfIsAlreadyInvited() && 'bg-gradient_menu_invited cursor-default'
      )}
      onClick={onClickFunction}
    >
      <MenuItemIcon
        icon={
          checkIfIsAlreadyInvited()
            ? BsCheckCircleFill
            : menuItems[keyMenu].icon
        }
        className={twMerge(
          'text-lg',
          'group-hover:text-white',
          isDisabled && 'text-gray-400 group-hover:text-gray-400',
          checkIfIsAlreadyInvited() && 'text-white',
          isKeyRemoveOrReport && 'text-xl'
        )}
      />

      <span
        className={twMerge(
          'text-xs text-gray-300 transition-colors',
          'group-hover:text-white ',
          isDisabled && 'text-gray-400 group-hover:text-gray-400',
          checkIfIsAlreadyInvited() && 'text-white'
        )}
      >
        {isFriendAdd &&
          (userAlreadyInvitedToFriend
            ? 'Solicitação enviada!'
            : menuItems[keyMenu].label)}

        {!isFriendAdd &&
          (isInvited && !isFriendRemove
            ? 'Convite enviado!'
            : menuItems[keyMenu].label)}
      </span>
    </button>
  )
}
