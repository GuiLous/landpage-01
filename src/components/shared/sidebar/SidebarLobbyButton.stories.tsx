import { SidebarLobbyButton } from './SidebarLobbyButton'

export default {
  title: 'Sidebar/SidebarLobbyButton',
  component: SidebarLobbyButton,
  argTypes: {
    isInQueue: { control: 'boolean' },
    isInMatch: { control: 'boolean' },
    isRestricted: { control: 'boolean' },
  },
  args: {
    isInQueue: false,
    isInMatch: false,
    isRestricted: false,
  },
}

export const Default = {
  render: (props: any) => {
    return <SidebarLobbyButton {...props} />
  },
}
