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

export const Default = {
  render: (props) => (
    <Provider store={mockStore}>
      <AddSocialModal socialsLinked={socialsLinked} {...props} />
    </Provider>
  ),
}
