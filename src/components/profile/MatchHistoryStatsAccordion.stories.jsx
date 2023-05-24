import MatchHistoryStatsAccordion from './MatchHistoryStatsAccordion'

export default {
  title: 'Profile/MatchHistoryStatsAccordion',
  component: MatchHistoryStatsAccordion,
  argTypes: {
    user: { control: 'object' },
    match: { control: 'object' },
  },
  args: {
    user: {
      id: 1,
      status: 'online',
      account: {
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
        },
      },
    },
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
              },
            },
          ],
        },
      ],
      winner_id: 10,
      rounds: 15,
      start_date: '2023-05-05T10:00:00',
      end_date: '2023-05-05T10:30:00',
      map_name: 'Inferno',
    },
  },
}

export const Default = {
  render: (props) => <MatchHistoryStatsAccordion {...props} />,
}
