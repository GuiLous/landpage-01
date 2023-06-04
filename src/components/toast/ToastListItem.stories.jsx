import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { ToastListItem } from '@components'
import AppReducer from '@slices/AppSlice'

export default {
  title: 'Common/Toast/ToastListItem',
  component: ToastListItem,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    duration: { control: 'number' },
  },
  args: {
    id: 1,
    title: 'Feedback!',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    duration: 6,
  },
}

const preloadedState = {
  toasts: [
    {
      id: 1,
      title: 'Feedback!',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      duration: 6,
      variant: 'info',
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
      <ToastListItem {...props} />
    </Provider>
  ),
}

export const Success = {
  render: (props) => (
    <Provider store={store}>
      <ToastListItem {...props} variant="success" />
    </Provider>
  ),
}

export const Warning = {
  render: (props) => (
    <Provider store={store}>
      <ToastListItem {...props} variant="warning" />
    </Provider>
  ),
}

export const Error = {
  render: (props) => (
    <Provider store={store}>
      <ToastListItem {...props} variant="error" />
    </Provider>
  ),
}
