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
import { DateTime } from 'luxon'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'

import logoSymbol from '@assets/images/logo_symbol_white.svg'

import { CheckIcon, Container, DoubleCheckIcon, Scrollbars } from '@components'
import { HttpService, Toast } from '@services'

import style from './NotificationsMenuList.module.css'

export default function NotificationsMenuList() {
  const user = useSelector((state) => state.user)

  const userNotifications = useSelector((state) => state.notifications)

  const [notifications, setNotifications] = useState(userNotifications)
  const [isFetching, setIsFetching] = useState(false)

  const isNotificationsEmpty = notifications.length === 0

  const handleReadNotificationById = async (notification_id) => {
    if (isFetching) return

    let response

    setIsFetching(true)
    response = await HttpService.patch(`/notifications/${notification_id}/read`)
    setIsFetching(false)

    if (response && response.errorMsg) {
      Toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
      })
      return
    }
  }

  const handleReadAllNotifications = async () => {
    if (isFetching) return

    let response

    setIsFetching(true)
    response = await HttpService.patch(
      `/notifications/read-all/user/${user.id}`
    )
    setIsFetching(false)

    if (response && response.errorMsg) {
      Toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
      })
      return
    }
  }

  const formateDate = (create_date) => {
    return DateTime.fromISO(create_date).toFormat(
      "dd MMM ', ' yyyy ' às ' HH:mm"
    )
  }

  return (
    <MenuList
      bgColor="gray.900"
      border="1px"
      borderColor="gray.600"
      cursor="initial"
      w={353}
      h={isNotificationsEmpty ? 228 : 354}
      zIndex={10}
      display="flex"
      flexDirection="column"
      pb={0}
    >
      <Flex px="20px" align="center" justifyContent="space-between">
        <Text fontWeight={500} fontSize={18}>
          Notificações
        </Text>
        <Button
          variant="unstyled"
          leftIcon={
            <DoubleCheckIcon
              fill={isFetching || isNotificationsEmpty ? '#fff' : '#00E4C9'}
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
          mt={1}
          px={3}
          mb="2px"
          direction="column"
          gap={1}
          overflowY="auto"
          overflowX="hidden"
          alignItems={isNotificationsEmpty ? 'center' : 'initial'}
          justifyContent={isNotificationsEmpty ? 'center' : 'initial'}
          h={isNotificationsEmpty ? '15vh' : ''}
        >
          {notifications?.map((notification, index) => {
            return (
              <Fragment key={notification.id}>
                <Flex
                  className={!notification.read_date ? style.itemContainer : ''}
                  alignItems="center"
                >
                  <MenuItem
                    bgColor={notification.read_date ? 'gray.900' : '#333333'}
                    className={style.notification}
                    cursor="initial"
                    closeOnSelect={false}
                    minH="73px"
                  >
                    <Flex
                      align="center"
                      justifyContent="space-between"
                      w="full"
                      gap={4}
                    >
                      <Flex align="center" gap={2}>
                        <Badge
                          variant="unread"
                          alignSelf="baseline"
                          mt="5px"
                          bgColor={notification.read_date && 'transparent'}
                        />
                        <Flex direction="column" align="flex-start" gap={1}>
                          <Text
                            textAlign="initial"
                            color={
                              notification.read_date ? '#fff' : 'secondary.400'
                            }
                            fontSize={12}
                          >
                            {notification.content}
                          </Text>
                          <Text as="span" fontSize={12} color="#B7B7B7">
                            {formateDate(notification.create_date)}
                          </Text>
                        </Flex>
                      </Flex>

                      <Avatar
                        variant="teaming"
                        size="md"
                        src={notification.avatar}
                        borderWidth={2}
                      />
                    </Flex>
                  </MenuItem>

                  <Button
                    variant="unstyled"
                    display="none"
                    className={style.readMessageBtn}
                    onClick={() => handleReadNotificationById(notification.id)}
                    isDisabled={isFetching}
                  >
                    <Icon as={CheckIcon} fill="secondary.400" w={25} h={19} />
                    <Text
                      as="span"
                      fontSize={12}
                      textTransform="initial"
                      color="secondary.400"
                    >
                      Marcar como lida
                    </Text>
                  </Button>
                </Flex>
                {index !== notifications.length - 1 && (
                  <Divider
                    width="88%"
                    marginRight={11}
                    alignSelf="end"
                    borderColor="#434343"
                  />
                )}
              </Fragment>
            )
          })}

          {isNotificationsEmpty && (
            <Text fontSize={14}>Nada de novo por aqui.</Text>
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
  )
}
