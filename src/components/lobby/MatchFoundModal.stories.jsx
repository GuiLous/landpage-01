import { MatchFoundModal } from '@components'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const preMatch = {
  id: 'string',
  state: 'string',
  countdown: 30,
  players_ready_count: 3,
  players_total: 2,
  user_ready: false,
}

export default {
  title: 'Lobby/MatchFoundModal',
  component: MatchFoundModal,
  argTypes: {
    isOpen: { control: 'boolean' },
    preMatch: { control: 'object' },
  },
  args: {
    isOpen: true,
    preMatch: preMatch,
  },
}

const mockStore = configureStore()({})

export const Default = {
  render: (props) => (
    <Provider store={mockStore}>
      <MatchFoundModal {...props} />
    </Provider>
  ),
}
