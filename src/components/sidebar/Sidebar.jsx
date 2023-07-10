import {
  Avatar,
  Badge,
  Icon,
  Image,
  Link,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  SiDiscord,
  SiFacebook,
  SiInstagram,
  SiTwitter,
  SiYoutube,
} from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { Link as ReactRouterLink } from 'react-router-dom'

import logoFull from '@assets/images/logo_symbol_full.svg'
import logoSymbol from '@assets/images/logo_symbol_white.svg'
import {
  BellFilledIcon,
  Container,
  ExitIcon,
  FriendList,
  FriendsIcon,
  LogoutModal,
  NotificationList,
  PodiumIcon,
  ShareIcon,
  ShopIcon,
  SidebarLobbyButton,
  SupportIcon,
  SupportModal,
} from '@components'
import { toggleFriendList } from '@slices/AppSlice'

import style from './Sidebar.module.css'

export default function Sidebar({ collapsed = true, collapsable = false }) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const user = useSelector((state) => state.user)
  const lobby = useSelector((state) => state.lobby)
  const match = useSelector((state) => state.match)
  const notifications = useSelector((state) => state.notifications)
  const invites = useSelector((state) => state.invites)
  const friendListOpenByApp = useSelector((state) => state.app.friendListOpen)

  const dispatch = useDispatch()

  const [isCollapsed, setIsCollapsed] = useState(collapsable && collapsed)
  const [openSupport, setOpenSupport] = useState(false)
  const [openLogoutModal, setOpenLogoutModal] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [friendListOpen, setFriendListOpen] = useState(false)
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0)

  const receivedInvites = invites.filter(
    (invite) => invite.to_player.user_id === user.id
  )

  const handleOpenModalSupport = () => {
    setOpenSupport(true)
  }

  const handleOpenModalLogout = () => {
    setOpenLogoutModal(true)
  }

  const open = () => {
    collapsable && setIsCollapsed(false)
  }

  const collapse = () => {
    collapsable && setIsCollapsed(true)
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
    } else setFriendListOpen(true)
  }

  useEffect(() => {
    if (collapsable) setIsCollapsed(collapsed)
    else setIsCollapsed(false)
  }, [collapsed, collapsable])

  useEffect(() => {
    setFriendListOpen(friendListOpenByApp)
  }, [friendListOpenByApp])

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const notificationsNotRead = notifications.filter(
        (notification) => notification.read_date === null
      ).length

      setUnreadNotificationsCount(notificationsNotRead)
    }
  }, [notifications])

  return (
    <>
      <Container
        column
        className={[
          style.container,
          collapsable && isCollapsed && style.collapsed,
        ].join(' ')}
        justify="between"
        onMouseEnter={open}
        onMouseLeave={collapse}
        testID="container"
        gap={isLessThan2xl ? 58 : 78}
      >
        <Container column fitContent>
          <Container className={style.logoWrapper}>
            <Link as={ReactRouterLink} to="/jogar">
              <Image
                src={logoSymbol}
                style={{ height: isCollapsed ? 'auto' : 0 }}
                data-testid="logo-symbol"
              />
              <Image
                src={logoFull}
                style={{ height: !isCollapsed ? 'auto' : 0 }}
                data-testid="logo-full"
              />
            </Link>
          </Container>
        </Container>

        <Container className={style.body} column gap={isLessThan2xl ? 35 : 50}>
          <Container className={style.userInfo} gap={24} align="center" column>
            <Container gap={14} align="center" justify="center">
              <Avatar src={user.account.avatar.medium} variant={user.status} />
              {!isCollapsed && (
                <Container column>
                  <Text
                    color="white"
                    fontWeight={'medium'}
                    fontSize={{ base: 16, md: 14, '2xl': 16 }}
                  >
                    {user.account.username}
                  </Text>

                  <Text
                    color="gray.700"
                    fontWeight={'medium'}
                    fontSize={{ base: 12, md: 10, '2xl': 12 }}
                  >
                    LEVEL {user.account.level}
                  </Text>
                </Container>
              )}
            </Container>

            <SidebarLobbyButton lobby={lobby} match={match} />
          </Container>

          <Container
            column
            gap={isLessThan2xl ? 26 : 38}
            className={style.menu}
          >
            <Container className={style.topMenu} column>
              <Container className={style.menuItem}>
                <Link as="button" onClick={handleToggleFriendListDrawer}>
                  <Container
                    className={style.menuLinkWrapper}
                    gap={14}
                    align="center"
                  >
                    <Icon as={FriendsIcon} fill="gray.700" />
                    {!isCollapsed && <Text>Amigos</Text>}
                  </Container>
                  <Container
                    justify={!isCollapsed ? 'end' : 'start'}
                    className={style.unreadBadge}
                  >
                    <Badge
                      variant={isCollapsed ? 'unread' : 'counter'}
                      style={{ opacity: receivedInvites.length > 0 ? 1 : 0 }}
                    >
                      {!isCollapsed && receivedInvites.length}
                    </Badge>
                  </Container>
                </Link>
              </Container>

              <Container className={style.menuItem}>
                <Link as="button" onClick={handleToggleNotificationsDrawer}>
                  <Container className={style.menuLinkWrapper} gap={14}>
                    <Icon as={BellFilledIcon} fill="gray.700" />
                    {!isCollapsed && <Text fontSize={14}>Notificações</Text>}
                  </Container>

                  <Container
                    justify={!isCollapsed ? 'end' : 'start'}
                    className={style.unreadBadge}
                  >
                    <Badge
                      variant={isCollapsed ? 'unread' : 'counter'}
                      style={{ opacity: unreadNotificationsCount > 0 ? 1 : 0 }}
                    >
                      {!isCollapsed && unreadNotificationsCount}
                    </Badge>
                  </Container>
                </Link>
              </Container>

              <Container className={[style.menuItem, style.soon].join(' ')}>
                <Link href="#">
                  <Container className={style.menuLinkWrapper} gap={14}>
                    <Icon as={PodiumIcon} fill="gray.700" />
                    {!isCollapsed && <Text>Ranking</Text>}
                  </Container>
                  {!isCollapsed && (
                    <Container justify="end">
                      <Badge
                        fontSize={{ base: 10, md: 8, '2xl': 10 }}
                        paddingBottom={{ base: '4px', md: '3px', '2xl': '4px' }}
                      >
                        Em breve
                      </Badge>
                    </Container>
                  )}
                </Link>
              </Container>

              <Container className={[style.menuItem, style.soon].join(' ')}>
                <Link href="#">
                  <Container className={style.menuLinkWrapper} gap={14}>
                    <Icon as={ShopIcon} fill="gray.700" />
                    {!isCollapsed && <Text>Loja</Text>}
                  </Container>
                  {!isCollapsed && (
                    <Container justify="end">
                      <Badge
                        fontSize={{ base: 10, md: 8, '2xl': 10 }}
                        paddingBottom={{ base: '4px', md: '3px', '2xl': '4px' }}
                      >
                        Em breve
                      </Badge>
                    </Container>
                  )}
                </Link>
              </Container>
            </Container>

            <Container column className={style.bottomMenu}>
              <Container className={style.menuItem}>
                <Link as="button" onClick={handleOpenModalSupport}>
                  <Icon as={SupportIcon} fill="gray.700" />
                  {!isCollapsed && <Text fontSize={14}>Suporte</Text>}
                </Link>
              </Container>

              <Container className={style.menuItem}>
                <Link as="button" onClick={handleOpenModalLogout}>
                  <Icon as={ExitIcon} fill="gray.700" />
                  {!isCollapsed && <Text fontSize={14}>Sair</Text>}
                </Link>
              </Container>
            </Container>
          </Container>
        </Container>

        <Container className={style.footer} align="end">
          {isCollapsed ? (
            <Container
              justify="center"
              gap={24}
              style={{ paddingLeft: '16px', paddingRight: '16px' }}
            >
              <Icon as={ShareIcon} color="gray.700" fontSize={18} />
            </Container>
          ) : (
            <Container gap={24}>
              <Link
                href="https://www.instagram.com/reloadclubgg/"
                isExternal
                fontSize={{ base: 18, md: 16, '2xl': 18 }}
              >
                <SiInstagram />
              </Link>

              <Link
                href="https://twitter.com/reloadclubgg"
                isExternal
                fontSize={{ base: 18, md: 16, '2xl': 18 }}
              >
                <SiTwitter />
              </Link>

              <Link
                href="https://discord.gg/mMMKshktfT"
                isExternal
                fontSize={{ base: 18, md: 16, '2xl': 18 }}
              >
                <SiDiscord />
              </Link>

              <Link
                href="https://www.youtube.com/channel/UC0Yx6OapSWC0pym9ACd-D1A"
                isExternal
                fontSize={{ base: 18, md: 16, '2xl': 18 }}
              >
                <SiYoutube />
              </Link>

              <Link
                href="https://www.facebook.com/profile.php?id=100089787770305"
                isExternal
                fontSize={{ base: 18, md: 16, '2xl': 18 }}
              >
                <SiFacebook />
              </Link>
            </Container>
          )}
        </Container>
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
