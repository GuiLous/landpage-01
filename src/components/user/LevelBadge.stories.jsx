import { Container, LevelBadge } from '@components'

export default {
  title: 'User/LevelBadge',
  component: LevelBadge,
  argTypes: {
    level: { control: { type: 'range', min: 0, max: 50 } },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', ''] },
    fitParent: { control: 'boolean' },
    fontSize: { control: 'number' },
    textYPosition: { control: 'number' },
    textXPosition: { control: 'number' },
  },
  args: {
    level: 0,
    size: 'md',
    fitParent: false,
    fontSize: null,
    textYPosition: null,
    textXPosition: null,
  },
}

export const Default = {
  render: (props) => (
    <Container>
      <LevelBadge {...props} />
    </Container>
  ),
}
