import {
  Avatar,
  Badge,
  Button,
  Divider,
  Flex,
  Link,
  Menu,
  MenuButton,
  Text,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import logo from '@assets/images/logo_type_white.svg'

import { ArrowDownIcon, Container, Notifications } from '@components'

import style from './Header.module.css'

export default function Header() {
  const user = useSelector((state) => state.user)

  return (
    <Container className={style.header} align="center" justify="between">
      <Container className={style.logo} align="center" justify="center">
        <Link as={RouterLink} to="/">
          <img src={logo} alt="Reload logo" />
        </Link>
      </Container>

      <Container justify="end" align="center">
        <Link
          className={style.statusLobbyLinkBtn}
          color="gray.200"
          _hover={{
            color: 'gray.200',
          }}
          as={RouterLink}
          to="/jogar"
        >
          Jogar
        </Link>

        <Notifications totalNotifications={10} />

        <Divider orientation="vertical" h={12} borderColor="#40444B" mr={6} />

        <Container fitContent align="center">
          <Flex flexDir="column" mr={6}>
            <Text className={style.hello}>Olá!</Text>
            <Text>{user.account.username}</Text>
          </Flex>

          <Menu>
            <MenuButton
              as={Button}
              className={style.menuAvatarButton}
              rightIcon={<ArrowDownIcon w="12px" h="7px" fill="#F5F6F8" />}
              display="flex"
              alignItems="center"
              variant="unstyled"
              minH="46px"
              gap={1}
            >
              <Avatar
                variant="online"
                width="46px"
                height="46px"
                src={user.account.avatar.small}
                borderWidth={2}
              >
                <Badge
                  variant="online"
                  pos="absolute"
                  top="-1px"
                  right="-2px"
                  height="11px"
                  width="11px"
                />
              </Avatar>
            </MenuButton>
          </Menu>
        </Container>
      </Container>
    </Container>
  )
}
