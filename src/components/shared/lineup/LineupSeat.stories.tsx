import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { LineupSeat } from './LineupSeat'

export default {
  title: 'Lineup/LineupSeat',
  component: LineupSeat,
}

export const Default = (props: any) => {
  const mockStore = configureStore()({})

  return (
    <div className="h-screen">
      <Provider store={mockStore}>
        <LineupSeat {...props} />
      </Provider>
    </div>
  )
}
