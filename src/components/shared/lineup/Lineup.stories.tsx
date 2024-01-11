import { Lineup } from './Lineup'

export default {
  title: 'Lineup/Lineup',
  component: Lineup,
  argTypes: {
    isOwner: { control: 'number' },
  },
  args: {
    maxPlayers: 5,
  },
}

export const Default = (props: any) => {
  return (
    <div className="h-screen">
      <Lineup {...props} />
    </div>
  )
}
