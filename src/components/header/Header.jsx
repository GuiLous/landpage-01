import { Button, Divider, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import logo from '@assets/images/logo_type_white.svg'

import {
  Container,
  HeaderPlayButton,
  HeaderProfileMenu,
  Notifications,
  Timer,
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
          <Button
            size="xl"
            variant="danger"
            maxW={141}
            minW="initial"
            h={66}
            borderRadius={0}
          >
            <Container align="center" column>
              <Timer initialTime={lobby.restriction_countdown} reverse />
              <Text fontSize={12} textTransform="initial">
                FILA RESTRINGIDA
              </Text>
            </Container>
          </Button>
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
