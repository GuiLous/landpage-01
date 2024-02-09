'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Fragment, useCallback, useState } from 'react'
import { BsEnvelopeFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { MdPersonAddAlt1, MdPersonRemoveAlt1 } from 'react-icons/md'
import { RiCloseCircleFill, RiErrorWarningFill } from 'react-icons/ri'
import { RxExit } from 'react-icons/rx'
import { SiSteam } from 'react-icons/si'
import { twMerge } from 'tailwind-merge'

import { useFriendsStore } from '@/store/friendStore'

import { ModalSupport } from '@/components/shared'

import { useAudio } from '@/hooks'

import { MenuItem, keysMenuType } from './MenuItem'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

type PopoverContentPrimitiveProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>

type PopoverRootPrimitiveProps = React.ComponentProps<
  typeof PopoverPrimitive.Root
>

type MenuContextContentProps = PopoverContentPrimitiveProps & {
  isAvailable: boolean
  alreadyInvited: boolean
  alreadyOnTeam: boolean
  user_id: number
  username: string
  steam_url: string
  isUser?: boolean
  isOnLobby?: boolean
  isLobbyOwner?: boolean
  onClose?: false | (() => Promise<void>)
}

type MenuContextRootProps = PopoverRootPrimitiveProps

type MenuContextProps = MenuContextRootProps

export function MenuContext({
  children,
  onOpenChange,
  open,
}: MenuContextProps) {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </PopoverPrimitive.Root>
  )
}

export const menuItems: Record<
  keysMenuType,
  { icon: React.ElementType; label: string }
> = {
  invite: { icon: BsEnvelopeFill, label: 'Convidar para o grupo' },
  profile: { icon: FaUser, label: 'Ver perfil' },
  steam: { icon: SiSteam, label: 'Ver perfil na Steam' },
  remove: { icon: RiCloseCircleFill, label: 'Expulsar do grupo' },
  exit: { icon: RxExit, label: 'Sair do grupo' },
  report: { icon: RiErrorWarningFill, label: 'Reportar usuário' },
  friendRemove: { icon: MdPersonRemoveAlt1, label: 'Remover amigo' },
  friendAdd: { icon: MdPersonAddAlt1, label: 'Adicionar amigo' },
}

type OptionalMenuItems = Partial<typeof menuItems>

function MenuContextContent({
  className,
  side = 'right',
  sideOffset = 5,
  alreadyInvited,
  alreadyOnTeam,
  isAvailable,
  steam_url,
  user_id,
  username,
  isUser = false,
  isOnLobby = false,
  isLobbyOwner = false,
  onClose,
}: MenuContextContentProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const { friends } = useFriendsStore()

  const [openModalSupport, setOpenModalSupport] = useState(false)

  const filteredMenuItems: OptionalMenuItems = { ...menuItems }

  if (isUser) {
    delete filteredMenuItems.remove
    delete filteredMenuItems.report
    delete filteredMenuItems.friendAdd
    delete filteredMenuItems.friendRemove
  }

  if (!isUser) delete filteredMenuItems.exit

  if (!isOnLobby) {
    delete filteredMenuItems.remove
    delete filteredMenuItems.exit
  }

  if (!isLobbyOwner) delete filteredMenuItems.remove

  if (!onClose) delete filteredMenuItems.exit

  const keys = Object.keys(filteredMenuItems) as keysMenuType[]

  const isFriend = useCallback(() => {
    if (friends) {
      const allFriends = [...friends.online, ...friends.offline]

      const allFriendsIds = [...allFriends.map((friend) => friend.user_id)]

      const isFriend = allFriendsIds.includes(user_id)
      return isFriend
    }

    return false
  }, [friends, user_id])

  const isNotFriendMenu = (keyMenu: keysMenuType) => {
    return keyMenu !== 'friendAdd' && keyMenu !== 'friendRemove'
  }

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        className={twMerge(
          'rounded z-40 overflow-hidden flex flex-col border-none bg-gray-700',
          'will-change-[transform,opacity]',
          'data-[state=open]:data-[side=bottom]:animate-slide-up-fade',
          'data-[state=open]:data-[side=left]:animate-slide-right-fade ',
          'data-[state=open]:data-[side=right]:animate-slide-left-fade',
          'data-[state=open]:data-[side=top]:animate-slide-down-fade',
          className
        )}
        sideOffset={sideOffset}
        side={side}
      >
        {keys.map((key) => (
          <Fragment key={key}>
            {isFriend() && key === 'friendRemove' && (
              <MenuItem
                keyMenu={key}
                alreadyInvited={alreadyInvited}
                alreadyOnTeam={alreadyOnTeam}
                isAvailable={isAvailable}
                steam_url={steam_url}
                user_id={user_id}
                setOpenModalSupport={setOpenModalSupport}
                username={username}
                onClose={onClose}
                isFriendRemove
                playSoundHover={playSoundHover}
                playSoundClick={playSoundClick}
              />
            )}

            {!isFriend() && key === 'friendAdd' && (
              <MenuItem
                keyMenu={key}
                alreadyInvited={alreadyInvited}
                alreadyOnTeam={alreadyOnTeam}
                isAvailable={isAvailable}
                steam_url={steam_url}
                user_id={user_id}
                setOpenModalSupport={setOpenModalSupport}
                username={username}
                onClose={onClose}
                isFriendAdd
                playSoundHover={playSoundHover}
                playSoundClick={playSoundClick}
              />
            )}

            {isNotFriendMenu(key) && (
              <MenuItem
                keyMenu={key}
                alreadyInvited={alreadyInvited}
                alreadyOnTeam={alreadyOnTeam}
                isAvailable={isAvailable}
                steam_url={steam_url}
                user_id={user_id}
                setOpenModalSupport={setOpenModalSupport}
                username={username}
                onClose={onClose}
                playSoundHover={playSoundHover}
                playSoundClick={playSoundClick}
              />
            )}
          </Fragment>
        ))}

        <ModalSupport
          open={openModalSupport}
          setOpen={setOpenModalSupport}
          user_id={user_id}
          username={username}
        />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}

MenuContext.Trigger = PopoverPrimitive.Trigger
MenuContext.Content = MenuContextContent
