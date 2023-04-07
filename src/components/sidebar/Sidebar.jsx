import {
  Badge,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import logoSymbol from '@assets/images/logo_symbol_white.svg'
import {
  Container,
  FriendListUser,
  Invite,
  Scrollbars,
  SidebarItem,
} from '@components'
import { readInvites } from '@slices/InviteSlice'
import style from './Sidebar.module.css'

export default function Sidebar(props) {
  const user = useSelector((state) => state.user)
  const unreadInvites = useSelector((state) => state.invites.unread)
  const dispatch = useDispatch()
  const [tabIndex, setTabIndex] = useState()

  useEffect(() => {
    if (tabIndex === tabs.indexOf('Convites')) dispatch(readInvites())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unreadInvites])

  const onlineFriends = user.account.friends.filter(
    (friend) => friend.is_online
  )
  const offlineFriends = user.account.friends.filter(
    (friend) => !friend.is_online
  )
  const sortedOnlineFriends = onlineFriends.sort((a, b) =>
    user.account.lobby.players_ids.includes(a.id) ? -1 : 1
  )

  const tabs = ['Online', 'Offline', 'Convites']

  const handleTabsChange = (index) => {
    if (index === tabs.indexOf('Convites')) dispatch(readInvites())
    setTabIndex(index)
  }

  const renderTabs = () => {
    return tabs.map((tab) => (
      <Tab key={tab}>
        {tab}
        {tab === 'Convites' &&
          tabIndex !== tabs.indexOf('Convites') &&
          unreadInvites > 0 && (
            <Badge className={style.unreadBadge} variant="unread" />
          )}
      </Tab>
    ))
  }

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
        <Tabs
          variant="primary"
          className={style.tabs}
          onChange={handleTabsChange}
          index={tabIndex}
        >
          <Container className={style.tablist}>
            <TabList gap={2}>{renderTabs()}</TabList>
          </Container>

          <TabPanels className={style.panels}>
            {onlineFriends.length > 0 ? (
              <TabPanel className={style.panel}>
                <Scrollbars autoHide>
                  <SidebarItem
                    title="Amigos Online"
                    meta={onlineFriends.length}
                    Item={FriendListUser}
                    data={sortedOnlineFriends}
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
                    changeTab={handleTabsChange}
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
