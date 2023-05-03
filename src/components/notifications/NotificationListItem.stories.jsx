import { Menu } from '@chakra-ui/react'
import { NotificationListItem } from '@components'

export default {
  title: 'Notifications/NotificationListItem',
  component: NotificationListItem,
  argTypes: {
    index: { control: 'number' },
    notification: { control: 'object' },
    isFetching: { control: 'boolean' },
  },
  args: {
    index: 0,
    notification: {
      id: 1,
      to_user_id: 2,
      content: 'Nova atualização do FiveM disponível.',
      avatar: 'https://github.com/GuiLous.png',
      create_date: '2023-04-08T18:23:12',
      from_user_id: null,
      read_date: null,
    },
    isFetching: false,
    setIsFetching: () => console.log('test'),
    notifications: [
      {
        id: 1,
        to_user_id: 2,
        content: 'Nova atualização do FiveM disponível.',
        avatar: 'https://github.com/GuiLous.png',
        create_date: '2023-04-08T18:23:12',
        from_user_id: null,
        read_date: null,
      },
    ],
    setNotifications: () => console.log('test'),
  },
}

export const Default = {
  render: (props) => (
    <Menu>
      <NotificationListItem {...props} />
    </Menu>
  ),
}
