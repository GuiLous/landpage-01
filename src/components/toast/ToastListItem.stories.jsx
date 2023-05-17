import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { ToastListItem } from '@components'
import ToastReducer from '@slices/ToastSlice'

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
    {
      id: 2,
      title: 'Outro Feedback!',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      duration: 6,
      variant: 'info',
    },
  ],
}

const store = configureStore({
  reducer: { toasts: ToastReducer },
  devTools: true,
  preloadedState: preloadedState,
})

export const Info = {
  render: (props) => {
    window.addEventListener('remount', () => {
      console.log('remounted')
    })

    return (
      <Provider store={store}>
        <ToastListItem {...props} variant="info" />
      </Provider>
    )
  },
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
