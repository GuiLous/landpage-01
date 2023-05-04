import LevelProgressBar from './LevelProgressBar'

export default {
  title: 'Match/LevelProgressBar',
  component: LevelProgressBar,
  argTypes: {
    earned_points: { control: 'number' },
    level_points: { control: 'number' },
    level: { control: 'number' },
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
