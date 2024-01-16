'use client'

import { useCallback, useEffect, useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { CAN_RENDER_OPENED } from '@/constants'

import { Friend, RequestInfo } from '@/store/friendStore'
import { Invite } from '@/store/invitesStore'

import { DrawerFriendsInviteItem } from './DrawerFriendsInviteItem'
import { DrawerFriendsListGroupItem } from './DrawerFriendsListGroupItem'

interface DrawerFriendsListGroupProps {
  title: 'No seu grupo' | 'Online' | 'Offline' | 'Solicitações de amizade'
  friends?: Friend[]
  requests?: RequestInfo[]
  invites?: Invite[]
  collapse?: boolean
  open?: boolean
  showHeader?: boolean
  isFriendInvite?: boolean
}

export function DrawerFriendsListGroup({
  friends = [],
  invites = [],
  requests = [],
  title,
  collapse = true,
  open = false,
  showHeader = true,
  isFriendInvite = false,
}: DrawerFriendsListGroupProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCollapse = () => {
    if (
      (isFriendInvite && !collapse) ||
      (isFriendInvite && requests.length <= 0)
    )
      return
    if (
      (!isFriendInvite && !collapse) ||
      (!isFriendInvite && friends.length <= 0)
    )
      return
    setIsOpen(!isOpen)
  }

  const renderFriendsLength = useCallback(() => {
    if (friends.length < 10 && friends.length > 0) return `(0${friends.length})`
    else return `(${friends.length})`
  }, [friends.length])

  const renderRequestsLength = useCallback(() => {
    if (requests.length < 10 && requests.length > 0)
      return `(0${requests.length})`
    else return `(${requests.length})`
  }, [requests.length])

  const friendsWithoutLobbyInvite = friends.filter(
    (item) =>
      !invites.some((invite) => item.user_id === invite.from_player.user_id)
  )

  useEffect(() => {
    if (collapse) setIsOpen(open)
    else setIsOpen(true)
  }, [open, collapse])

  useEffect(() => {
    if (!showHeader) return setIsOpen(true)

    setIsOpen(false)
  }, [showHeader])

  useEffect(() => {
    if (isFriendInvite && requests.length === 0) {
      setIsOpen(false)
    }

    if (!isFriendInvite && friends.length === 0) {
      setIsOpen(false)
    }
  }, [friends.length, isFriendInvite, requests.length])

  useEffect(() => {
    if (
      isFriendInvite &&
      CAN_RENDER_OPENED.includes(title) &&
      requests.length > 0
    ) {
      setIsOpen(true)
      return
    }

    if (
      !isFriendInvite &&
      CAN_RENDER_OPENED.includes(title) &&
      friends.length > 0
    ) {
      setIsOpen(true)
    }
  }, [title, friends.length, isFriendInvite, requests.length])

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
          !isFriendInvite && friends.length <= 0 && 'cursor-default',
          isFriendInvite && requests.length <= 0 && 'cursor-default',
          !showHeader && 'hidden'
        )}
        onClick={handleCollapse}
      >
        <div className="min-w-fit">
          <h2
            className={twMerge(
              'text-xs text-gray-200',
              isOpen && 'text-white font-medium'
            )}
          >
            {title}{' '}
            {isFriendInvite ? renderRequestsLength() : renderFriendsLength()}
          </h2>
        </div>

        {collapse && !isFriendInvite && friends.length > 0 && (
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

        {collapse && isFriendInvite && requests.length > 0 && (
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
              lobby_invite_id={invite.id}
              avatar={invite.from_player.avatar.medium}
              status={invite.from_player.status}
              username={invite.from_player.username}
            />
          ))}
        </div>
      )}

      {requests.length > 0 && isOpen && (
        <div className="flex-col">
          {requests.map((request) => (
            <DrawerFriendsInviteItem
              key={request.id}
              status={request.user_from.status}
              username={request.user_from.username}
              user_id={request.user_from.user_id}
              request_id={request.id}
              create_date={request.create_date}
              avatar={request.user_from.avatar.medium}
              isFriendInvite
            />
          ))}
        </div>
      )}

      {friendsWithoutLobbyInvite.length > 0 && isOpen && (
        <div className="flex-col">
          {friendsWithoutLobbyInvite.map((friend, index) => (
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
