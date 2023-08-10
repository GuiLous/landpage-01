import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { ProfileHeaderSocialButtons } from '@components'
import { ProfileDetailsProvider } from '@contexts'

export default {
  title: 'Profile/ProfileHeaderSocialButtons',
  component: ProfileHeaderSocialButtons,
  argTypes: {
    isUserLogged: { control: { type: 'boolean' } },
  },
  args: {
    isUserLogged: false,
  },
}

const socials = {
  steam: '112415987456519643',
  twitch: 'coreano',
}

const mockStore = configureStore()({})

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <ProfileDetailsProvider>
        <Provider store={mockStore}>
          <ProfileHeaderSocialButtons socials={socials} {...props} />
        </Provider>
      </ProfileDetailsProvider>
    </BrowserRouter>
  ),
}
