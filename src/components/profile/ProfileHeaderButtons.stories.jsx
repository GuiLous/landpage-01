import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ProfileHeaderButtons } from '@components'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Profile/ProfileHeaderButtons',
  component: ProfileHeaderButtons,
  argTypes: {
    username: { control: 'text' },
    isUserLogged: { control: 'boolean' },
  },
  args: {
    isUserLogged: false,
    username: 'User1',
  },
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
    <BrowserRouter>
      <Provider store={store}>
        <ProfileHeaderButtons {...props} />
      </Provider>
    </BrowserRouter>
  ),
}
