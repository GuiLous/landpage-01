'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useCallback, useState } from 'react'
import { BiSolidMessage } from 'react-icons/bi'
import { BsBackpack2Fill } from 'react-icons/bs'
import { FaUser, FaUserCheck } from 'react-icons/fa'
import { MdPersonAddAlt1, MdPersonRemoveAlt1 } from 'react-icons/md'
import { RiErrorWarningFill } from 'react-icons/ri'
import { TbSettingsFilled } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'

import { LINK_PATHS, USER_LOGGED_BUTTONS } from '@/constants'

import { useAppStore } from '@/store/appStore'
import { useFriendsStore } from '@/store/friendStore'
import { useUserStore } from '@/store/userStore'

import { friendsApi } from '@/modelsApi'

import { Button, ModalSupport, Tooltip } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

type ButtonType =
  | 'profile'
  | 'inventory'
  | 'config'
  | 'steam_chat'
  | 'report'
  | 'addFriend'
  | 'removeFriend'
type LinkType = 'perfil' | 'conta' | 'inventario'

interface ProfileHeaderTabsButtonsProps {
  userId: number
  isUserLogged: boolean
  username: string
}

const profileButtons = {
  addFriend: { icon: MdPersonAddAlt1, label: 'Adicionar amigo', size: 20 },
  removeFriend: {
    icon: MdPersonRemoveAlt1,
    label: 'Remover amigo',
    size: 22,
  },
  profile: { icon: FaUser, label: 'Meu perfil' },
  inventory: { icon: BsBackpack2Fill, label: 'Inventário' },
  config: { icon: TbSettingsFilled, label: 'Configurações' },
  steam_chat: { icon: BiSolidMessage, label: 'Abrir bate-papo' },
  report: { icon: RiErrorWarningFill, label: 'Reportar usuário' },
}

