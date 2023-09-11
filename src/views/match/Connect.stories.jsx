import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import MatchReducer from '@slices/MatchSlice'
import { ConnectView } from '@views'

export default {
  title: 'Views/ConnectView',
  component: ConnectView,
}

let match = {
  id: 1,
  status: 'warmup',
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
    <BrowserRouter>
      <Provider store={store}>
        <ConnectView {...props} />
      </Provider>
    </BrowserRouter>
  ),
}
