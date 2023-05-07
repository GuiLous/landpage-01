import LevelProgressBar from './LevelProgressBar'

export default {
  title: 'Match/LevelProgressBar',
  component: LevelProgressBar,
  argTypes: {
    earned_points: { control: { type: 'range', min: -20, max: 30 } },
    level_points: { control: { type: 'range', min: 0, max: 100 } },
    level: { control: { type: 'range', min: 0, max: 50 } },
  },
  args: {
    earned_points: 10,
    level_points: 30,
    level: 0,
  },
}

export const Default = {
  render: (props) => <LevelProgressBar {...props} />,
}
