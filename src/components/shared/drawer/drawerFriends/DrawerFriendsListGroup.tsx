import { useCallback, useEffect, useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { CAN_RENDER_OPENED } from '@/constants'

import { Friend } from '@/store/friendStore'
import { Invite } from '@/store/invitesStore'

import { DrawerFriendsInviteItem } from './DrawerFriendsInviteItem'
import { DrawerFriendsListGroupItem } from './DrawerFriendsListGroupItem'

interface DrawerFriendsListGroupProps {
  title: 'No seu grupo' | 'Online' | 'Offline'
  friends: Friend[]
  invites?: Invite[]
  collapse?: boolean
  open?: boolean
  showHeader?: boolean
}

export function DrawerFriendsListGroup({
  friends = [],
  invites = [],
  title,
  collapse = true,
  open = false,
  showHeader = true,
}: DrawerFriendsListGroupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([])

  const handleCollapse = () => {
    if (!collapse || friends.length <= 0) return
    setIsOpen(!isOpen)
  }

  const renderItemsLength = useCallback(() => {
    if (friends.length < 10 && friends.length > 0) return `(0${friends.length})`
    else return `(${friends.length})`
  }, [friends])

  const filterItems = useCallback(() => {
    return friends.filter(
      (item) =>
        !invites.some((invite) => item.user_id === invite.from_player.user_id)
    )
  }, [friends, invites])

  useEffect(() => {
    if (collapse) setIsOpen(open)
    else setIsOpen(true)
  }, [open, collapse])

  useEffect(() => {
    if (!showHeader) {
      setIsOpen(true)
    }
  }, [showHeader])

  useEffect(() => {
    if (friends.length === 0) {
      setIsOpen(false)
    }
  }, [friends])

  useEffect(() => {
    const friendsWithoutInvite = filterItems()
    setFilteredFriends(friendsWithoutInvite)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends])

  useEffect(() => {
    if (CAN_RENDER_OPENED.includes(title) && friends.length > 0) {
      setIsOpen(true)
    }
  }, [title, friends])

  return (
    <div
      className={twMerge(
        'h-full flex-col',
        showHeader && 'border-b border-gray-700'
      )}
    >
      <div
        className={twMerge(
          'group flex-initial cursor-pointer items-center pl-5 pr-4 py-4',
          friends.length <= 0 && 'cursor-default',
          !showHeader && 'hidden'
        )}
        onClick={handleCollapse}
      >
        <div>
          <h2
            className={twMerge(
              'text-xs text-gray-200',
              isOpen && 'text-white font-medium'
            )}
          >
            {title} {renderItemsLength()}
          </h2>
        </div>

        {collapse && friends.length > 0 && (
          <div className="justify-end">
            <RiArrowDownSLine
              className={twMerge(
                'opacity-70 text-white transition-all',
                'group-hover:opacity-100',
                isOpen && 'opacity-100 rotate-180'
              )}
              size={24}
            />
          </div>
        )}
      </div>

      {invites.length > 0 && isOpen && (
        <div className="flex-col">
          {invites.map((invite) => (
            <DrawerFriendsInviteItem
              key={invite.id}
              invite_id={invite.id}
              avatar={invite.from_player.avatar.medium}
              status={invite.from_player.status}
              username={invite.from_player.username}
            />
          ))}
        </div>
      )}

      {filteredFriends.length > 0 && isOpen && (
        <div className="flex-col">
          {filteredFriends.map((friend, index) => (
            <DrawerFriendsListGroupItem
              key={index}
              {...friend}
              avatar={friend.avatar.medium}
              title={title}
            />
          ))}
        </div>
      )}
    </div>
  )
}
