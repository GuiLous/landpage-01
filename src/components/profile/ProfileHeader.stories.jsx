import { BrowserRouter } from 'react-router-dom'

import { ProfileHeader } from '@components'

export default {
  title: 'Profile/ProfileHeader',
  component: ProfileHeader,
  argTypes: {
    profile: { table: { disable: true } },
    hideNav: { control: 'boolean' },
  },
  args: {
    hideNav: false,
    profile: {
      username: 'Username',
      level: 0,
      level_points: 0,
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
      },
      stats: {},
      user_id: 1,
    },
  },
}

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <ProfileHeader {...props} />
    </BrowserRouter>
  ),
}
