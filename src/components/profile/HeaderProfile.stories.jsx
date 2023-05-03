import HeaderProfile from './HeaderProfile'

export default {
  title: 'Profile/HeaderProfile',
  component: HeaderProfile,
  argTypes: {
    profile: { control: 'object' },
  },
  args: {
    profile: {
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      },
      status: 'online',
      username: 'fulaninhodetal',
      level: 20,
      level_points: 80,
      stats: {
        wins: 80,
      },
    },
  },
}

export const Default = {
  render: (props) => <HeaderProfile {...props} />,
}
