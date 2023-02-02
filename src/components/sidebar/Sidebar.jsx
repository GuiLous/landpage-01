import {
  Badge,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
// import { Scrollbar } from 'react-scrollbars-custom'

import logoSymbol from '@assets/images/logo_symbol_white.svg'
import {
  Container,
  FriendListUser,
  Invite,
  Scrollbars,
  SidebarItem,
} from '@components'
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
          <p>{onlineFriends.length}</p>
        </Container>
      </Container>

      <Container className={style.body}>
        <Tabs variant="primary" className={style.tabs}>
          <Container className={style.tablist}>
            <TabList gap={2}>
              <Tab>Online</Tab>
              <Tab>Offline</Tab>
              <Tab>Convites</Tab>
            </TabList>
          </Container>

          <TabPanels className={style.panels}>
            {onlineFriends.length > 0 ? (
              <TabPanel className={style.panel}>
                <Scrollbars autoHide>
                  <SidebarItem
                    title="Amigos Online"
                    meta={onlineFriends.length}
                    Item={FriendListUser}
                    data={onlineFriends}
                  />
                </Scrollbars>
              </TabPanel>
            ) : (
              <TabPanel className={[style.panel, style.empty].join(' ')}>
                <Text>Nenhum amigo online.</Text>
              </TabPanel>
            )}

            {offlineFriends.length > 0 ? (
              <TabPanel className={style.panel}>
                <Scrollbars autoHide>
                  <SidebarItem
                    title="Amigos Offline"
                    meta={offlineFriends.length}
                    Item={FriendListUser}
                    data={offlineFriends}
                  />
                </Scrollbars>
              </TabPanel>
            ) : (
              <TabPanel className={[style.panel, style.empty].join(' ')}>
                <Text>Nenhum amigo offline.</Text>
              </TabPanel>
            )}

            {user.account.lobby_invites.length > 0 ? (
              <TabPanel className={style.panel}>
                <Scrollbars autoHide>
                  <SidebarItem
                    title="Convites"
                    meta={user.account.lobby_invites.length}
                    Item={Invite}
                    data={user.account.lobby_invites}
                  />
                </Scrollbars>
              </TabPanel>
            ) : (
              <TabPanel className={[style.panel, style.empty].join(' ')}>
                <Text>Nenhum convite recebido.</Text>
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Container>

      <Container
        className={style.footer}
        justify="center"
        align="end"
        fitContent
      >
        <img src={logoSymbol} alt="Reload" />
      </Container>
    </Container>
  )
}
