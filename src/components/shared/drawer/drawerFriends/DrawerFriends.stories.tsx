import { useArgs } from '@storybook/preview-api'
import { Meta } from '@storybook/react'

import { DrawerFriends } from './DrawerFriends'

export default {
  title: 'Friends/DrawerFriends',
  component: DrawerFriends,
  argTypes: {
    open: { control: { type: 'boolean' } },
    totalNotifications: { control: 'number' },
  },
  args: {
    open: false,
    totalNotifications: 0,
  },
} as Meta

export const Default = (props: any) => {
  const [{ open }, updateArgs] = useArgs()
  const changeOpen = () => updateArgs({ open: !open })

  return <DrawerFriends open={false} setOpen={changeOpen} {...props} />
}
