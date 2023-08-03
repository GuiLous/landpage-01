import { BrowserRouter } from 'react-router-dom'
import MatchHistoryStatsLink from './MatchHistoryStatsLink'

export default {
  title: 'Profile/MatchHistoryStatsLink',
  component: MatchHistoryStatsLink,
  argTypes: {
    user_id: { control: 'number' },
    match: { control: 'object' },
  },
  args: {
    match: {
      stats: {
        kda: '0/0/0',
        kdr: 0,
        head_accuracy: 0,
        adr: 0,
        firstkills: 0,
      },
      id: 0,
      score: '10:2',
      end_date: '2023-05-05T10:30:00',
      won: true,
      map_name: 'Auditório',
    },
  },
}

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <MatchHistoryStatsLink {...props} />
    </BrowserRouter>
  ),
}
