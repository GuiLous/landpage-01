import { menuItems } from './MenuContext'
import { keysMenuType } from './MenuItem'
import { MenuItemIcon } from './MenuItemIcon'

const items = ['invite', 'profile', 'steam', 'report']

export default {
  title: 'MenuContext/MenuItemIcon',
  component: MenuItemIcon,
  argTypes: {
    item: {
      options: items,
      type: 'select',
    },
  },
  args: {
    item: 'invite',
  },
}

export const Default = ({ item }: { item: keysMenuType }) => {
  return <MenuItemIcon icon={menuItems[item].icon} />
}
