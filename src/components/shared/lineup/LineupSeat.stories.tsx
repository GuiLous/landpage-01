import { LineupSeat } from './LineupSeat'

export default {
  title: 'Lineup/LineupSeat',
  component: LineupSeat,
}

export const Default = (props: any) => {
  return (
    <div className="h-screen">
      <LineupSeat {...props} />
    </div>
  )
}
