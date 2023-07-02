import { MaintenanceView } from '@views'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

export default {
  title: 'Common/MaintenanceView',
  component: MaintenanceView,
}

const mockStore = configureStore()({})

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <Provider store={mockStore}>
        <MaintenanceView {...props} />
      </Provider>
    </BrowserRouter>
  ),
}
