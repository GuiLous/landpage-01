import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { InactivateAccountCard } from '@components'

export default {
  title: 'Account/InactivateAccountCard',
  component: InactivateAccountCard,
}

const mockStore = configureStore()({})

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <Provider store={mockStore}>
        <InactivateAccountCard {...props} />
      </Provider>
    </BrowserRouter>
  ),
}
