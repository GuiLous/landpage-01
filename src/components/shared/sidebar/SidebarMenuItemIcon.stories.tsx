import { Meta, StoryObj } from '@storybook/react'
import { AiFillBell } from 'react-icons/ai'

import { SidebarMenuItemIcon } from './SidebarMenuItemIcon'

export default {
  title: 'Sidebar/SidebarMenuItemIcon',
  component: SidebarMenuItemIcon,
} as Meta

export const Default: StoryObj = {
  render: (props: any) => {
    return <SidebarMenuItemIcon icon={AiFillBell} {...props} />
  },
}
