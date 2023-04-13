import {
  Link,
  Divider,
  Flex,
  Text,
  Menu,
  MenuButton,
  Button,
  Avatar,
  Badge,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import logo from '@assets/images/logo_type_white.svg'
import { Container } from '@components'
import ArrowDownIcon from '@components/icons/ArrowDownIcon'
import { updateUser } from '@slices/UserSlice'
import { HttpService, StorageService } from '@services'

import Notifications from './Notifications'
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
        <img src={logo} alt="Reload logo" />
      </Container>

      <Container justify="end" align="center">
        <Link
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
