import LevelCardStats from './LevelCardStats'

export default {
  title: 'Profile/LevelCardStats',
  component: LevelCardStats,
  argTypes: {
    user: { control: 'object' },
    match: { control: 'object' },
  },
  args: {
    user: {
      level: 50,
      wins: 10,
      loses: 5,
      win_rate: 68,
      kda_rate: 0.88,
      adr_rate: 93.5,
      hs_percent: 8,
      combat_points: 173,
      economic_points: 8,
    },
  },
}

export const Default = {
  render: (props) => <LevelCardStats {...props} />,
}
