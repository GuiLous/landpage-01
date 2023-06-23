import { ProfileHeader } from '@components'

export default {
  title: 'Profile/ProfileHeader',
  component: ProfileHeader,
  argTypes: {
    user: { table: { disable: true } },
  },
  args: {
    account: {
      username: 'Username',
      level: 0,
      level_points: 0,
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
      },
    },
  },
}

export const Default = {
  render: (props) => <ProfileHeader {...props} />,
}
