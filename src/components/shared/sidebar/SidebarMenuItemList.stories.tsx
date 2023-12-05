import { configureStore } from '@reduxjs/toolkit'
import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import appSlice, { AppState } from '@/store/slices/appSlice'
import inviteSlice, { Invite } from '@/store/slices/inviteSlice'
import notificationSlice, {
  Notification,
} from '@/store/slices/notificationSlice'
import userSlice, { User } from '@/store/slices/userSlice'

import { SidebarMenuItemList } from './SidebarMenuItemList'

const itemsOptions = [
  'amigos',
  'notificações',
  'ranking',
  'loja',
  'suporte',
  'sair',
]

export default {
  title: 'Sidebar/SidebarMenuItemList',
  component: SidebarMenuItemList,
  argTypes: {
    unreadInvites: { control: { type: 'range', min: 0 } },
    unreadNotifications: { control: { type: 'range', min: 0 } },
    amigos: {
      options: itemsOptions,
      control: { type: 'select' },
    },
  },
  args: {
    unreadInvites: 0,
    unreadNotifications: 0,
    item: 'amigos',
  },
} as Meta

export const Default: StoryObj = {
  render: (props: any) => {
    const user: User = {
      id: 1,
      status: 'online',
      email: 'user@gmail.com',
      is_active: true,
      is_online: true,
      lobby_id: 1,
      match_id: null,
      pre_match_id: null,
      invites_available_count: 0,
      invites: [],
    }

    const invites: Invite[] = Array.from(Array(props.unreadInvites).keys()).map(
      (_, index) => ({
        to_player: {
          user_id: 1,
          avatar: {
            medium: '',
            large: '',
            small: '',
          },
          latest_matches_results: ['D'],
          level: 1,
          matches_played: 1,
          steam_url: '',
          username: '',
          status: 'online',
        },
        from_player: {
          user_id: index + 2,
          avatar: {
            medium: '',
            large: '',
            small: '',
          },
          latest_matches_results: ['D'],
          level: 1,
          matches_played: 1,
          steam_url: '',
          username: '',
          status: 'online',
        },
        id: `${index + 2}:1`,
        lobby_id: index + 2,
        create_date: new Date(),
      })
    )

    const notifications: Notification[] = Array.from(
      Array(props.unreadNotifications).keys()
    ).map((_, index) => ({
      id: index,
      read_date: null,
      avatar: '',
      content: '',
      create_date: new Date(),
      from_user_id: 1,
      to_user_id: 2,
    }))

    const app: AppState = {
      toasts: [],
      friendListOpen: false,
      maintenance: false,
    }

    const store = configureStore({
      reducer: {
        user: userSlice,
        notifications: notificationSlice,
        invites: inviteSlice,
        app: appSlice,
      },
      preloadedState: {
        user: { user },
        notifications,
        invites: { invites },
        app,
      },
    })

    return (
      <Provider store={store}>
        <SidebarMenuItemList {...props} />
      </Provider>
    )
  },
}
