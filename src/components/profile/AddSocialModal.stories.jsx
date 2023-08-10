import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { AddSocialModal } from '@components'
import { ProfileDetailsProvider } from '@contexts'

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
  discord: null,
  youtube: null,
}

const mockStore = configureStore()({})

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <ProfileDetailsProvider>
        <Provider store={mockStore}>
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
