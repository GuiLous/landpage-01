import { LineupPlayerCardHeader } from './LineupPlayerCardHeader'

export default {
  title: 'Lineup/LineupPlayerCardHeader',
  component: LineupPlayerCardHeader,
  argTypes: {
    avatar: { control: 'text' },
    username: { control: 'text' },
    isLobbyOwner: { control: 'boolean' },
  },
  args: {
    avatar:
      'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
    isLobbyOwner: false,
    username: 'User 1',
  },
}

export const Default = (props: any) => {
  return <LineupPlayerCardHeader {...props} />
}
