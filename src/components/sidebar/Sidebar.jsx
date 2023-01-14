import React from 'react'
import { useSelector } from 'react-redux'

import { Container, SidebarItem, UserCard } from '@components'
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
    <Container column className={style.container}>
      {
        <SidebarItem
          title="Amigos Online"
          meta={onlineFriends.length}
          Item={UserCard}
          data={onlineFriends}
        />
      }
      {
        <SidebarItem
          title="Amigos Offline"
          meta={offlineFriends.length}
          Item={UserCard}
          data={offlineFriends}
        />
      }
    </Container>
  )
}
