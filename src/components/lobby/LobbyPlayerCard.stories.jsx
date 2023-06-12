import { BrowserRouter } from 'react-router-dom'

import { Container, LobbyPlayerCard } from '@components'

export default {
  title: 'Lobby/LobbyPlayerCard',
  component: LobbyPlayerCard,
  argTypes: {
    player: { control: 'object' },
    onClose: { control: 'boolean' },
    closeLabel: { control: 'text' },
  },
  args: {
    player: {
      username: 'Username',
      user_id: 9,
      avatar: {
        large:
          'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
      },
      latest_matches_results: ['V', 'D', 'N/A', 'N/A', 'N/A'],
      matches_played: 2,
      level: 1,
      steam_url: 'https://steamcommunity.com/profiles/76561198075990604',
    },
    onClose: true,
    closeLabel: 'Sair',
  },
}

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <Container style={{ height: '90vh' }}>
        <LobbyPlayerCard {...props} />
      </Container>
    </BrowserRouter>
  ),
}
