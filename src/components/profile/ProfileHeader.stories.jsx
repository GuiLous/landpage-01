import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { ProfileHeader } from '@components'
import { ProfileDetailsProvider } from '@contexts'

export default {
  title: 'Profile/ProfileHeader',
  component: ProfileHeader,
  argTypes: {
    profile: { table: { disable: true } },
    isUserLogged: { control: 'boolean' },
  },
  args: {
    isUserLogged: false,
    profile: {
      username: 'Username',
      level: 0,
      level_points: 0,
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
      },
      user_id: 1,
      status: 'online',
      social_handles: {
        steam: '112415987456519643',
        twitch: 'coreano',
      },
    },
  },
}

const mockStore = configureStore()({})

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <ProfileDetailsProvider>
        <Provider store={mockStore}>
          <ProfileHeader {...props} />
        </Provider>
      </ProfileDetailsProvider>
    </BrowserRouter>
  ),
}
