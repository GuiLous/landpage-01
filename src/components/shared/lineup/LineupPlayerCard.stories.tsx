import { Meta } from '@storybook/react'

import { LineupPlayerCard } from './LineupPlayerCard'

export default {
  title: 'Lineup/LineupPlayerCard',
  component: LineupPlayerCard,
  argTypes: {
    level: { control: { type: 'range', min: 0, max: 30 } },
  },
  args: {
    level: 0,
  },
} as Meta

export const Default = (props: any) => {
  const player = {
    user_id: 1,
    card: 'http://localhost:8000/media/store/decorative-card-card-o-comeco/media/cover__A59OXk__decorative-card-card-o-comeco.png',
    level: props.level,
    matches_played: 0,
    username: 'player 1',
    avatar: {
      large:
        'https://avatars.steamstatic.com/51500c881104fb9bd7781bff016833d136d839e6_full.jpg',
    },
    status: 'online',
    steam_url: '',
  }

  return (
    <div className="min-h-[571px] max-w-[283.5px]">
      <LineupPlayerCard
        onClose={() => console.log('closed')}
        playSoundClick={() => console.log('clicked')}
        playSoundHover={() => console.log('hovered')}
        player={player}
        {...props}
      />
    </div>
  )
}
