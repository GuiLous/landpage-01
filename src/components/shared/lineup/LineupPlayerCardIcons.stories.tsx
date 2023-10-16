import { LineupPlayerCardIcons } from './LineupPlayerCardIcons'

export default {
  title: 'Lineup/LineupPlayerCardIcons',
  component: LineupPlayerCardIcons,
  argTypes: {
    steam_url: { control: 'text' },
    matches_played: { control: 'number' },
  },
  args: {
    steam_url: 'https://steamcommunity.com/profiles/76561198075990604',
    user_id: 1,
  },
}

export const Default = (props: any) => {
  return <LineupPlayerCardIcons {...props} />
}
