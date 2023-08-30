import { useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Container,
  FriendList,
  LogoutModal,
  NotificationList,
  SidebarAvatarLink,
  SidebarFooter,
  SidebarLobbyButton,
  SidebarLogo,
  SidebarMenuItem,
  SupportModal,
} from '@components'
import { toggleFriendList } from '@slices/AppSlice'

import style from './Sidebar.module.css'

const topMenuItems = ['amigos', 'notificações', 'ranking', 'loja']
const bottomMenuItems = ['suporte', 'sair']

export default function Sidebar() {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const lobby = useSelector((state) => state.lobby)
  const notifications = useSelector((state) => state.notifications)
  const invites = useSelector((state) => state.invites)
  const friendListOpenByApp = useSelector((state) => state.app.friendListOpen)

  const [openSupport, setOpenSupport] = useState(false)
  const [openLogoutModal, setOpenLogoutModal] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [friendListOpen, setFriendListOpen] = useState(false)

  const receivedInvites = invites.filter(
    (invite) => invite.to_player.user_id === user.id
  ).length

  const unreadNotifications = notifications.filter(
    (notification) => notification.read_date === null
  ).length

  const handleOpenModalSupport = () => {
    setOpenSupport(true)
  }

  const handleOpenModalLogout = () => {
    setOpenLogoutModal(true)
  }

  const handleToggleNotificationsDrawer = () => {
    setNotificationsOpen(!notificationsOpen)
  }

  const handleCloseNotificationsDrawer = () => {
    setNotificationsOpen(false)
  }

  const handleCloseFriendListDrawer = () => {
    setFriendListOpen(false)
    dispatch(toggleFriendList(false))
  }

  const handleToggleFriendListDrawer = () => {
    if (friendListOpen) {
      dispatch(toggleFriendList(false))
      setFriendListOpen(false)
    } else {
      dispatch(toggleFriendList(true))
      setFriendListOpen(true)
    }
  }

  const onClickFunction = (item) => {
    switch (item) {
      case 'amigos':
        handleToggleFriendListDrawer()
        break

      case 'notificações':
        handleToggleNotificationsDrawer()
        break

      case 'suporte':
        handleOpenModalSupport()
        break

      case 'sair':
        handleOpenModalLogout()
        break

      default:
        return null
    }
  }

  useEffect(() => {
    setFriendListOpen(friendListOpenByApp)
  }, [friendListOpenByApp])

  return (
    <>
      <Container
        column
        className={style.container}
        justify="between"
        testID="container"
        gap={isLessThan2xl ? 58 : 78}
      >
        <SidebarLogo />

        <Container className={style.body} column gap={isLessThan2xl ? 35 : 40}>
          <Container className={style.userInfo} gap={24} align="center" column>
            <Container gap={16} column className={style.userWrapper}>
              <SidebarAvatarLink user={user} />
            </Container>
          </Container>

          <Container className={style.lobbyBtn}>
            <SidebarLobbyButton
              lobby={lobby}
              match_id={user.match_id}
              username={user.account.username}
            />
          </Container>

          <Container
            column
            gap={isLessThan2xl ? 26 : 30}
            className={style.menu}
          >
            <Container className={style.topMenu} column>
              {topMenuItems.map((item) => (
                <SidebarMenuItem
                  key={item}
                  item={item}
                  receivedInvites={receivedInvites}
                  unreadNotifications={unreadNotifications}
                  onClickFunction={onClickFunction}
                />
              ))}
            </Container>

            <Container className={style.bottomMenu} column>
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem
                  key={item}
                  item={item}
                  receivedInvites={receivedInvites}
                  unreadNotifications={unreadNotifications}
                  onClickFunction={onClickFunction}
                />
              ))}
            </Container>
          </Container>
        </Container>

        <SidebarFooter />
      </Container>

      <NotificationList
        isOpen={notificationsOpen}
        onClose={handleCloseNotificationsDrawer}
      />

      <FriendList
        isOpen={friendListOpen}
        onClose={handleCloseFriendListDrawer}
      />

      <SupportModal isOpen={openSupport} setIsOpen={setOpenSupport} />

      <LogoutModal isOpen={openLogoutModal} setIsOpen={setOpenLogoutModal} />
    </>
  )
}
