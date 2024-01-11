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
  return <MenuItem setOpenModalSupport={() => console.log('')} {...props} />
}
