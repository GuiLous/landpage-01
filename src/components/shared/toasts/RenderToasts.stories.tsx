import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import appSlice, { AppState } from '@/store/slices/appSlice'
import inviteSlice, { Invite } from '@/store/slices/inviteSlice'

import { RenderToasts } from './RenderToasts'

export default {
  title: 'Toast/RenderToasts',
  component: RenderToasts,
}

const app: AppState = {
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
      <RenderToasts {...props} />
    </Provider>
  ),
}
