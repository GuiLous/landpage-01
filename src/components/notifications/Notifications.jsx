import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import logoSymbol from '@assets/images/logo_symbol_white.svg'

import {
  BellIcon,
  Container,
  DoubleCheckIcon,
  NotificationListItem,
  Scrollbars,
} from '@components'
import { HttpService, Toast } from '@services'

import style from './Notifications.module.css'

export default function Notifications() {
  const user = useSelector((state) => state.user)
  const userNotifications = useSelector((state) => state.notifications)

  const [notifications, setNotifications] = useState(userNotifications)
  const [isFetching, setIsFetching] = useState(false)

  const totalUnreadNotifications = notifications.filter(
    (notification) => notification.read_date === null
  ).length

  const isNotificationsEmpty = notifications.length === 0

  const handleReadAllNotifications = async () => {
    if (isFetching) return

    let response

    setIsFetching(true)
    response = await HttpService.patch(
      `/notifications/read-all/user/${user.id}`
    )
    setIsFetching(false)

    const clonedNotifications = [...notifications]

    clonedNotifications.forEach(
      (notification) => (notification.read_date = new Date().toISOString())
    )

    setNotifications(clonedNotifications)

    if (response && response.errorMsg) {
      Toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
      })
      return
    }
  }

  return (
    <Box className={style.notificationBox}>
      <Menu placement="bottom-end">
        {({ isOpen }) => (
          <>
            <MenuButton aria-label="menu notifications button">
              {totalUnreadNotifications > 0 && (
                <Badge className={style.badge} borderRadius="full">
                  {totalUnreadNotifications}
                </Badge>
              )}
              <Icon as={BellIcon} fill="#999999" w={6} h={6} />
            </MenuButton>

            <MenuList
              bgColor="gray.900"
              border="1px"
              borderColor="gray.600"
              cursor="initial"
              w={isOpen ? 353 : 343}
              h={isNotificationsEmpty ? 228 : 354}
              zIndex={10}
              display="flex"
              flexDirection="column"
              pb={0}
              position="relative"
            >
              <Flex px="20px" align="center" justifyContent="space-between">
                <Text fontWeight={500} fontSize={18}>
                  Notificações
                </Text>
                <Button
                  variant="unstyled"
                  leftIcon={
                    <DoubleCheckIcon
                      fill={
                        isFetching || isNotificationsEmpty ? '#fff' : '#00E4C9'
                      }
                      width="14px"
                      height="8px"
                    />
                  }
                  className={style.readAllBtn}
                  onClick={handleReadAllNotifications}
                  isDisabled={isFetching || isNotificationsEmpty}
                >
                  Ler tudo
                </Button>
              </Flex>

              <Scrollbars autoHide>
                <Flex
                  flex="1"
                  px={3}
                  mb="2px"
                  direction="column"
                  gap={1}
                  alignItems={isNotificationsEmpty ? 'center' : 'initial'}
                  justifyContent={isNotificationsEmpty ? 'center' : 'initial'}
                  position="absolute"
                  w="100%"
                  h="100%"
                >
                  {notifications?.map((notification, index) => {
                    return (
                      <NotificationListItem
                        key={notification.id}
                        index={index}
                        notification={notification}
                        isFetching={isFetching}
                        setIsFetching={setIsFetching}
                        notifications={notifications}
                        setNotifications={setNotifications}
                      />
                    )
                  })}

                  {isNotificationsEmpty && (
                    <Text fontSize={12} mt={-2}>
                      Nada de novo por aqui.
                    </Text>
                  )}
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
          </>
        )}
      </Menu>
    </Box>
  )
}
