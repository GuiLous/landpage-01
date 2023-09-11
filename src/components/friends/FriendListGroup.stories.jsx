import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Container, FriendListGroup } from '@components'
import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Friends/FriendListGroup',
  component: FriendListGroup,
  argTypes: {
    title: { control: 'text' },
    collapse: { control: 'boolean' },
    open: { control: 'boolean' },
    friendsCount: { control: 'number' },
    showHeader: { control: 'boolean' },
  },
  args: {
    title: 'Disponível',
    collapse: true,
    open: true,
    friendsCount: 2,
    showHeader: true,
  },
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8000/api/lobbies/invites/',
        method: 'POST',
        status: 200,
        response: {
          to_player: { user_id: 2 },
          from_player: { user_id: 1 },
          id: '1:2',
          lobby_id: 1,
        },
      },
    ],
  },
}

const user = {
  id: 1,
  lobby_id: 1,
}

const lobby = {
  queue: null,
  invited_players_ids: [],
  players_ids: [],
}

const invites = [
  {
    to_player: { user_id: 2 },
    from_player: { user_id: 1 },
    id: '1:2',
    lobby_id: 1,
  },
]

const store = configureStore({
  reducer: {
    user: UserReducer,
    invites: InviteReducer,
    lobby: LobbyReducer,
  },
  preloadedState: { user, invites, lobby },
})

export const Default = {
  render: (props) => {
    const genItems = Array.from(Array(props.friendsCount).keys()).map(
      (friend, index) => ({
        user_id: index + 2,
        lobby_id: index + 2,
        status: 'online',
        username: `Friend ${index + 2}`,
        avatar:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      })
    )
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Container style={{ height: '90vh' }}>
            <FriendListGroup {...props} items={genItems} />
          </Container>
        </Provider>
      </BrowserRouter>
    )
  },
}
