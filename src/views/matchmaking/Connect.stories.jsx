import { configureStore } from '@reduxjs/toolkit'

import MatchmakingReducer from '@slices/MatchmakingSlice'
import { ConnectView } from '@views'
import { Provider } from 'react-redux'

export default {
  title: 'Views/ConnectView',
  component: ConnectView,
}

const matchmaking = {
  preMatch: null,
  match: {
    server_ip: '999.999.999.999',
  },
}

const store = configureStore({
  reducer: {
    matchmaking: MatchmakingReducer,
  },
  preloadedState: { matchmaking },
})

export const Default = {
  render: (props) => (
    <Provider store={store}>
      <ConnectView {...props} />,
    </Provider>
  ),
}
