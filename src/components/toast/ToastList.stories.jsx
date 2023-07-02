import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { ToastList } from '@components'
import AppReducer from '@slices/AppSlice'
import InviteReducer from '@slices/InviteSlice'

export default {
  title: 'Common/Toast/ToastList',
  component: ToastList,
}

const app = {
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
  friendListOpen: false,
}

const invites = []

const store = configureStore({
  reducer: { app: AppReducer, invites: InviteReducer },
  devTools: true,
  preloadedState: { app, invites },
})

export const Default = {
  render: (props) => (
    <Provider store={store}>
      <ToastList {...props} />
    </Provider>
  ),
}
