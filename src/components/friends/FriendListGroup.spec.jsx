import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { FriendListGroup } from '@components'
import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import UserReducer from '@slices/UserSlice'

describe('FriendListGroup Component', () => {
  const user = {
    id: 1,
    lobby_id: 1,
  }

  const invites = []

  const lobby = {
    queue: null,
    invited_players_ids: [],
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
      invites: InviteReducer,
      lobby: LobbyReducer,
    },
    preloadedState: { user, invites, lobby },
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
      user_id: 11,
      status: 'offline',
      username: 'Username',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 2,
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
          user_id: 11,
          status: 'offline',
          username: 'Username',
          avatar:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          lobby_id: 2,
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

    render(
      <Provider store={store}>
        <FriendListGroup {...args} />
      </Provider>
    )
    expect(screen.getByTestId('container')).not.toHaveClass('open')
  })

  it('should render open', () => {
    let args = {
      title: 'Disponível',
      items: [
        {
          user_id: 11,
          status: 'offline',
          username: 'Username',
          avatar:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          lobby_id: 2,
        },
      ],
      open: true,
    }

    render(
      <Provider store={store}>
        <FriendListGroup {...args} />
      </Provider>
    )
    expect(screen.getByTestId('container')).toHaveClass('open')
  })

  it('should render with header disabled', () => {
    let args = {
      title: 'Disponível',
      items: [],
    }

    render(
      <Provider store={store}>
        <FriendListGroup {...args} />
      </Provider>
    )
    expect(screen.getByTestId('container')).not.toHaveClass('open')
    expect(screen.getByTestId('header')).toHaveClass('disabled')
  })

  it('should not render header if showHeader is false', () => {
    let args = {
      title: 'Offline',
      items: [
        {
          user_id: 11,
          status: 'offline',
          username: 'Username',
          avatar:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          lobby_id: 2,
        },
      ],
      showHeader: false,
    }

    render(
      <Provider store={store}>
        <FriendListGroup {...args} />
      </Provider>
    )
    expect(screen.getByTestId('header')).toHaveClass('hideHeader')
  })
})
