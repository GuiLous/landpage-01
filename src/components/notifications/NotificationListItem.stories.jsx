import { NotificationListItem } from '@components'

export default {
  title: 'Notifications/NotificationListItem',
  component: NotificationListItem,
  argTypes: {
    content: { control: 'text' },
    avatar: { control: 'text' },
    read_date: { control: 'date' },
    create_date: { control: 'date' },
  },
}

export const Unread = {
  args: {
    content: 'O seu amigo fulaninhodetal acabou de entrar para a ReloadClub!',
    avatar:
      'https://avatars.akamai.steamstatic.com/fba2f7ffa02a5501d1fdee81221d87b4504a6159_full.jpg',
    read_date: null,
    create_date: '2023-05-15T17:02:30.261Z',
  },
}

export const Read = {
  args: {
    content: 'O seu amigo fulaninhodetal acabou de entrar para a ReloadClub!',
    avatar:
      'https://avatars.akamai.steamstatic.com/fba2f7ffa02a5501d1fdee81221d87b4504a6159_full.jpg',
    read_date: '2023-05-15T17:02:30.261Z',
    create_date: '2023-05-15T17:02:30.261Z',
  },
}
