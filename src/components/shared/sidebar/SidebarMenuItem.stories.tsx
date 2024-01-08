import { Meta, StoryObj } from '@storybook/react'

import { App } from '@/store/appStore'
import { Invite } from '@/store/invitesStore'
import { Notification } from '@/store/notificationStore'
import { User } from '@/store/userStore'

import { SidebarMenuItem } from './SidebarMenuItem'

const itemsOptions = [
  'amigos',
  'notificações',
  'ranking',
  'loja',
  'suporte',
  'sair',
]

export default {
  title: 'Sidebar/SidebarMenuItem',
  component: SidebarMenuItem,
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

    const app: App = {
      toasts: [],
      friendListOpen: false,
      maintenance: false,
    }

    return <SidebarMenuItem {...props} />
  },
}
