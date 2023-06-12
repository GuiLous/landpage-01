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
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8000/api/support/tickets/subjects/',
        method: 'GET',
        status: 200,
        response: ['option 1', 'option 2', 'option 3', 'option 4'],
      },
    ],
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
