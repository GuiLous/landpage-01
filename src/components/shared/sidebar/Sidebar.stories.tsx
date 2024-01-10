import { App } from '@/store/appStore'
import { Invite } from '@/store/invitesStore'
import { Lobby } from '@/store/lobbyStore'
import { Notification } from '@/store/notificationStore'
import { User } from '@/store/userStore'

import { Sidebar } from './Sidebar'

export default {
  title: 'Sidebar/Sidebar',
  component: Sidebar,
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
      match_id: null,
      pre_match_id: null,
      account: {
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: ' ',
        },
        coins: 0,
        username: 'User1',
        level: 2,
      },
      invites_available_count: 0,
      invites: [],
    }

    const invites: Invite[] = [
      {
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
          user_id: 2,
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
        id: '2:1',
        lobby_id: 2,
        create_date: new Date(),
      },
    ]

    const notifications: Notification[] = [
      {
        id: 1,
        read_date: null,
        avatar: '',
        content: '',
        create_date: new Date(),
        from_user_id: 1,
        to_user_id: 2,
      },
    ]

    const lobby: Lobby = {
      queue: null,
      queue_time: 300,
      restriction_countdown: null,
      id: 1,
      invited_players_ids: [],
      owner_id: 1,
      players_ids: [1],
      seats: 4,
    }

    const app: App = {
      toasts: [],
      friendListOpen: false,
      maintenance: false,
    }

    return <Sidebar {...props} />
  },
}
