import { App } from '@/store/appStore'
import { Invite } from '@/store/invitesStore'

import { ToastList } from './ToastList'

export default {
  title: 'Toast/ToastList',
  component: ToastList,
}

const app: App = {
  toasts: [
    {
      id: '1',
      title: 'Feedback!',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      duration: 6,
      variant: 'success',
    },
    {
      id: '2',
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

export const Default = {
  render: (props: any) => <ToastList {...props} />,
}
