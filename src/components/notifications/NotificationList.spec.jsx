import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { NotificationsAPI } from '@api'
import { NotificationList } from '@components'
import NotificationReducer, {
  readAllNotifications,
  readNotification,
} from '@slices/NotificationSlice'

jest.mock('@api', () => ({
  NotificationsAPI: {
    readAll: jest.fn(),
    read: jest.fn(),
  },
}))

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

let notifications = []

const renderComponent = (isOpen = true) => {
  const store = configureStore({
    reducer: {
      notifications: NotificationReducer,
    },
    preloadedState: { notifications },
  })

  render(
    <Provider store={store}>
      <NotificationList isOpen={isOpen} />
    </Provider>
  )
}

describe('NotificationList Component', () => {
  afterEach(() => {
    notifications = []
  })

  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('Notificações')).toBeInTheDocument()
    expect(screen.getByText('LER TUDO')).toBeInTheDocument()
  })

  it('should not render if is not open', () => {
    renderComponent(false)

    expect(screen.queryByText('Notificações')).not.toBeInTheDocument()
    expect(screen.queryByText('LER TUDO')).not.toBeInTheDocument()
  })

  it('should render notifications items when not empty', async () => {
    notifications.push({
      id: 1,
      content: 'Nova notificação 1',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      read_date: null,
      create_date: new Date().toISOString(),
    })

    renderComponent()

    await screen.findByText('Nova notificação 1')
    expect(screen.getByText('Nova notificação 1')).toBeInTheDocument()
  })

  it('should render empty message when empty', async () => {
    renderComponent()

    await screen.findByText('Você não tem notificações.')
    expect(screen.getByText('Você não tem notificações.')).toBeInTheDocument()
  })

  it('should call readAll on click button LER TUDO', async () => {
    NotificationsAPI.readAll.mockResolvedValue({})

    notifications.push({
      id: 1,
      content: 'Nova notificação 1',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      read_date: null,
      create_date: new Date().toISOString(),
    })

    renderComponent()

    const readAllBtn = screen.getByText('LER TUDO')

    fireEvent.click(readAllBtn)

    await waitFor(() =>
      expect(NotificationsAPI.readAll).toHaveBeenCalledTimes(1)
    )
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(readAllNotifications())
    )
  })

  it('should disable button LER TUDO if notifications length is 0', () => {
    renderComponent()

    expect(screen.getByText('LER TUDO')).toBeDisabled()
  })

  it('should disable button LER TUDO if totalNotificationsNotRead length is 0', () => {
    notifications.push({
      id: 1,
      content: 'Nova notificação 1',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      read_date: new Date().toISOString(),
      create_date: new Date().toISOString(),
    })

    renderComponent()

    expect(screen.getByText('LER TUDO')).toBeDisabled()
  })

  it('should call read on mouse over', async () => {
    NotificationsAPI.read.mockResolvedValue({})

    notifications.push({
      id: 1,
      content: 'Nova notificação 1',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      read_date: null,
      create_date: new Date().toISOString(),
    })

    renderComponent()

    const notification = screen.getByTestId('notificationItem')

    fireEvent.mouseOver(notification)

    await waitFor(() => expect(NotificationsAPI.read).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(readNotification({ id: 1 }))
    )
  })
})
