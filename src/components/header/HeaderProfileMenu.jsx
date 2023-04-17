import {
  Avatar,
  Badge,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { ArrowDownIcon, ArrowUpIcon, Container } from '@components'
import { HttpService, StorageService } from '@services'
import { updateUser } from '@slices/UserSlice'

import style from './HeaderProfileMenu.module.css'

export default function HeaderProfileMenu() {
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
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            isActive={isOpen}
            rightIcon={
              isOpen ? (
                <ArrowUpIcon w="12px" h="7px" fill="gray.200" />
              ) : (
                <ArrowDownIcon w="12px" h="7px" fill="gray.200" />
              )
            }
            display="flex"
            alignItems="center"
            variant="unstyled"
            gap={1}
            aria-label="menu button"
          >
            <Container fitContent align="center">
              <Flex flexDir="column" mr={6} alignItems="flex-start">
                <Text className={style.hello}>Olá!</Text>
                <Text textTransform="initial">{user.account.username}</Text>
              </Flex>

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
            </Container>
          </MenuButton>

          <MenuList bgColor="gray.900" border="1px" borderColor="gray.600">
            <MenuItem
              as={Link}
              to="/"
              bgColor="gray.900"
              fontSize={14}
              color="gray.700"
              py={1}
              _hover={{
                color: 'secondary.400',
              }}
            >
              Meu perfil
            </MenuItem>
            <MenuItem
              as={Link}
              to="/"
              bgColor="gray.900"
              fontSize={14}
              color="gray.700"
              py={1}
              _hover={{
                color: 'secondary.400',
              }}
            >
              Configurações
            </MenuItem>
            <MenuItem
              bgColor="gray.900"
              fontSize={14}
              color="gray.700"
              py={1}
              _hover={{
                color: 'secondary.400',
              }}
              onClick={handleLogout}
            >
              Sair
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}
