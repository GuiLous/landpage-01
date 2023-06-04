import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { ToastList } from '@components'
import AppReducer from '@slices/AppSlice'

export default {
  title: 'Common/Toast/ToastList',
  component: ToastList,
}

const preloadedState = {
  toasts: [
    {
      id: 1,
      title: 'Feedback!',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      duration: 6,
      variant: 'success',
    },
    {
      id: 2,
      title: 'Outro Feedback!',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      duration: 6,
      variant: 'error',
    },
  ],
}

const store = configureStore({
  reducer: { app: AppReducer },
  devTools: true,
  preloadedState: { preloadedState },
})

export const Default = {
  render: (props) => (
    <Provider store={store}>
      <ToastList {...props} />
    </Provider>
  ),
}
