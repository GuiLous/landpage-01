import { configureStore } from '@reduxjs/toolkit'

import MatchReducer from '@slices/MatchSlice'
import { ConnectView } from '@views'
import { Provider } from 'react-redux'

export default {
  title: 'Views/ConnectView',
  component: ConnectView,
}

const match = {
  server_ip: '999.999.999.999',
}

const store = configureStore({
  reducer: {
    match: MatchReducer,
  },
  preloadedState: { match },
})

export const Default = {
  render: (props) => (
    <Provider store={store}>
      <ConnectView {...props} />,
    </Provider>
  ),
}
