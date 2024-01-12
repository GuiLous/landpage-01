import { DrawerFriendsListGroupItem } from './DrawerFriendsListGroupItem'

const status = ['online', 'offline', 'queued', 'in_game', 'teaming', 'away']

export default {
  title: 'Friends/DrawerFriendsListGroupItem',
  component: DrawerFriendsListGroupItem,
  argTypes: {
    avatar: { control: 'text' },
    lobby_id: { control: 'number' },
    status: {
      options: status,
      type: 'select',
    },
    steam_url: { control: 'text' },
    user_id: { control: 'number' },
    username: { control: 'text' },
    title: {
      options: ['Online', 'Offline', 'No seu grupo'],
      type: 'select',
    },
  },
  args: {
    avatar:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    lobby_id: 1,
    status: 'online',
    steam_url: '',
    user_id: 1,
    username: 'User 1',
    title: 'Online',
  },
}

export const Default = (props: any) => {
  return <DrawerFriendsListGroupItem {...props} />
}
