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

  const userNotifications = user.account.notifications || []

  const [notifications, setNotifications] = useState(userNotifications)
  const [isFetching, setIsFetching] = useState(false)

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
            <DoubleCheckIcon
              fill={
                isFetching || notifications.length === 0 ? '#fff' : '#00E4C9'
              }
              width="16px"
              height="9px"
            />
          }
          className={style.readAllBtn}
          onClick={handleReadAllNotifications}
          isDisabled={isFetching || notifications.length === 0}
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
          alignItems={notifications.length === 0 ? 'center' : 'initial'}
          justifyContent={notifications.length === 0 ? 'center' : 'initial'}
        >
          {notifications?.map((notification, index) => {
            const isRead = notification.read_date

            const created_date = DateTime.fromISO(notification.create_date)

            return (
              <Fragment key={notification.id}>
                <Flex
                  className={!isRead ? style.itemContainer : ''}
                  alignItems="center"
                >
                  <MenuItem
                    bgColor={isRead ? 'gray.900' : '#333333'}
                    className={style.notification}
                    cursor="initial"
                    closeOnSelect={false}
                  >
                    <Flex align="center" gap={3}>
                      <Badge
                        variant="unread"
                        alignSelf="baseline"
                        mt="5px"
                        bgColor={isRead && 'transparent'}
                      />
                      <Flex direction="column" align="flex-start" gap={1}>
                        <Text
                          textAlign="initial"
                          color={isRead ? '#fff' : 'secondary.400'}
                          fontSize={12}
                        >
                          {notification.content}
                        </Text>
                        <Text as="span" fontSize={10} color="#B7B7B7">
                          {created_date.toFormat(
                            "dd MMM ', ' yyyy ' às ' HH:mm"
                          )}
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
                    onClick={() => handleReadNotificationById(notification.id)}
                    isDisabled={isFetching}
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
                {index !== notifications.length - 1 && (
                  <Divider
                    width="86%"
                    marginRight={11}
                    mt={!isRead && 1}
                    alignSelf="end"
                    borderColor="#434343"
                  />
                )}
              </Fragment>
            )
          })}

          {notifications.length === 0 && <Text>Você não tem notificações</Text>}
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
