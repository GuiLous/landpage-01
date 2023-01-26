import React from 'react'
import { useSelector } from 'react-redux'

import { Container, FriendListUser, Invite, SidebarItem } from '@components'
import style from './Sidebar.module.css'

export default function Sidebar(props) {
  const user = useSelector((state) => state.user)
  const onlineFriends = user.account.friends.filter(
    (friend) => friend.is_online
  )
  const offlineFriends = user.account.friends.filter(
    (friend) => !friend.is_online
  )

  return (
    <Container column className={style.container} gap={40}>
      {
        <SidebarItem
          title="Amigos Online"
          meta={onlineFriends.length}
          Item={FriendListUser}
          data={onlineFriends}
        />
      }
      {
        <SidebarItem
          title="Amigos Offline"
          meta={offlineFriends.length}
          Item={FriendListUser}
          data={offlineFriends}
        />
      }
      {
        <SidebarItem
          title="Convites"
          meta={user.account.lobby_invites.length}
          Item={Invite}
          data={user.account.lobby_invites}
        />
      }
    </Container>
  )
}
