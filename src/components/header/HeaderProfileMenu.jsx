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
import { useSelector } from 'react-redux'

import { ArrowDownIcon, Container } from '@components'

import style from './HeaderProfileMenu.module.css'

export default function HeaderProfileMenu() {
  const user = useSelector((state) => state.user)

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ArrowDownIcon w="12px" h="7px" fill="gray.200" />}
        display="flex"
        alignItems="center"
        variant="unstyled"
        gap={1}
      >
        <Container fitContent align="center">
          <Flex flexDir="column" mr={6} alignItems="flex-start">
            <Text className={style.hello}>Olá!</Text>
            <Text>{user.account.username}</Text>
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
          as="a"
          href="/profile"
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
          as="a"
          href="/"
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
        >
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
