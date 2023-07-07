import {
  Avatar,
  Badge,
  Button,
  Icon,
  IconButton,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
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
  BackpackIcon,
  BellFilledIcon,
  BlockIcon,
  ClockIcon,
  Container,
  ExitIcon,
  FriendList,
  FriendsIcon,
  JoystickIcon,
  LogoutModal,
  NotificationList,
  PlayIcon,
  PodiumIcon,
  SettingsIcon,
  ShareIcon,
  ShopIcon,
  SupportIcon,
  SupportModal,
  Timer,
  UserIcon,
} from '@components'
import { toggleFriendList } from '@slices/AppSlice'
import { formatSecondsToMinutes } from '@utils'

import style from './Sidebar.module.css'

export default function Sidebar({ collapsed = true, collapsable = false }) {
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

  const renderButtons = () => {
    const showPlayButton =
      !lobby.queue && !match && !lobby.restriction_countdown

    const showQueueButton =
      lobby.queue && !match && !lobby.restriction_countdown

    const showRestrictedButton = lobby.restriction_countdown && !match

    return (
      <>
        {showPlayButton && (
          <Button
            leftIcon={<FaPlay />}
            className={style.playBtn}
            fontSize={18}
            fontWeight="bold"
            height={55}
            w="full"
            as={ReactRouterLink}
            to="/jogar"
          >
            COMEÇAR
          </Button>
        )}

        {showQueueButton && (
          <Button
            leftIcon={<ClockIcon />}
            className={style.queueBtn}
            fontSize={18}
            fontWeight="bold"
            height={55}
            w="full"
            as={ReactRouterLink}
            to="/jogar"
            variant="queue"
          >
            <Text minW="52px" top="1px" position="relative">
              {formatSecondsToMinutes(lobby.queue_time)}
            </Text>
          </Button>
        )}

        {match && (
          <Button
            leftIcon={<JoystickIcon />}
            className={style.queueBtn}
            fontSize={18}
            fontWeight="bold"
            height={55}
            w="full"
            as={ReactRouterLink}
            to={`partidas/${match.id}`}
            variant="queue"
          >
            EM PARTIDA
          </Button>
        )}

        {showRestrictedButton && (
          <Button
            className={style.dangerBtn}
            fontSize={18}
            fontWeight="bold"
            height={55}
            w="full"
            as={ReactRouterLink}
            to="/jogar"
            variant="restricted"
          >
            <Container column align="center" gap={4}>
              <Text fontSize={12} color="white" fontWeight="semiBold">
                GRUPO COM RESTRIÇÃO
              </Text>

              <Container justify="center" align="center" gap={4}>
                <Icon as={BlockIcon} fill="white" w="16px" h="16px" />
                <Text fontSize={18} fontWeight="bold" w={10} lineHeight={1}>
                  <Timer initialTime={lobby.restriction_countdown} reverse />
                </Text>
              </Container>
            </Container>
          </Button>
        )}
      </>
    )
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
        gap={48}
      >
        <Container column fitContent gap={48}>
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

          <Container
            align="center"
            justify="center"
            fitContent
            className={style.btnWrapper}
          >
            {isCollapsed ? (
              <IconButton
                as={Button}
                icon={<PlayIcon />}
                aria-label="Jogar"
                fontSize={18}
                fontWeight="bold"
                height={55}
                className={style.playBtn}
              />
            ) : (
              renderButtons()
            )}
          </Container>
        </Container>

        <Container className={style.body} column gap={14}>
          <Container className={style.userInfo} align="center">
            <Container gap={14} align="center" justify="center">
              <Avatar src={user.account.avatar.medium} variant={user.status} />
              {!isCollapsed && (
                <Container column>
                  <Text color="white" fontWeight={'medium'}>
                    {user.account.username}
                  </Text>

                  <Text color="gray.700" fontWeight={'medium'} fontSize={12}>
                    LEVEL {user.account.level}
                  </Text>
                </Container>
              )}
            </Container>
          </Container>

          <Container column gap={38}>
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

              <Container className={style.menuItem}>
                <Link as={ReactRouterLink} to={`/perfil/${user.id}`}>
                  <Icon as={UserIcon} fill="gray.700" />
                  {!isCollapsed && <Text>Perfil</Text>}
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
                      <Badge>Em breve</Badge>
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
                      <Badge>Em breve</Badge>
                    </Container>
                  )}
                </Link>
              </Container>

              <Container className={[style.menuItem, style.soon].join(' ')}>
                <Link href="#">
                  <Container className={style.menuLinkWrapper} gap={14}>
                    <Icon as={BackpackIcon} fill="gray.700" />
                    {!isCollapsed && <Text>Inventário</Text>}
                  </Container>
                  {!isCollapsed && (
                    <Container justify="end">
                      <Badge>Em breve</Badge>
                    </Container>
                  )}
                </Link>
              </Container>
            </Container>

            <Container column className={style.bottomMenu}>
              <Container className={style.menuItem}>
                <Link as={ReactRouterLink} to="/conta">
                  <Icon as={SettingsIcon} fill="gray.700" />
                  {!isCollapsed && <Text>Conta</Text>}
                </Link>
              </Container>

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
            <Container gap={24} style={{ padding: '0 40px 40px' }}>
              <Link href="https://www.instagram.com/reloadclubgg/" isExternal>
                <SiInstagram fontSize={18} />
              </Link>

              <Link href="https://twitter.com/reloadclubgg" isExternal>
                <SiTwitter fontSize={18} />
              </Link>

              <Link href="https://discord.gg/mMMKshktfT" isExternal>
                <SiDiscord fontSize={18} />
              </Link>

              <Link
                href="https://www.youtube.com/channel/UC0Yx6OapSWC0pym9ACd-D1A"
                isExternal
              >
                <SiYoutube fontSize={18} />
              </Link>

              <Link
                href="https://www.facebook.com/profile.php?id=100089787770305"
                isExternal
              >
                <SiFacebook fontSize={18} />
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
