import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { FriendListGroup } from '@components'
import UserReducer from '@slices/UserSlice'

describe('FriendListGroup Component', () => {
  const user = {
    id: 1,
    account: {
      lobby: {
        id: 1,
      },
      lobby_invites_sent: [],
    },
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  it('should render title and count correctly', () => {
    let args = {
      title: 'Disponível',
      items: [],
    }

    render(<FriendListGroup {...args} />)
    expect(screen.getByText('Disponível (0)')).toBeInTheDocument()

    args.title = 'Offline'
    args.items.push({
      id: 11,
      status: 'offline',
      username: 'Username',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      account: {
        lobby: {
          id: 2,
        },
      },
    })

    render(
      <Provider store={store}>
        <FriendListGroup {...args} />
      </Provider>
    )
    expect(screen.getByText('Offline (01)')).toBeInTheDocument()
  })

  it('should not collapse', () => {
    let args = {
      title: 'Disponível',
      items: [
        {
          id: 11,
          status: 'offline',
          username: 'Username',
          avatar:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          account: {
            lobby: {
              id: 2,
            },
          },
        },
      ],
      collapse: false,
    }

    render(
      <Provider store={store}>
        <FriendListGroup {...args} />
      </Provider>
    )
    expect(screen.queryByTestId('arrow-collapse')).not.toBeInTheDocument()
  })

  it('should render closed', () => {
    let args = {
      title: 'Disponível',
      items: [],
    }

    render(<FriendListGroup {...args} />)
    expect(screen.getByTestId('container')).not.toHaveClass('open')
  })

  it('should render open', () => {
    let args = {
      title: 'Disponível',
      items: [],
      open: true,
    }

    render(<FriendListGroup {...args} />)
    expect(screen.getByTestId('container')).toHaveClass('open')
  })

  it('should render with header disabled', () => {
    let args = {
      title: 'Disponível',
      items: [],
    }

    render(<FriendListGroup {...args} />)
    expect(screen.getByTestId('container')).not.toHaveClass('open')
    expect(screen.getByTestId('header')).toHaveClass('disabled')
  })
})
