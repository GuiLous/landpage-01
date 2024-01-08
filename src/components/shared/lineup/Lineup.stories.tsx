import { Lobby } from '@/store/lobbyStore'
import { PreMatch } from '@/store/preMatchStore'
import { User } from '@/store/userStore'

import { Lineup } from './Lineup'

export default {
  title: 'Lineup/Lineup',
  component: Lineup,
  argTypes: {
    isOwner: { control: 'number' },
  },
  args: {
    maxPlayers: 5,
  },
}

export const Default = (props: any) => {
  const lobby: Lobby = {
    id: 1,
    players: [
      {
        user_id: 1,
        status: 'online',
        username: 'Amigo 2',
        avatar: {
          medium: '',
          small: '',
          large:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
        lobby_id: 1,
        card: null,
      },
    ],
    invited_players_ids: [],
    players_ids: [],
    owner_id: 1,
    queue: null,
    queue_time: null,
    restriction_countdown: null,
    seats: 4,
  }

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

  const preMatch: PreMatch | null = null

  return (
    <div className="h-screen">
      <Lineup {...props} />
    </div>
  )
}
