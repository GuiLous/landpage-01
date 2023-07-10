import { SidebarMenuItem } from '@components'

const itemsOptions = [
  'amigos',
  'notificações',
  'ranking',
  'loja',
  'suporte',
  'sair',
]

export default {
  title: 'Sidebar/SidebarMenuItem',
  component: SidebarMenuItem,
  argTypes: {
    receivedInvites: { control: { type: 'range', min: 0 } },
    unreadNotifications: { control: { type: 'range', min: 0 } },
    item: {
      options: itemsOptions,
      control: { type: 'select' },
    },
  },
  args: {
    receivedInvites: 0,
    unreadNotifications: 0,
    item: 'amigos',
  },
}

export const Default = {
  render: (props) => {
    return <SidebarMenuItem {...props} />
  },
}
