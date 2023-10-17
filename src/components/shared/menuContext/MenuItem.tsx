import { useRouter } from 'next/navigation'
import { BsCheckCircleFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { storageService } from '@/services'

import { useAppDispatch, useAppSelector } from '@/store'
import { addToast, toggleFriendList } from '@/store/slices/appSlice'
import { addInvite } from '@/store/slices/inviteSlice'

import { lobbyApi } from '@/api'

import { useShowErrorToast } from '@/hooks'

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
  const { user } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()
  const router = useRouter()
  const showErrorToast = useShowErrorToast()

  const userToken = storageService.get('token')

  const isDisabled = keyMenu === 'invite' && !isAvailable
  const isInvited = keyMenu === 'invite' && alreadyInvited
  const isOnTeam = keyMenu === 'invite' && alreadyOnTeam

  const handleInvite = async () => {
    if (
      !isAvailable ||
      alreadyInvited ||
      alreadyOnTeam ||
      !userToken ||
      !user?.lobby_id ||
      !user?.id
    ) {
      return
    }

    const response = await lobbyApi.createInvite(
      userToken,
      user?.lobby_id,
      user?.id,
      user_id
    )

    if (response.errorMsg) showErrorToast(response.errorMsg)
    else if (response) {
      dispatch(addInvite(response))
      dispatch(
        addToast({
          title: 'Convite enviado',
          variant: 'success',
        })
      )
    }
  }

  const onClickFunction = () => {
    switch (keyMenu) {
      case 'invite':
        handleInvite()
        break

      case 'profile':
        dispatch(toggleFriendList(false))
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
        'min-w-[224px] group items-center cursor-pointer gap-[1.125rem] px-[1.125rem] py-3 hover:bg-[linear-gradient(0deg,_#6847ff4c_0%,_#6847ff4c_100%,_#333)] transition-colors',
        isOnTeam && 'hover:bg-gray-700',
        isDisabled && 'bg-gray-800 cursor-default hover:bg-gray-800',
        isInvited &&
          'bg-[linear-gradient(0deg,_#6847ff4d_0%,_#6847ff4d_100%,_#333)] cursor-default'
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
          'text-xs text-gray-300 transition-colors group-hover:text-white',
          isDisabled && 'text-gray-400 group-hover:text-gray-400',
          isInvited && 'text-white'
        )}
      >
        {isInvited ? 'Convite enviado!' : menuItems[keyMenu].label}
      </span>
    </div>
  )
}
