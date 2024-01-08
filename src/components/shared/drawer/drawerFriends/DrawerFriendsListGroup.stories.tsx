import { Invite } from '@/store/invitesStore'
import { Lobby } from '@/store/lobbyStore'
import { User } from '@/store/userStore'

import { DrawerFriendsListGroup } from './DrawerFriendsListGroup'

export default {
  title: 'Friends/DrawerFriendsListGroup',
  component: DrawerFriendsListGroup,
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
}

export const Default = (props: any) => {
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
        large: '',
      },
    },
    invites_available_count: 0,
    invites: [],
  }

  const invites: Invite[] = [
    {
      id: '1:2',
      from_player: {
        user_id: 1,
        avatar: {
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          large: '',
          small: '',
        },
        latest_matches_results: ['D'],
        level: 1,
        matches_played: 1,
        steam_url: '',
        username: 'Amigo 12',
        status: 'online',
      },
      to_player: {
        user_id: 2,
        avatar: {
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          large: '',
          small: '',
        },
        latest_matches_results: ['D'],
        level: 1,
        matches_played: 1,
        steam_url: '',
        username: 'User 1',
        status: 'online',
      },
      lobby_id: 1,
      create_date: new Date(),
    },
  ]

  const lobby: Lobby = {
    id: 1,
    players: [],
    invited_players_ids: [],
    players_ids: [],
    owner_id: 1,
    queue: null,
    queue_time: null,
    restriction_countdown: null,
    seats: 4,
  }

  const genFriends = Array.from(Array(props.friendsCount).keys()).map(
    (_, index) => ({
      user_id: index + 2,
      lobby_id: index + 2,
      status: 'online',
      username: `Friend ${index + 2}`,
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      },
    })
  )
  return <DrawerFriendsListGroup {...props} friends={genFriends} />
}
