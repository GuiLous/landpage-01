import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NotificationsAPI } from '@api'
import { Container, NotificationListItem, Scrollbars } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import {
  initNotifications,
  readAllNotifications,
  readNotification,
} from '@slices/NotificationSlice'

export default function NotificationList({ isOpen, onClose }) {
  const notifications = useSelector((state) => state.notifications)

  const dispatch = useDispatch()

  const userToken = StorageService.get('token')

  const [totalNotificationsNotRead, setTotalNotificationsNotRead] = useState(0)
  const [fetching, setFetching] = useState(true)

  const showErrorToast = (error) => {
    dispatch(
      addToast({
        content: error,
        variant: 'error',
      })
    )
  }

  const readAll = async () => {
    if (notifications.length <= 0) return
    const response = await NotificationsAPI.readAll(userToken)
    if ('formError' in response) showErrorToast(response.formError.error)
    else if (response) dispatch(readAllNotifications())
  }

  const read = async (id) => {
    const isAlreadyRead =
      notifications.find((notification) => notification.id === id).read_date !==
      null

    if (!isAlreadyRead) {
      const response = await NotificationsAPI.read(userToken, id)
      if ('formError' in response) showErrorToast(response.formError.error)
      else if (response) dispatch(readNotification({ id: id }))
    }
  }

  useEffect(() => {
    const fetch = async () => {
      setFetching(true)
      const userToken = StorageService.get('token')

      const response = await NotificationsAPI.list(userToken)
      if (response) dispatch(initNotifications(response))
      setFetching(false)
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const totalNotificationsNotRead =
        notifications.filter(
          (notification) => notification.read_date === null
        ) || 0

      setTotalNotificationsNotRead(totalNotificationsNotRead)
    }
  }, [notifications])

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay bg="transparent" />

      <DrawerContent
        py={6}
        w="350px"
        maxW="350px"
        bgColor="gray.900"
        transition="all 0s"
      >
        <DrawerCloseButton
          fontSize={12}
          width="fit-content"
          height="fit-content"
          top={5}
          right={5}
        />

        <DrawerHeader>NOTIFICAÇÕES</DrawerHeader>

        <DrawerBody
          p={0}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent={
            notifications?.length > 0 && !fetching ? 'flex-start' : 'center'
          }
        >
          {notifications?.length > 0 ? (
            <Scrollbars autoHide>
              {notifications?.map((item) => (
                <Container
                  onMouseEnter={() => read(item.id)}
                  key={item.id}
                  fitContent
                >
                  <NotificationListItem {...item} />
                </Container>
              ))}
            </Scrollbars>
          ) : fetching ? (
            <Text fontSize={12} color="white">
              Carregando...
            </Text>
          ) : (
            <Text fontSize={12} color="white">
              Você não tem notificações.
            </Text>
          )}
        </DrawerBody>

        <DrawerFooter py={0} px={6}>
          <Button
            w="100%"
            minH="37px"
            h="37px"
            fontSize={14}
            fontWeight="semiBold"
            isDisabled={
              notifications?.length === 0 ||
              totalNotificationsNotRead.length === 0
            }
            _disabled={{
              backgroundColor: 'gray.400',
              cursor: 'not-allowed',
              color: 'gray.700',
              _hover: {
                backgroundColor: 'gray.400',
              },
            }}
            onClick={readAll}
          >
            LER TUDO
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
