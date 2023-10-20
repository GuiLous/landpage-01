import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import appSlice, { AppState } from '@/store/slices/appSlice'
import inviteSlice, { Invite } from '@/store/slices/inviteSlice'

import { Toast } from './Toast'

export default {
  title: 'Toast/Toast',
  component: Toast,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    duration: { control: 'number' },
    avatar: { control: 'text' },
    invite_id: { control: 'number' },
    variant: {
      control: 'select',
      options: [
        'info',
        'success',
        'warning',
        'error',
        'invite',
        'notification',
      ],
    },
  },
  args: {
    id: 1,
    title: null,
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    duration: 6,
    avatar:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    invite_id: null,
    variant: 'info',
  },
}

const app: AppState = {
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
  maintenance: false,
}

const invites: Invite[] = []

const store = configureStore({
  reducer: { app: appSlice, invites: inviteSlice },
  devTools: true,
  preloadedState: { app, invites: { invites } },
})

export const Default = {
  render: (props: any) => (
    <Provider store={store}>
      <Toast {...props} />
    </Provider>
  ),
}

export const SuccessToast = {
  render: (props: any) => (
    <Provider store={store}>
      <Toast {...props} variant="success" />
    </Provider>
  ),
}

export const WarningToast = {
  render: (props: any) => (
    <Provider store={store}>
      <Toast {...props} variant="warning" />
    </Provider>
  ),
}

export const ErrorToast = {
  render: (props: any) => (
    <Provider store={store}>
      <Toast {...props} variant="error" />
    </Provider>
  ),
}

export const InviteToast = {
  render: (props: any) => (
    <Provider store={store}>
      <Toast {...props} variant="invite" />
    </Provider>
  ),
}
