import {
  Badge,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
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
    <Container column className={style.container}>
      <Container className={style.header} justify="between" fitContent>
        <Container className={style.title}>Amigos</Container>
        <Container className={style.meta} justify="end" align="center" gap={5}>
          <Badge variant="online" />
          <p>{offlineFriends.length}</p>
        </Container>
      </Container>

      <Container className={style.body}>
        <Tabs variant="primary">
          <TabList gap={2}>
            <Tab>Online</Tab>
            <Tab>Offline</Tab>
            <Tab>Convites</Tab>
          </TabList>

          <TabPanels className={style.panel}>
            <TabPanel>
              <SidebarItem
                title="Amigos Online"
                meta={onlineFriends.length}
                Item={FriendListUser}
                data={onlineFriends}
                emptyMsg="Nenhum amigo online."
              />
            </TabPanel>

            <TabPanel>
              <SidebarItem
                title="Amigos Offline"
                meta={offlineFriends.length}
                Item={FriendListUser}
                data={offlineFriends}
                emptyMsg="Nenhum amigo offline."
              />
            </TabPanel>

            <TabPanel>
              <SidebarItem
                title="Convites"
                meta={user.account.lobby_invites.length}
                Item={Invite}
                data={user.account.lobby_invites}
                emptyMsg="Nenhum convite recebido."
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Container>
  )
}
