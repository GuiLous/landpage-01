import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { DeleteAccountCard } from '@components'

export default {
  title: 'Account/DeleteAccountCard',
  component: DeleteAccountCard,
}

const mockStore = configureStore()({})

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <Provider store={mockStore}>
        <DeleteAccountCard {...props} />
      </Provider>
    </BrowserRouter>
  ),
}
