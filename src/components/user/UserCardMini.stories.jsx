import { UserCardMini } from '@components'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'User/UserCardMini',
  component: UserCardMini,
  argTypes: {
    showLeave: { control: 'boolean' },
    level: { control: { type: 'range', min: 0, max: 50 } },
    username: { control: 'text' },
    steamid: { control: 'text' },
  },
  args: {
    showLeave: true,
    level: 0,
    username: 'Username',
    onLeave: () => {},
    steamid: '76561198075990604',
    avatar: {
      medium:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
    },
  },
}

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <UserCardMini {...props} />
    </BrowserRouter>
  ),
}
