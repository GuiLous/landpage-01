import { useArgs } from '@storybook/preview-api'

import { User } from '@/store/userStore'

import { MenuContext } from './MenuContext'

export default {
  title: 'MenuContext/MenuContext',
  component: MenuContext,
  argTypes: {
    open: { control: { type: 'boolean' } },
    alreadyInvited: { control: { type: 'boolean' } },
    alreadyOnTeam: { control: { type: 'boolean' } },
    isAvailable: { control: { type: 'boolean' } },
    steam_url: { control: { type: 'text' } },
    user_id: { control: { type: 'number' } },
    username: { control: { type: 'text' } },
  },
  args: {
    open: false,
    alreadyInvited: false,
    alreadyOnTeam: false,
    isAvailable: true,
    steam_url: '',
    user_id: 1,
    username: '',
  },
}

export const Default = (props: any) => {
  const [{ open }, updateArgs] = useArgs()
  const changeOpen = () => updateArgs({ open: !open })

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
      coins: 0,
    },
    invites_available_count: 0,
    invites: [],
  }

  return (
    <MenuContext open={open} onOpenChange={changeOpen}>
      <MenuContext.Trigger>
        <button>open</button>
      </MenuContext.Trigger>

      <MenuContext.Content {...props} />
    </MenuContext>
  )
}
