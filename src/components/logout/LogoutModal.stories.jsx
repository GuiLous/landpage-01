import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { LogoutModal } from '@components'

export default {
  title: 'Logout/LogoutModal',
  component: LogoutModal,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  args: {
    isOpen: false,
  },
}

const mockStore = configureStore()({})

export const Default = {
  render: (props) => (
    <Provider store={mockStore}>
      <LogoutModal {...props} />
    </Provider>
  ),
}
