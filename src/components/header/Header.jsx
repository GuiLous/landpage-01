import { Divider, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import logo from '@assets/images/logo_type_white.svg'

import {
  Container,
  HeaderPlayButton,
  HeaderProfileMenu,
  Notifications,
  RestrictedButton,
} from '@components'

import { useSelector } from 'react-redux'
import style from './Header.module.css'

export default function Header() {
  const user = useSelector((state) => state.user)
  const lobby = user && user.account.lobby

  return (
    <Container className={style.header} align="center" justify="between">
      <Container className={style.logo} align="center" justify="center">
        <Link as={RouterLink} to="/">
          <img src={logo} alt="Reload logo" />
        </Link>
      </Container>

      <Container justify="end" align="center">
        {lobby.restriction_countdown ? (
          <RestrictedButton
            restriction_countdown={lobby.restriction_countdown}
            maxW={141}
            minW="initial"
            minHeight="initial"
            h={66}
            borderRadius={0}
          />
        ) : (
          <HeaderPlayButton />
        )}

        <Notifications totalNotifications={10} />

        <Divider orientation="vertical" h={12} borderColor="#40444B" mr={6} />

        <HeaderProfileMenu />
      </Container>
    </Container>
  )
}
