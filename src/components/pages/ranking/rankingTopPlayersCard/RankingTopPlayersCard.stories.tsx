import { Meta } from '@storybook/react'

import { RankingTopPlayersCard } from './RankingTopPlayersCard'

export default {
  title: 'Ranking/RankingTopPlayersCard',
  component: RankingTopPlayersCard,
  argTypes: {
    level: { control: { type: 'range', min: 0, max: 30 } },
    ranking_pos: { control: { type: 'range', min: 1, max: 100 } },
  },
  args: {
    level: 0,
    ranking_pos: 1,
  },
} as Meta

export const Default = (props: any) => {
  const player = {
    user_id: 1,
    card: 'http://localhost:8000/media/store/decorative-card-card-o-comeco/media/cover__A59OXk__decorative-card-card-o-comeco.png',
    level: props.level,
    username: 'player 1',
    avatar: {
      medium:
        'https://avatars.steamstatic.com/51500c881104fb9bd7781bff016833d136d839e6_full.jpg',
    },
    status: 'online',
    steam_url: '',
    ranking_pos: props.ranking_pos,
    matches_won: 2,
    matches_played: 2,
    win_rate: 10,
    stats: {
      kda: '1.5',
    },
  }

  return <RankingTopPlayersCard player={player} {...props} />
}
