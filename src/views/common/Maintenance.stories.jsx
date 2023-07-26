import { configureStore } from '@reduxjs/toolkit'
import { MaintenanceView } from '@views'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import AppReducer from '@slices/AppSlice'

export default {
  title: 'Common/MaintenanceView',
  component: MaintenanceView,
}

const app = {
  maintenance: false,
}

const store = configureStore({
  reducer: {
    app: AppReducer,
  },
  preloadedState: { app },
})

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <Provider store={store}>
        <MaintenanceView {...props} />
      </Provider>
    </BrowserRouter>
  ),
}
