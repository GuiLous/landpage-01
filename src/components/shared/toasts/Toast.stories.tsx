import { App } from '@/store/appStore'
import { Invite } from '@/store/invitesStore'

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

const app: App = {
  toasts: [
    {
      id: '1',
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

export const Default = {
  render: (props: any) => <Toast {...props} />,
}

export const SuccessToast = {
  render: (props: any) => <Toast {...props} variant="success" />,
}

export const WarningToast = {
  render: (props: any) => <Toast {...props} variant="warning" />,
}

export const ErrorToast = {
  render: (props: any) => <Toast {...props} variant="error" />,
}

export const InviteToast = {
  render: (props: any) => <Toast {...props} variant="invite" />,
}
