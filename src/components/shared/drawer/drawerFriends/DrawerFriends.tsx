'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { DEBOUNCE_SEARCH_TIME } from '@/constants'

import { Friend, useFriendsStore } from '@/store/friendStore'
import { useInvitesStore } from '@/store/invitesStore'
import { useLobbyStore } from '@/store/lobbyStore'
import { useUserStore } from '@/store/userStore'

import { profilesApi } from '@/modelsApi'

import { Drawer, ScrollArea } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

import { DrawerFriendsFilter } from './DrawerFriendsFilter'
import { DrawerFriendsListGroup } from './DrawerFriendsListGroup'

interface DrawerFriends {
  open: boolean
  setOpen: (state: boolean) => void
}

export function DrawerFriends({ open, setOpen }: DrawerFriends) {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const { user } = useUserStore()
  const { lobby } = useLobbyStore()
  const { friends } = useFriendsStore()
  const { invites } = useInvitesStore()

  const pathname = usePathname()

  const [filter, setFilter] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchFriends, setSearchFriends] = useState<Friend[]>([])

  const showInviteBar =
    pathname === '/jogar' &&
    user?.invites_available_count &&
    user.invites_available_count > 0 &&
    process.env.NEXT_PUBLIC_USE_INVITES === 'true'

  const teamingFriends =
    lobby?.players?.filter((player) => player.user_id !== user?.id) || []

  const onlineFriends =
    friends?.online?.filter((friend) => friend.lobby_id !== user?.lobby_id) ||
    []

  const friendRequests = friends?.requests.received || []

  const isFilterEmpty = filter === '' || !filter

  const filteredRequests = friendRequests.filter(
    (request) =>
      isFilterEmpty ||
      request.user_to.username.toLowerCase().includes(filter.toLowerCase())
  )

  const filteredTeamingFriends = teamingFriends?.filter(
    (friend) =>
      isFilterEmpty ||
      friend.username.toLowerCase().includes(filter.toLowerCase())
  )

  const filteredOnlineFriends = onlineFriends?.filter(
    (friend) =>
      isFilterEmpty ||
      friend.username.toLowerCase().includes(filter.toLowerCase())
  )

  const filteredOfflineFriends =
    friends?.offline?.filter(
      (friend) =>
        isFilterEmpty ||
        friend.username.toLowerCase().includes(filter.toLowerCase())
    ) || []

  const receivedInvites = invites.filter(
    (invite) => invite.to_player.user_id === user?.id
  )

  const filteredInvites = receivedInvites.filter(
    (invite) =>
      isFilterEmpty ||
      invite.from_player.username.toLowerCase().includes(filter.toLowerCase())
  )

  const handleSearchFriends = useCallback(async () => {
    if (!auth?.token) return
    setIsSearching(true)

    const response = await profilesApi.searchProfile(auth.token, filter)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
      setIsSearching(false)
      return
    }

    const filteredWithoutUser = response.filter(
      (profile: Friend) => profile.username !== user?.account?.username
    )

    setSearchFriends(filteredWithoutUser)
    setIsSearching(false)
  }, [auth?.token, filter, showErrorToast, user?.account?.username])

  useEffect(() => {
    if (!isFilterEmpty && filter.length > 3) {
      setIsSearching(true)

      const delaySearch = setTimeout(() => {
        handleSearchFriends()
      }, DEBOUNCE_SEARCH_TIME)

      return () => clearTimeout(delaySearch)
    }
  }, [filter, isFilterEmpty, handleSearchFriends])

  useEffect(() => {
    if (filter.length <= 3) setIsSearching(false)
  }, [filter])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Content
        title="Amigos"
        className={twMerge(
          'left-[300px] z-20 max-w-[320px] select-none',
          '3xl:left-[250px] 3xl:max-w-[300px]',
          'ultrawide:left-[450px] ultrawide:max-w-[500px]'
        )}
        position="left"
        style={{
          height: `calc(100vh - ${showInviteBar ? 48 : 0}px)`,
          top: showInviteBar ? '48px' : 0,
        }}
      >
        <div className="mt-6 flex-col justify-start">
          <DrawerFriendsFilter
            setFilter={setFilter}
            filter={filter}
            setSearchFriends={setSearchFriends}
          />

          <div
            className={twMerge(
              'relative flex-col',
              "after:absolute after:bottom-0 after:left-0 after:h-[30px] after:w-full after:bg-gradient_drawer_friends after:content-['']"
            )}
          >
            <ScrollArea
              className={twMerge(
                'max-h-friends min-h-friends',
                'first:border-t first:border-t-gray-700',
                'ultrawide:min-h-friendsUltrawide ultrawide:max-h-friendsUltrawide'
              )}
            >
              {!isFilterEmpty && (
                <div className="max-h-friendsSearch min-h-friendsSearch flex-col">
                  <DrawerFriendsListGroup
                    title="Lista de amigos"
                    friends={[
                      ...filteredTeamingFriends,
                      ...filteredOnlineFriends,
                      ...filteredOfflineFriends,
                    ]}
                    open
                    showHeader={!isFilterEmpty}
                  />

                  <DrawerFriendsListGroup
                    title="Resultados da busca"
                    searchFriends={searchFriends}
                    showHeader={!isFilterEmpty}
                    isSearching={isSearching}
                    open
                  />
                </div>
              )}

              {isFilterEmpty && (
                <>
                  <DrawerFriendsListGroup
                    title="No seu grupo"
                    friends={filteredTeamingFriends}
                    open
                    showHeader={isFilterEmpty}
                  />

                  <DrawerFriendsListGroup
                    title="Solicitações de amizade"
                    requests={filteredRequests}
                    showHeader={isFilterEmpty}
                    open
                  />

                  <DrawerFriendsListGroup
                    title="Online"
                    friends={filteredOnlineFriends}
                    invites={filteredInvites}
                    showHeader={isFilterEmpty}
                    open
                  />

                  <DrawerFriendsListGroup
                    title="Offline"
                    friends={filteredOfflineFriends}
                    showHeader={isFilterEmpty}
                  />
                </>
              )}
            </ScrollArea>
          </div>
        </div>
      </Drawer.Content>
    </Drawer>
  )
}