export function ProfileHeaderTabsButtons({
  userId,
  isUserLogged,
  username,
}: ProfileHeaderTabsButtonsProps) {
  const { addToast } = useAppStore()
  const { user } = useUserStore()
  const {
    friends,
    addFriendSentRequest,
    removeFriend,
    removeFriendSentRequest,
  } = useFriendsStore()

  const pathname = usePathname()

  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [openModalSupport, setOpenModalSupport] = useState(false)

  const lastPath = pathname.split('/')[3]
  const path = (lastPath || pathname.split('/')[1]) as LinkType

  const keys = Object.keys(profileButtons) as ButtonType[]

  const gradientAlreadyInvited =
    'linear-gradient(0deg,rgba(104, 71, 255, 0.3) 0%,rgba(104, 71, 255, 0.3) 100%),#333'

  const handleOpenModalSupport = () => {
    setOpenModalSupport(true)
  }

  const userAlreadyInvitedToFriend = !!friends?.requests.sent.find(
    (invite) => invite.user_to.user_id === userId
  )

  const isFriend = useCallback(() => {
    if (friends) {
      const allFriends = [...friends.online, ...friends.offline]

      const allFriendsIds = [...allFriends.map((friend) => friend.user_id)]

      const isFriend = allFriendsIds.includes(userId)
      return isFriend
    }

    return false
  }, [friends, userId])

  const onClickFunction = (key: ButtonType) => {
    switch (key) {
      case 'addFriend':
        handleFriendAdd()
        break

      case 'removeFriend':
        handleFriendRemove()
        break

      case 'steam_chat':
        window.open(`https://steamcommunity.com/chat`, '_blank')
        break

      case 'report':
        handleOpenModalSupport()
        break

      default:
        return null
    }
  }

  const getLink = useCallback(
    (key: ButtonType) => {
      if (key === 'profile') return `/perfil/${user?.id}`
      if (key === 'inventory') return `/inventario`
      if (key === 'config') return `/conta`

      return ''
    },
    [user]
  )

  const getId = useCallback((key: ButtonType) => {
    if (key === 'inventory') return 'step-header03'
    if (key === 'config') return 'step-header04'

    return ''
  }, [])

  const handleFriendAdd = useCallback(async () => {
    if (userAlreadyInvitedToFriend || !auth?.token) return

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
  }, [
    addFriendSentRequest,
    addToast,
    auth?.token,
    showErrorToast,
    userAlreadyInvitedToFriend,
    username,
  ])

  const handleFriendRemove = useCallback(async () => {
    if (!auth?.token) return

    const response = await friendsApi.remove(auth.token, userId)
    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      return
    }

    removeFriendSentRequest(userId)
    removeFriend('online', userId)
    removeFriend('offline', userId)

    addToast({
      title: 'Amigo removido',
      variant: 'info',
    })
  }, [
    addToast,
    auth?.token,
    removeFriend,
    removeFriendSentRequest,
    showErrorToast,
    userId,
  ])

  return (
    <div className={twMerge('gap-3 max-w-fit', '3xl:gap-2.5')}>
      {keys.map((key) =>
        isUserLogged
          ? USER_LOGGED_BUTTONS.includes(key) && (
              <Tooltip
                content={profileButtons[key].label}
                side="bottom"
                className="px-2 py-2 text-xs"
                key={key}
              >
                <div id={getId(key)}>
                  <Button.Root
                    profile
                    className={twMerge(
                      'min-w-11 max-w-11 min-h-11 max-h-11 p-0',
                      '3xl:min-w-10 3xl:max-w-10 3xl:max-h-10 3xl:min-h-10',
                      'ultrawide:min-h-20 ultrawide:max-h-20 ultrawide:min-w-20',
                      LINK_PATHS[path] === key &&
                        'bg-gray-1100/80 outline outline-1 outline-gray-300/50'
                    )}
                    asChild
                  >
                    <Link href={getLink(key)}>
                      <Button.Icon
                        icon={profileButtons[key].icon}
                        profile
                        className={twMerge(
                          'fill-gray-300',
                          key === 'config' && 'text-lg',
                          'ultrawide:text-3xl',
                          LINK_PATHS[path] === key && 'text-white fill-white'
                        )}
                      />
                    </Link>
                  </Button.Root>
                </div>
              </Tooltip>
            )
          : !USER_LOGGED_BUTTONS.includes(key) && (
              <Fragment key={key}>
                {key === 'addFriend' && !isFriend() && (
                  <Tooltip
                    content={
                      userAlreadyInvitedToFriend
                        ? 'Solicitação enviada'
                        : profileButtons[key].label
                    }
                    side="bottom"
                    className="px-2 py-2 text-xs"
                  >
                    <div>
                      <Button.Root
                        profile
                        onClick={() => onClickFunction(key)}
                        className={twMerge(
                          'min-w-11 max-w-11 min-h-11 max-h-11 p-0',
                          userAlreadyInvitedToFriend &&
                            'cursor-not-allowed hover:outline-0',
                          'ultrawide:min-h-20 ultrawide:max-h-20 ultrawide:min-w-20'
                        )}
                        style={{
                          background: userAlreadyInvitedToFriend
                            ? gradientAlreadyInvited
                            : '',
                        }}
                        disableHoverSound={userAlreadyInvitedToFriend}
                        disableClickSound={userAlreadyInvitedToFriend}
                      >
                        <Button.Icon
                          icon={
                            userAlreadyInvitedToFriend
                              ? FaUserCheck
                              : profileButtons[key].icon
                          }
                          profile
                          className={twMerge(
                            'text-2xl',
                            'ultrawide:text-5xl',
                            userAlreadyInvitedToFriend &&
                              'text-white text-xl ultrawide:text-4xl'
                          )}
                        />
                      </Button.Root>
                    </div>
                  </Tooltip>
                )}

                {key === 'removeFriend' && isFriend() && (
                  <Tooltip
                    content={profileButtons[key].label}
                    side="bottom"
                    className="px-2 py-2 text-xs"
                  >
                    <div>
                      <Button.Root
                        profile
                        onClick={() => onClickFunction(key)}
                        className={twMerge(
                          'max-h-11 min-h-11 min-w-11 max-w-11 p-0',
                          'ultrawide:min-h-20 ultrawide:max-h-20 ultrawide:min-w-20'
                        )}
                      >
                        <Button.Icon
                          icon={profileButtons[key].icon}
                          profile
                          className={twMerge('text-2xl', 'ultrawide:text-5xl')}
                        />
                      </Button.Root>
                    </div>
                  </Tooltip>
                )}

                {key !== 'addFriend' && key !== 'removeFriend' && (
                  <Tooltip
                    content={profileButtons[key].label}
                    side="bottom"
                    className="px-2 py-2 text-xs"
                  >
                    <div>
                      <Button.Root
                        profile
                        onClick={() => onClickFunction(key)}
                        className={twMerge(
                          'max-h-11 min-h-11 min-w-11 max-w-11 p-0',
                          'ultrawide:min-h-20 ultrawide:max-h-20 ultrawide:min-w-20'
                        )}
                      >
                        <Button.Icon
                          icon={profileButtons[key].icon}
                          profile
                          className={twMerge('text-xl', 'ultrawide:text-4xl')}
                        />
                      </Button.Root>
                    </div>
                  </Tooltip>
                )}
              </Fragment>
            )
      )}

      <ModalSupport
        open={openModalSupport}
        setOpen={setOpenModalSupport}
        user_id={userId}
        username={username}
      />
    </div>
  )
}
