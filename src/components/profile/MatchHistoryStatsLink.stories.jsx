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
    user_id: 1,
    match: {
      teams: [
        {
          id: 10,
          score: 13,
          players: [
            {
              user_id: 1,
              points_earned: 20,
              stats: {
                kills: 10,
                deaths: 5,
                assists: 3,
                damage: 500,
                head_shots: 15,
                chest_shots: 20,
                other_shots: 40,
                firstkills: 5,
              },
            },
          ],
        },
        {
          id: 11,
          score: 10,
          players: [
            {
              user_id: 2,
              points_earned: -10,
              stats: {
                kills: 15,
                deaths: 10,
                assists: 1,
                damage: 700,
                head_shots: 20,
                chest_shots: 40,
                other_shots: 50,
                firstkills: 2,
              },
            },
          ],
        },
      ],
      id: 0,
      winner_id: 10,
      rounds: 15,
      start_date: '2023-05-05T10:00:00',
      end_date: '2023-05-05T10:30:00',
      map: {
        name: 'Auditório',
      },
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
