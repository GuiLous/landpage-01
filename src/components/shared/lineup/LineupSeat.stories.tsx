import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { LineupSeat } from './LineupSeat'

export default {
  title: 'Friends/LineupSeat',
  component: LineupSeat,
}

export const Default = (props: any) => {
  const mockStore = configureStore()({})

  return (
    <Provider store={mockStore}>
      <LineupSeat {...props} />
    </Provider>
  )
}
