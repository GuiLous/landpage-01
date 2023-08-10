import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { AddSocialModal } from '@components'
import { ProfileDetailsProvider } from '@contexts'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Profile/AddSocialModal',
  component: AddSocialModal,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  args: {
    isOpen: false,
  },
}

const socialsLinked = ['twitch']

let socials = {
  steam: '112415987456519643',
  twitch: 'coreano',
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
      <ProfileDetailsProvider>
        <Provider store={store}>
          <AddSocialModal
            socialsLinked={socialsLinked}
            socials={socials}
            {...props}
          />
        </Provider>
      </ProfileDetailsProvider>
    </BrowserRouter>
  ),
}
