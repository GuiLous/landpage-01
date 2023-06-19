import { MatchHistoryPagination } from '@components'

export default {
  title: 'Profile/MatchHistoryPagination',
  component: MatchHistoryPagination,
  argTypes: {
    totalCountOfRegisters: { control: 'number' },
    registerPerPage: { control: 'number' },
    currentPage: { control: 'number' },
    onPageChange: { table: { disable: true } },
  },
  args: {
    totalCountOfRegisters: 100,
    registerPerPage: 10,
    currentPage: 1,
    onPageChange: () => {},
  },
}

export const Default = {
  render: (props) => {
    return <MatchHistoryPagination {...props} />
  },
}
