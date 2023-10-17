import { Meta, StoryObj } from '@storybook/react'

import { DrawerFriendsFilter } from './DrawerFriendsFilter'

export default {
  title: 'Friends/DrawerFriendsFilter',
  component: DrawerFriendsFilter,
} as Meta

export const Default: StoryObj = {
  render: (props: any) => {
    return <DrawerFriendsFilter setFilter={() => console.log('')} {...props} />
  },
}
