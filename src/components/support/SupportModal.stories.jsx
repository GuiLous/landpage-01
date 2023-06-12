import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { SupportModal } from '@components'

export default {
  title: 'Support/SupportModal',
  component: SupportModal,
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
      <SupportModal {...props} />
    </Provider>
  ),
}
