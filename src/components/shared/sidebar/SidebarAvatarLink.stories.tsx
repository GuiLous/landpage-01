import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import userSlice, { User } from '@/store/slices/userSlice'

import { SidebarAvatarLink } from './SidebarAvatarLink'

const status = ['online', 'offline', 'queued', 'in_game', 'teaming']

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
    const user: User = {
      id: 1,
      status: props.status,
      email: 'user@gmail.com',
      is_active: true,
      is_online: true,
      lobby_id: 1,
      match_id: null,
      pre_match_id: null,
      account: {
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: ' ',
        },
        username: 'User1',
        level: 2,
      },
    }

    const store = configureStore({
      reducer: {
        user: userSlice,
      },
      preloadedState: {
        user: { user },
      },
    })

    return (
      <Provider store={store}>
        <SidebarAvatarLink {...props} />
      </Provider>
    )
  },
}
