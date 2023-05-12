import { Container, UserCard } from '@components'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'User/UserCard',
  component: UserCard,
  argTypes: {
    showLeave: { control: 'boolean' },
    level: { control: { type: 'range', min: 0, max: 50 } },
    username: { control: 'text' },
    last_results: { control: 'object' },
    matches_played: { control: 'number' },
    userId: { control: 'number' },
    steamid: { control: 'text' },
  },
  args: {
    showLeave: true,
    level: 0,
    username: 'Username',
    onLeave: () => {},
    last_results: ['V', 'D', 'D', 'V', 'V'],
    matches_played: 10,
    userId: 1,
    steamid: '76561198075990604',
    avatar: {
      large:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
    },
  },
}

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <Container style={{ maxWidth: '280px' }}>
        <UserCard {...props} />
      </Container>
    </BrowserRouter>
  ),
}
