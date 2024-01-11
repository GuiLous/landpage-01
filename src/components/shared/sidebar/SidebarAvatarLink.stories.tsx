import { SidebarAvatarLink } from './SidebarAvatarLink'

const status = ['online', 'offline', 'queued', 'in_game', 'teaming', 'away']

export default {
  title: 'Sidebar/SidebarAvatarLink',
  component: SidebarAvatarLink,
  argTypes: {
    status: {
      options: status,
      type: 'select',
    },
  },
  args: {
    status: 'online',
  },
}

export const Default = {
  render: (props: any) => {
    return <SidebarAvatarLink {...props} />
  },
}
