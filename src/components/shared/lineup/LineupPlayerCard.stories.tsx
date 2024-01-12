import { LineupPlayerCard } from './LineupPlayerCard'

export default {
  title: 'Lineup/LineupPlayerCard',
  component: LineupPlayerCard,
  argTypes: {
    closeLabel: { control: 'text' },
    onClose: { control: 'boolean' },
  },
  args: {
    closeLabel: 'Fechar',
    onClose: false,
  },
}

const player = {
  avatar: {
    large:
      'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
  },
  isLobbyOwner: false,
  username: 'User 1',
  steam_url: 'https://steamcommunity.com/profiles/76561198075990604',
  user_id: 1,
  latest_matches_results: ['V', 'D'],
  matches_played: 2,
  level: 0,
}

export const Default = (props: any) => {
  return (
    <div className="h-screen">
      <LineupPlayerCard
        player={player}
        onClose={() => console.log('')}
        {...props}
      />
    </div>
  )
}
