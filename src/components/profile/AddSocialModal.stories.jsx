import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { AddSocialModal } from '@components'

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

const mockStore = configureStore()({})

const socialsLinked = ['twitch']

let socials = {
  steam: '112415987456519643',
  twitch: 'coreano',
  discord: null,
  youtube: null,
}

export const Default = {
  render: (props) => (
    <Provider store={mockStore}>
      <AddSocialModal
        socialsLinked={socialsLinked}
        socials={socials}
        {...props}
      />
    </Provider>
  ),
}
