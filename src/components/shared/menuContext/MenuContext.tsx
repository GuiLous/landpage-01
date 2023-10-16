'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { useState } from 'react'
import { BsEnvelopeFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { RiErrorWarningFill } from 'react-icons/ri'
import { SiSteam } from 'react-icons/si'
import { twMerge } from 'tailwind-merge'

import { ModalSupport } from '../modalSupport/ModalSupport'
import { MenuItem, keysMenuType } from './MenuItem'

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

export const menuItems = {
  invite: { icon: BsEnvelopeFill, label: 'Convidar para o grupo' },
  profile: { icon: FaUser, label: 'Ver perfil' },
  steam: { icon: SiSteam, label: 'Ver perfil na Steam' },
  report: { icon: RiErrorWarningFill, label: 'Reportar usuário' },
}

const keys = Object.keys(menuItems) as keysMenuType[]

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
}: MenuContextContentProps) {
  const [openModalSupport, setOpenModalSupport] = useState(false)
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        className={twMerge(
          'rounded-[4px] overflow-hidden flex flex-col border-none bg-gray-700 will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slide-up-fade data-[state=open]:data-[side=left]:animate-slide-right-fade data-[state=open]:data-[side=right]:animate-slide-left-fade data-[state=open]:data-[side=top]:animate-slide-down-fade',
          className
        )}
        sideOffset={sideOffset}
        side={side}
      >
        {keys.map((key) => (
          <MenuItem
            key={key}
            keyMenu={key}
            alreadyInvited={alreadyInvited}
            alreadyOnTeam={alreadyOnTeam}
            isAvailable={isAvailable}
            steam_url={steam_url}
            user_id={user_id}
            setOpenModalSupport={setOpenModalSupport}
          />
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
