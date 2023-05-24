import { MatchHistoryPaginationItem } from '@components'

export default {
  title: 'Profile/MatchHistoryPaginationItem',
  component: MatchHistoryPaginationItem,
  argTypes: {
    isCurrent: { control: 'boolean' },
  },
  args: {
    isCurrent: true,
    content: '1',
  },
}

export const Default = {
  render: (props) => <MatchHistoryPaginationItem {...props} />,
}
