import {
  Avatar,
  Badge,
  Button,
  Divider,
  Flex,
  Icon,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'

import { CheckIcon } from '@components'
import { HttpService, Toast } from '@services'

import style from './NotificationListItem.module.css'

export default function NotificationListItem({
  index,
  notification,
  isFetching,
  setIsFetching,
  notifications,
  setNotifications,
}) {
  const totalNotifications = notifications.length

  const handleReadNotificationById = async (notification_id) => {
    if (isFetching) return

    let response

    setIsFetching(true)
    response = await HttpService.patch(`/notifications/${notification_id}/read`)
    setIsFetching(false)

    const clonedNotifications = [...notifications]

    const notification = clonedNotifications.find(
      (notification) => notification.id === notification_id
    )

    notification.read_date = response.data.read_date

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

  const formateDate = (create_date) => {
    return DateTime.fromISO(create_date).toFormat(
      "dd MMM ', ' yyyy ' às ' HH:mm"
    )
  }

  return (
    <>
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
          <Flex align="center" justifyContent="space-between" w="full" gap={4}>
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
                  color={notification.read_date ? '#fff' : 'secondary.400'}
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
      {index !== totalNotifications - 1 && (
        <Divider
          width="88%"
          marginRight={11}
          alignSelf="end"
          borderColor="#434343"
        />
      )}
    </>
  )
}
