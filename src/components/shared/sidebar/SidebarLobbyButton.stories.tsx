import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import lobbySlice, { Lobby } from '@/store/slices/lobbySlice'
import userSlice, { User } from '@/store/slices/userSlice'

import { SidebarLobbyButton } from './SidebarLobbyButton'

export default {
  title: 'Sidebar/SidebarLobbyButton',
  component: SidebarLobbyButton,
  argTypes: {
    isInQueue: { control: 'boolean' },
    isInMatch: { control: 'boolean' },
    isRestricted: { control: 'boolean' },
  },
  args: {
    isInQueue: false,
    isInMatch: false,
    isRestricted: false,
  },
}

export const Default = {
  render: (props: any) => {
    const user: User = {
      id: 1,
      status: 'online',
      email: 'user@gmail.com',
      is_active: true,
      is_online: true,
      lobby_id: 1,
      match_id: props.isInMatch ? 1 : null,
      pre_match_id: null,
    }

    const lobby: Lobby = {
      queue: props.isInQueue ? new Date() : null,
      queue_time: 300,
      restriction_countdown: props.isRestricted ? 300 : null,
      id: 1,
      invited_players_ids: [],
      owner_id: 1,
      players_ids: [1],
      seats: 4,
    }

    const store = configureStore({
      reducer: {
        user: userSlice,
        lobby: lobbySlice,
      },
      preloadedState: {
        user: { user },
        lobby: { ...lobby },
      },
    })

    return (
      <Provider store={store}>
        <SidebarLobbyButton {...props} />
      </Provider>
    )
  },
}
