import { ProfileCard } from '@components'

export default {
  title: 'Profile/ProfileCard',
  component: ProfileCard,
  argTypes: { title: { control: 'text' } },
  args: { title: 'Título do card' },
}

export const Default = {
  render: (props) => <ProfileCard {...props} />,
}
