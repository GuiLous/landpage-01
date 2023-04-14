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
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import logo from '@assets/images/logo_type_white.svg'

import { ArrowDownIcon, Container, Notifications } from '@components'

import { HttpService, StorageService } from '@services'
import { updateUser } from '@slices/UserSlice'

import style from './Header.module.css'

export default function Header() {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogout = async () => {
    const token = StorageService.get('token')
    await HttpService.patch('accounts/logout/', token)

    dispatch(updateUser(null))
    StorageService.remove('token')
    navigate('/')
  }

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
            <Text className={style.hello}>Ola!</Text>
            <Text>{user.account.username}</Text>
          </Flex>

          <Menu>
            <MenuButton
              as={Button}
              className={style.menuAvatarButton}
              rightIcon={<ArrowDownIcon w="12px" h="7px" />}
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
