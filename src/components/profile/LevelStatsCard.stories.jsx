import LevelStatsCard from './LevelStatsCard'

export default {
  title: 'Profile/LevelStatsCard',
  component: LevelStatsCard,
  argTypes: {
    level: { control: { type: 'range', min: 0, max: 50 } },
    highest_level: { control: { type: 'range', min: 0, max: 50 } },
    latest_matches_results: {
      control: 'select',
      options: [
        ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
        ['V', 'D', 'V', 'D', 'V'],
        ['V', 'D', 'N/A', 'N/A', 'N/A'],
      ],
    },
    most_kills_in_a_match: { control: 'number' },
    most_damage_in_a_match: { control: 'number' },
  },
  args: {
    level: 20,
    highest_level: 23,
    matches_played: 340,
    match_won: 102,
    highest_win_streak: 8,
    latest_matches_results: ['V', 'D', 'D', 'V', 'V'],
    most_kills_in_a_match: 14,
    most_damage_in_a_match: 890,
    stats: {
      kills: 240,
      deaths: 640,
      assists: 350,
      damage: 65020,
      hs_kills: 45,
      shots_fired: 4500,
      head_shots: 45,
      chest_shots: 4065,
      other_shots: 390,
    },
  },
}

export const Default = {
  render: (props) => <LevelStatsCard {...props} />,
}
