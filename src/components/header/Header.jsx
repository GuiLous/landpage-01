import { Badge, Icon, Link } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import {
  BellIcon,
  Container,
  HeaderPlayButton,
  HeaderProfileMenu,
  NotificationList,
} from '@components'

import useOutsideClick from '../../hooks/useOutsideClick'

import logo from '@assets/images/logo_type_white.svg'
import style from './Header.module.css'

export default function Header() {
  const notifications = useSelector((state) => state.notifications)
  const user = useSelector((state) => state.user)
  const preMatch = useSelector((state) => state.match.preMatch)
  const match = useSelector((state) => state.match.match)

  const notificationsRef = useRef()

  useOutsideClick(
    notificationsRef,
    () => {
      setNotificationsVisible(false)
    },
    style.ignoreClickOutside
  )

  const [notificationsVisible, setNotificationsVisible] = useState(false)

  const toggleNotificationVisibility = () =>
    setNotificationsVisible(!notificationsVisible)

  const unreadNotificationsCount = notifications?.filter(
    (item) => !item.read_date
  ).length

  return (
    <Container className={style.container} align="stretch" justify="between">
      <Container className={style.logo} align="center" justify="center">
        <Link as={RouterLink} to="/">
          <img src={logo} alt="Reload logo" />
        </Link>
      </Container>

      <Container justify="end" align="center">
        <Container fitContent>
          <HeaderPlayButton user={user} preMatch={preMatch} match={match} />
        </Container>

        <Container fitContent className={style.notificationsWrapper}>
          <Container
            align="center"
            className={[style.notificationIcon, style.ignoreClickOutside].join(
              ' '
            )}
            onClick={toggleNotificationVisibility}
          >
            {unreadNotificationsCount > 0 && (
              <Badge className={style.notificationBadge}>
                {unreadNotificationsCount}
              </Badge>
            )}
            <Icon as={BellIcon} fill="gray.700" fontSize={24} />
          </Container>

          <div ref={notificationsRef}>
            <Container className={style.notificationList}>
              <NotificationList isOpen={notificationsVisible} />
            </Container>
          </div>
        </Container>

        <Container fitContent>
          <HeaderProfileMenu user={user} />
        </Container>
      </Container>
    </Container>
  )
}
