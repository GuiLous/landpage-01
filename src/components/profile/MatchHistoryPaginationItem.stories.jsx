import { MatchHistoryPaginationItem } from '@components'

export default {
  title: 'Profile/MatchHistoryPaginationItem',
  component: MatchHistoryPaginationItem,
  argTypes: {
    isCurrent: { control: 'boolean' },
    number: { control: 'number' },
  },
  args: {
    isCurrent: true,
    number: 1,
  },
}

export const Default = {
  render: (props) => <MatchHistoryPaginationItem {...props} />,
}
