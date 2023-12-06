import { Provider } from 'react-redux'

import { store } from '@/store'

import { LineupSeat } from './LineupSeat'

export default {
  title: 'Lineup/LineupSeat',
  component: LineupSeat,
}

export const Default = (props: any) => {
  return (
    <div className="h-screen">
      <Provider store={store}>
        <LineupSeat {...props} />
      </Provider>
    </div>
  )
}
