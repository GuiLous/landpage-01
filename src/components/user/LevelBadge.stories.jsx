import LevelBadge from './LevelBadge'

export default {
  title: 'User/LevelBadge',
  component: LevelBadge,
  argTypes: {
    level: { control: { type: 'range', min: 0, max: 50 } },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: {
    level: 0,
    size: 'md',
  },
}

export const Default = {
  render: (props) => <LevelBadge {...props} />,
}
