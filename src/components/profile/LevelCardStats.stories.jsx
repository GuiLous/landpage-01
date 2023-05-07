import LevelCardStats from './LevelCardStats'

export default {
  title: 'Profile/LevelCardStats',
  component: LevelCardStats,
  argTypes: {
    profile: { control: 'object' },
  },
  args: {
    profile: {
      level: 50,
      stats: {
        wins: 10,
        loses: 5,
        krd_rate: 0.88,
        economic_points: 8,
        adr_rate: 93.5,
        max_kills: 15,
        hs_percent: 88,
        max_damage: 190,
        combat_points: 400,
      },
      last_five_matches: ['win', 'loss', 'win', 'loss', 'loss'],
    },
  },
}

export const Default = {
  render: (props) => <LevelCardStats {...props} />,
}
