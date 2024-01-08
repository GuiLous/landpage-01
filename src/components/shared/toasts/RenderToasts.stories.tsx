import { App } from '@/store/appStore'
import { Invite } from '@/store/invitesStore'

import { RenderToasts } from './RenderToasts'

export default {
  title: 'Toast/RenderToasts',
  component: RenderToasts,
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
  render: (props: any) => <RenderToasts {...props} />,
}
