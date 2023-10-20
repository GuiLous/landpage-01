'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAppSelector } from '@/store'

import { Drawer, ScrollArea } from '@/components/shared'

import { DrawerFriendsFilter } from './DrawerFriendsFilter'
import { DrawerFriendsListGroup } from './DrawerFriendsListGroup'

interface DrawerFriends {
  open: boolean
  setOpen: (state: boolean) => void
}

export function DrawerFriends({ open, setOpen }: DrawerFriends) {
  const { user } = useAppSelector((state) => state.user)
  const lobby = useAppSelector((state) => state.lobby)
  const friends = useAppSelector((state) => state.friends)
  const { invites } = useAppSelector((state) => state.invites)

  const [filter, setFilter] = useState('')

  const teamingFriends =
    lobby?.players?.filter((player) => player.user_id !== user?.id) || []

  const onlineFriends = friends?.online?.filter(
    (friend) => friend.lobby_id !== user?.lobby_id
  )

  const filteredTeamingFriends = teamingFriends?.filter(
    (friend) =>
      filter === '' ||
      friend.username.toLowerCase().includes(filter.toLowerCase())
  )

  const filteredOnlineFriends = onlineFriends?.filter(
    (friend) =>
      filter === '' ||
      friend.username.toLowerCase().includes(filter.toLowerCase())
  )

  const filteredOfflineFriends = friends?.offline?.filter(
    (friend) =>
      filter === '' ||
      friend.username.toLowerCase().includes(filter.toLowerCase())
  )

  const receivedInvites = invites.filter(
    (invite) => invite.to_player.user_id === user?.id
  )

  const filteredInvites = receivedInvites.filter(
    (invite) =>
      filter === '' ||
      invite.from_player.username.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Content
        title="Amigos"
        className={twMerge(
          'left-[300px] z-20 max-w-[320px] select-none',
          '3xl:left-[250px] 3xl:max-w-[300px]'
        )}
        position="left"
      >
        <div className="mt-6 flex-col justify-start">
          <DrawerFriendsFilter setFilter={setFilter} />

          <div
            className={twMerge(
              'relative flex-col',
              "after:absolute after:bottom-0 after:left-0 after:h-[30px] after:w-full after:bg-gradient_drawer_friends after:content-['']"
            )}
          >
            <ScrollArea
              className={twMerge(
                'max-h-friends min-h-friends',
                'first:border-t first:border-t-gray-700'
              )}
            >
              <div>
                <DrawerFriendsListGroup
                  title="No seu grupo"
                  friends={filteredTeamingFriends}
                  open
                  showHeader={filter === ''}
                />
              </div>

              <div>
                <DrawerFriendsListGroup
                  title="Online"
                  friends={filteredOnlineFriends}
                  invites={filteredInvites}
                  showHeader={filter === ''}
                  open
                />
              </div>

              <div>
                <DrawerFriendsListGroup
                  title="Offline"
                  friends={filteredOfflineFriends}
                  showHeader={filter === ''}
                />
              </div>
            </ScrollArea>
          </div>
        </div>
      </Drawer.Content>
    </Drawer>
  )
}
