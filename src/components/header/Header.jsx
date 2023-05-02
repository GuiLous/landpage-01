import { Divider, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import logo from '@assets/images/logo_type_white.svg'

import {
  Container,
  HeaderPlayButton,
  HeaderProfileMenu,
  Notifications,
} from '@components'

import style from './Header.module.css'

export default function Header() {
  return (
    <Container className={style.header} align="center" justify="between">
      <Container className={style.logo} align="center" justify="center">
        <Link as={RouterLink} to="/">
          <img src={logo} alt="Reload logo" />
        </Link>
      </Container>

      <Container justify="end" align="center">
        <HeaderPlayButton />

        <Notifications />

        <Divider orientation="vertical" h={12} borderColor="#40444B" mr={6} />

        <HeaderProfileMenu />
      </Container>
    </Container>
  )
}
