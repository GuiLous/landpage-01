import { LineupPlayBtn } from './LineupPlayBtn'

export default {
  title: 'Lineup/LineupPlayBtn',
  component: LineupPlayBtn,
  argTypes: {
    isOwner: { control: 'boolean' },
    isInQueue: { control: 'boolean' },
    isRestricted: { control: 'boolean' },
    isInMatch: { control: 'boolean' },
  },
  args: {
    isOwner: false,
    isInQueue: false,
    isRestricted: false,
    isInMatch: false,
  },
}

export const Default = (props: any) => {
  return <LineupPlayBtn {...props} />
}
