import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { ChangeEmailCard } from '@components'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Account/ChangeEmailCard',
  component: ChangeEmailCard,
}

const user = {
  id: 1,
  email: 'email@example.com',
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
      <ChangeEmailCard {...props} />
    </Provider>
  ),
}
