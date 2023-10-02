import { Meta, StoryObj } from '@storybook/react'

import { SidebarLogo } from './SidebarLogo'

export default {
  title: 'Sidebar/SidebarLogo',
  component: SidebarLogo,
} as Meta

export const Default: StoryObj = {
  render: (props: any) => {
    return <SidebarLogo {...props} />
  },
}
