import { Icon, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NotificationsAPI } from '@api'
import {
  Container,
  DoubleCheckIcon,
  NotificationListItem,
  Scrollbars,
} from '@components'
import { StorageService } from '@services'
import {
  initNotifications,
  readAllNotifications,
  readNotification,
} from '@slices/NotificationSlice'
import { addToast } from '@slices/ToastSlice'

import logoSymbol from '@assets/images/logo_symbol_white.svg'
import style from './NotificationList.module.css'

export default function NotificationList({ isOpen }) {
  useEffect(() => {
    const fetch = async () => {
      const userToken = StorageService.get('token')

      const response = await NotificationsAPI.list(userToken)
      if (response) dispatch(initNotifications(response))
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const notifications = useSelector((state) => state.notifications)
  const userToken = StorageService.get('token')
  const dispatch = useDispatch()

  const hasUnread =
    notifications?.length > 0 &&
    notifications.filter((notification) => notification.read_date === null)
      .length > 0

  const showErrorToast = (error) => {
    dispatch(
      addToast({
        title: 'Algo saiu errado...',
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
    const response = await NotificationsAPI.read(userToken, id)
    if ('formError' in response) showErrorToast(response.formError.error)
    else if (response) dispatch(readNotification({ id: id }))
  }

  return (
    isOpen && (
      <Container className={style.container} column align="center">
        <Container className={style.header}>
          <Container>
            <Text fontSize={18} fontWeight="medium">
              Notificações
            </Text>
          </Container>

          <Container
            align="center"
            gap={8}
            justify="end"
            className={[style.readAllAction, !hasUnread && style.disabled].join(
              ' '
            )}
            onClick={readAll}
          >
            <Icon
              as={DoubleCheckIcon}
              fill={hasUnread ? 'secondary.400' : 'gray.700'}
            />
            <Text color={hasUnread ? 'secondary.400' : 'gray.700'}>
              Ler todas
            </Text>
          </Container>
        </Container>

        {notifications?.length > 0 && (
          <Container className={style.list}>
            <Scrollbars style={{ height: '300px' }} autoHide>
              {notifications?.map((item, index) => (
                <Container onMouseEnter={() => read(item.id)} key={item.id}>
                  <NotificationListItem {...item} />
                </Container>
              ))}
            </Scrollbars>
          </Container>
        )}

        {notifications?.length <= 0 && (
          <Container justify="center" className={style.empty}>
            <Text color="gray.700">Nada de novo por aqui.</Text>
          </Container>
        )}

        <Container className={style.footer} justify="center">
          <img src={logoSymbol} alt="ReloadClub" />
        </Container>
      </Container>
    )
  )
}
