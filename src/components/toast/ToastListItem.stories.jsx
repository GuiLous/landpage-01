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
    avatar: { control: 'text' },
  },
  args: {
    id: 1,
    title: null,
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    duration: 6,
    avatar:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
  },
}

const app = {
  toasts: [
    {
      id: 1,
      title: 'Feedback!',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      duration: 6,
      variant: 'info',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    },
  ],
  friendListOpen: false,
}

const store = configureStore({
  reducer: { app: AppReducer },
  devTools: true,
  preloadedState: { app },
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

export const Invite = {
  render: (props) => (
    <Provider store={store}>
      <ToastListItem {...props} variant="invite" />
    </Provider>
  ),
}
