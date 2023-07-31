import { MatchHistoryPagination } from '@components'

export default {
  title: 'Profile/MatchHistoryPagination',
  component: MatchHistoryPagination,
  argTypes: {
    totalPages: { control: 'number' },
    currentPage: { control: 'number' },
    onPageChange: { table: { disable: true } },
  },
  args: {
    totalPages: 1,
    currentPage: 1,
    onPageChange: () => {},
  },
}

export const Default = {
  render: (props) => {
    return <MatchHistoryPagination {...props} />
  },
}
