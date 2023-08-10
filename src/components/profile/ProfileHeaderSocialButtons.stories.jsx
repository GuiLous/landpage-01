import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { ProfileHeaderSocialButtons } from '@components'

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
  discord: 'coreano',
  youtube: null,
}

const mockStore = configureStore()({})

export const Default = {
  render: (props) => (
    <Provider store={mockStore}>
      <ProfileHeaderSocialButtons socials={socials} {...props} />
    </Provider>
  ),
}
