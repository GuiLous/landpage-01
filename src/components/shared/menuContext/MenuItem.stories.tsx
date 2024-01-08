import { User } from '@/store/userStore'

import { MenuItem } from './MenuItem'

const items = ['invite', 'profile', 'steam', 'report']

export default {
  title: 'MenuContext/MenuItem',
  component: MenuItem,
  argTypes: {
    alreadyInvited: { control: { type: 'boolean' } },
    alreadyOnTeam: { control: { type: 'boolean' } },
    isAvailable: { control: { type: 'boolean' } },
    steam_url: { control: { type: 'text' } },
    user_id: { control: { type: 'number' } },
    keyMenu: {
      options: items,
      type: 'select',
    },
  },
  args: {
    alreadyInvited: false,
    alreadyOnTeam: false,
    isAvailable: true,
    steam_url: '',
    user_id: 1,
    keyMenu: 'invite',
  },
}

export const Default = (props: any) => {
  const user: User = {
    id: 1,
    status: 'online',
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
        large: '',
      },
    },
    invites_available_count: 0,
    invites: [],
  }

  return <MenuItem setOpenModalSupport={() => console.log('')} {...props} />
}
