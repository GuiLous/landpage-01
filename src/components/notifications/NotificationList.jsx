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
  readAllNotifications,
  readNotification,
} from '@slices/NotificationSlice'

export default function NotificationList({ isOpen, onClose }) {
  const notifications = useSelector((state) => state.notifications)

  const dispatch = useDispatch()

  const userToken = StorageService.get('token')

  const [totalNotificationsNotRead, setTotalNotificationsNotRead] = useState(0)

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
    if (response.errorMsg) showErrorToast(response.errorMsg)
    else if (response) dispatch(readAllNotifications())
  }

  const read = async (id) => {
    const isAlreadyRead =
      notifications.find((notification) => notification.id === id).read_date !==
      null

    if (!isAlreadyRead) {
      const response = await NotificationsAPI.read(userToken, id)
      if (response.errorMsg) showErrorToast(response.errorMsg)
      else if (response) dispatch(readNotification({ id: id }))
    }
  }

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
        w={{ base: '350px', md: '300px', '2xl': '350px' }}
        maxW={{ base: '350px', md: '300px', '2xl': '350px' }}
        bgColor="gray.900"
        transition="all 0s"
      >
        <DrawerCloseButton
          fontSize={12}
          width="fit-content"
          height="fit-content"
          top={4}
          right={4}
          _hover={{
            color: 'gray.300',
          }}
        />

        <DrawerHeader textTransform="capitalize">Notificações</DrawerHeader>

        <DrawerBody
          p={0}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent={notifications.length > 0 ? 'flex-start' : 'center'}
        >
          {notifications.length > 0 ? (
            <Scrollbars autoHide>
              {notifications.map((item) => (
                <Container
                  onMouseEnter={() => read(item.id)}
                  key={item.id}
                  fitContent
                >
                  <NotificationListItem {...item} />
                </Container>
              ))}
            </Scrollbars>
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
              notifications.length === 0 ||
              totalNotificationsNotRead.length === 0
            }
            _disabled={{
              backgroundColor: 'gray.700',
              cursor: 'not-allowed',
              color: 'gray.300',
              _hover: {
                backgroundColor: 'gray.700',
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
