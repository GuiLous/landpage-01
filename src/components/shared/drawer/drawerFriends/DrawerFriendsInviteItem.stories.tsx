import { DrawerFriendsInviteItem } from './DrawerFriendsInviteItem'

const status = ['online', 'offline', 'queued', 'in_game', 'teaming', 'away']

export default {
  title: 'Friends/DrawerFriendsInviteItem',
  component: DrawerFriendsInviteItem,
  argTypes: {
    status: {
      control: 'select',
      options: status,
    },
    username: { control: 'text' },
  },
  args: {
    avatar:
      'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
    status: 'online',
    username: 'Username',
    invite_id: '1:2',
  },
}

export const Default = (props: any) => {
  return <DrawerFriendsInviteItem {...props} />
}
