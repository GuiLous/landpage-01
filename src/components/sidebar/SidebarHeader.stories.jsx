import { BrowserRouter } from 'react-router-dom'

import { SidebarHeader } from '@components'

export default {
  title: 'Sidebar/SidebarHeader',
  component: SidebarHeader,
  argTypes: {
    username: { control: 'text' },
    userId: { control: 'number' },
  },
  args: {
    username: 'Username',
    avatar:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    userId: 1,
  },
}

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <SidebarHeader {...props} />,
    </BrowserRouter>
  ),
}
