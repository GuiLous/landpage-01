import LevelProgressBar from './LevelProgressBar'

export default {
  title: 'Match/LevelProgressBar',
  component: LevelProgressBar,
  argTypes: {
    earned_points: { control: { type: 'range', min: -20, max: 30 } },
    level_points_before: { control: { type: 'range', min: 0, max: 100 } },
    level_points_after: { control: { type: 'range', min: 0, max: 100 } },
    level_before: { control: { type: 'range', min: 0, max: 50 } },
    level_after: { control: { type: 'range', min: 0, max: 50 } },
  },
  args: {
    earned_points: 10,
    level_points_before: 30,
    level_points_after: 40,
    level_before: 0,
    level_after: 0,
  },
}

export const Default = {
  render: (props) => <LevelProgressBar {...props} />,
}
