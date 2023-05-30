import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { InactivateAccountCard } from '@components'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Account/InactivateAccountCard',
  component: InactivateAccountCard,
}

const user = {
  id: 1,
}

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  preloadedState: { user },
})

export const Default = {
  render: (props) => (
    <Provider store={store}>
      <InactivateAccountCard {...props} />
    </Provider>
  ),
}
