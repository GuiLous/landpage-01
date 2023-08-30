import { BrowserRouter } from 'react-router-dom'
import MatchHistoryStatsLink from './MatchHistoryStatsLink'

export default {
  title: 'Profile/MatchHistoryStatsLink',
  component: MatchHistoryStatsLink,
  argTypes: {
    match: { control: 'object' },
    isLink: { control: 'boolean' },
    username: { control: 'text' },
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
      score: '13 - 10',
      start_date: '2023-05-05T10:20:00',
      end_date: '2023-05-05T10:30:00',
      won: true,
      map_name: 'Auditório',
      status: 'running',
      map_image:
        'https://static.wikia.nocookie.net/gtawiki/images/e/e8/SisyphusTheater-GTAV-Thumbnail.png',
      game_type: 'competitive',
    },
    isLink: true,
    username: 'player1',
  },
}

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <MatchHistoryStatsLink {...props} />
    </BrowserRouter>
  ),
}
