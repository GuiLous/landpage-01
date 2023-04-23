import {
  Avatar,
  Badge,
  Button,
  Divider,
  Flex,
  Icon,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'

import logoSymbol from '@assets/images/logo_symbol_white.svg'

import { CheckIcon, Container, DoubleCheckIcon, Scrollbars } from '@components'

import style from './NotificationsMenuList.module.css'

const data = [
  {
    id: 2,
    to_user_id: 2,
    content: 'Nova atualização do FiveM disponível.',
    avatar: 'https://github.com/GuiLous.png',
    create_date: '2023-04-08T18:23:12',
    from_user_id: null,
    read_date: null,
  },
  {
    id: 3,
    to_user_id: 2,
    content: 'Uma nova solicitação de amizade para você.',
    avatar: 'https://github.com/GuiLous.png',
    create_date: '2023-04-07T18:23:12',
    from_user_id: 4,
    read_date: '2023-04-07T18:23:12',
  },
  {
    id: 4,
    to_user_id: 2,
    content: 'Uma nova solicitação de amizade para você.',
    avatar: 'https://github.com/GuiLous.png',
    create_date: '2023-04-07T18:23:12',
    from_user_id: 5,
    read_date: null,
  },
]

export default function NotificationsMenuList() {
  return (
    <MenuList
      bgColor="gray.900"
      border="1px"
      borderColor="gray.600"
      cursor="initial"
      w={330}
      h={335}
      zIndex={10}
      display="flex"
      flexDirection="column"
      pb={0}
    >
      <Flex px="20px" align="center" justifyContent="space-between">
        <Text fontWeight={500} fontSize={16}>
          Notificações
        </Text>
        <Button
          variant="unstyled"
          leftIcon={
            <DoubleCheckIcon fill="#00E4C9" width="16px" height="9px" />
          }
          className={style.readAllBtn}
        >
          Ler tudo
        </Button>
      </Flex>

      <Scrollbars autoHide>
        <Flex
          flex="1"
          mt="3"
          px={3}
          mb="2px"
          direction="column"
          gap={1}
          overflowY="auto"
          overflowX="hidden"
        >
          {data.map((notification, index) => {
            const isRead = notification.read_date

            return (
              <>
                <Flex
                  key={notification.id}
                  className={!isRead ? style.itemContainer : ''}
                  alignItems="center"
                >
                  <MenuItem
                    bgColor={isRead ? 'gray.900' : '#333333'}
                    className={style.notification}
                    cursor="initial"
                  >
                    <Flex align="center" gap={3}>
                      <Badge
                        variant="unread"
                        alignSelf="baseline"
                        mt="5px"
                        bgColor={isRead && 'transparent'}
                      />
                      <Flex direction="column" align="flex-start" gap={1}>
                        <Text textAlign="initial" color="#fff" fontSize={12}>
                          {notification.content}
                        </Text>
                        <Text as="span" fontSize={10} color="#B7B7B7">
                          10 Jun, 2022 as 10:30
                        </Text>
                      </Flex>
                      <Avatar
                        variant="teaming"
                        width="42px"
                        height="42px"
                        src={notification.avatar}
                        borderWidth={2}
                      />
                    </Flex>
                  </MenuItem>

                  <Button
                    variant="unstyled"
                    display="none"
                    className={style.readMessageBtn}
                  >
                    <Icon as={CheckIcon} fill="secondary.400" w={18} h={19} />
                    <Text
                      as="span"
                      fontSize={10}
                      textTransform="initial"
                      color="secondary.400"
                    >
                      Marcar como lida
                    </Text>
                  </Button>
                </Flex>
                {index !== data.length - 1 && (
                  <Divider
                    width="86%"
                    marginRight={11}
                    mt={!isRead && 1}
                    alignSelf="end"
                    borderColor="#434343"
                  />
                )}
              </>
            )
          })}
        </Flex>
      </Scrollbars>

      <Container
        className={style.footer}
        justify="center"
        align="end"
        fitContent
      >
        <img src={logoSymbol} alt="Reload" />
      </Container>
    </MenuList>
  )
}
