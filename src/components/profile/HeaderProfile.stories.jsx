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
      matches_won: 80,
      matches_lost: 100,
      stats: {
        kills: 2000,
        deaths: 1800,
        assists: 800,
        head_shots: 1200,
      },
    },
  },
}

export const Default = {
  render: (props) => <HeaderProfile {...props} />,
}
