import { Icon, Menu, MenuButton } from '@chakra-ui/react'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { BellIcon, NotificationsMenuList } from '@components'
import UserReducer from '@slices/UserSlice'

describe('NotificationsMenuList Component', () => {
  it('should renders correctly', () => {
    const user = {
      id: 1,
      account: {
        notifications: [],
      },
    }

    const store = configureStore({
      reducer: {
        user: UserReducer,
      },
      preloadedState: { user },
    })

    render(
      <Provider store={store}>
        <Menu placement="bottom-end">
          <MenuButton aria-label="menu notifications button">
            <Icon as={BellIcon} fill="#999999" w={6} h={6} />
          </MenuButton>

          <NotificationsMenuList />
        </Menu>
      </Provider>
    )

    const openMenuButton = screen.getByRole('button', {
      name: 'menu notifications button',
    })
    fireEvent.click(openMenuButton)

    expect(screen.getByText('Notificações')).toBeInTheDocument()
  })

  it('should render notifications', () => {
    const user = {
      id: 1,
      account: {
        notifications: [
          {
            id: 1,
            to_user_id: 2,
            content: 'Nova atualização do FiveM disponível.',
            avatar: 'https://github.com/GuiLous.png',
            create_date: '2023-04-08T18:23:12',
            from_user_id: null,
            read_date: null,
          },
        ],
      },
    }

    const store = configureStore({
      reducer: {
        user: UserReducer,
      },
      preloadedState: { user },
    })

    render(
      <Provider store={store}>
        <Menu placement="bottom-end">
          <MenuButton aria-label="menu notifications button">
            <Icon as={BellIcon} fill="#999999" w={6} h={6} />
          </MenuButton>

          <NotificationsMenuList />
        </Menu>
      </Provider>
    )

    const openMenuButton = screen.getByRole('button', {
      name: 'menu notifications button',
    })
    fireEvent.click(openMenuButton)

    expect(
      screen.getByText('Nova atualização do FiveM disponível.')
    ).toBeInTheDocument()
  })
})
