import { BrowserRouter } from 'react-router-dom'

import { SidebarAvatarLink } from '@components'

export default {
  title: 'Sidebar/SidebarAvatarLink',
  component: SidebarAvatarLink,
  argTypes: {
    userLevel: { control: { type: 'range', min: 0, max: 50 } },
  },
  args: {
    userLevel: 0,
  },
}

export const Default = {
  render: (props) => {
    const user = {
      id: 1,
      account: {
        level: props.userLevel,
        level_points: 56,
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
        },
        username: 'Username',
        lobby: {
          queue: null,
          id: 1,
        },
      },
      status: 'online',
    }

    return (
      <BrowserRouter>
        <SidebarAvatarLink user={user} {...props} />
      </BrowserRouter>
    )
  },
}
