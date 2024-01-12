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

import { useUserStore } from '@/store/userStore'

import { BagPackIcon, Button, ModalSupport, Tooltip } from '@/components/shared'

type ButtonType = 'profile' | 'inventory' | 'config' | 'steam_chat' | 'report'
type LinkType = 'perfil' | 'conta' | 'inventario'

interface ProfileHeaderTabsButtonsProps {
  userId: number
  isUserLogged: boolean
  username: string
}

const profileButtons = {
  profile: { icon: FaUser, label: 'Meu perfil' },
  inventory: { icon: BagPackIcon, label: 'Inventário' },
  config: { icon: TbSettingsFilled, label: 'Configurações' },
  steam_chat: { icon: BiSolidMessage, label: 'Abrir bate-papo' },
  report: { icon: RiErrorWarningFill, label: 'Reportar usuário' },
}

export function ProfileHeaderTabsButtons({
  userId,
  isUserLogged,
  username,
}: ProfileHeaderTabsButtonsProps) {
  const user = useUserStore.getState().user

  const pathname = usePathname()

  const [openModalSupport, setOpenModalSupport] = useState(false)

  const lastPath = pathname.split('/')[3]
  const path = (lastPath || pathname.split('/')[1]) as LinkType

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
      if (key === 'inventory') return `/inventario`
      if (key === 'config') return `/conta`

      return ''
    },
    [user]
  )

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
                <div>
                  <Button.Root
                    profile
                    className={twMerge(
                      LINK_PATHS[path] === key &&
                        'bg-gray-1100/80 border-gray-300/50'
                    )}
                    asChild
                  >
                    <Link href={getLink(key)} className="min-w-[46px]">
                      <Button.Icon
                        icon={profileButtons[key].icon}
                        profile
                        className={twMerge(
                          key === 'config' && 'text-lg',
                          LINK_PATHS[path] === key && 'text-white'
                        )}
                      />
                    </Link>
                  </Button.Root>
                </div>
              </Tooltip>
            )
          : !USER_LOGGED_BUTTONS.includes(key) && (
              <Tooltip
                content={profileButtons[key].label}
                side="bottom"
                className="px-2 py-2 text-xs"
                key={key}
              >
                <div>
                  <Button.Root
                    profile
                    onClick={() => onClickFunction(key)}
                    className="min-w-[46px]"
                  >
                    <Button.Icon
                      icon={profileButtons[key].icon}
                      profile
                      className="text-lg"
                    />
                  </Button.Root>
                </div>
              </Tooltip>
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
