'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import { BiSolidMessage } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { RiErrorWarningFill } from 'react-icons/ri'
import { TbSettingsFilled } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'

import { LINK_PATHS, USER_LOGGED_BUTTONS } from '@/constants'

import { useAppSelector } from '@/store'

import { BagPackIcon, Button, ModalSupport } from '@/components/shared'

type ButtonType = 'profile' | 'inventory' | 'config' | 'steam_chat' | 'report'
type LinkType = 'perfil' | 'conta' | 'inventario'

interface ProfileHeaderTabsButtonsProps {
  userId: number
  isUserLogged: boolean
  username: string
}

export function ProfileHeaderTabsButtons({
  userId,
  isUserLogged,
  username,
}: ProfileHeaderTabsButtonsProps) {
  const { user } = useAppSelector((state) => state.user)

  const pathname = usePathname()

  const [openModalSupport, setOpenModalSupport] = useState(false)

  const lastPath = pathname.split('/')[3]
  const path = (lastPath || pathname.split('/')[1]) as LinkType

  const profileButtons = {
    profile: { icon: FaUser, label: 'Meu perfil' },
    inventory: { icon: BagPackIcon, label: 'Inventário' },
    config: { icon: TbSettingsFilled, label: 'Configurações' },
    steam_chat: { icon: BiSolidMessage, label: 'Abrir bate-papo' },
    report: { icon: RiErrorWarningFill, label: 'Reportar usuário' },
  }

  const keys = Object.keys(profileButtons) as ButtonType[]

  const handleOpenModalSupport = () => {
    setOpenModalSupport(true)
  }

  const onClickFunction = (key: ButtonType) => {
    switch (key) {
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
      if (key === 'inventory') return `/perfil/${user?.id}/inventario`
      if (key === 'config') return `/conta`

      return ''
    },
    [user]
  )

  return (
    <div className={twMerge('gap-3 max-w-fit', '3xl:gap-2.5')}>
      {keys.map((key: ButtonType) =>
        isUserLogged
          ? USER_LOGGED_BUTTONS.includes(key) && (
              <Button.Root
                key={key}
                profile
                className={twMerge(
                  LINK_PATHS[path] === key &&
                    'bg-gray-1100/80 border-gray-300/50'
                )}
                asChild
              >
                <Link href={getLink(key)}>
                  <Button.Icon
                    icon={profileButtons[key].icon}
                    profile
                    className={twMerge(
                      key === 'config' && 'text-lg',
                      LINK_PATHS[path] === key && 'text-white'
                    )}
                  />
                  <Button.Content
                    profile
                    className={twMerge(
                      LINK_PATHS[path] === key && 'text-white'
                    )}
                  >
                    {profileButtons[key].label}
                  </Button.Content>
                </Link>
              </Button.Root>
            )
          : !USER_LOGGED_BUTTONS.includes(key) && (
              <Button.Root
                key={key}
                profile
                onClick={() => onClickFunction(key)}
              >
                <Button.Icon
                  icon={profileButtons[key].icon}
                  profile
                  className="text-lg"
                />
                <Button.Content profile>
                  {profileButtons[key].label}
                </Button.Content>
              </Button.Root>
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
