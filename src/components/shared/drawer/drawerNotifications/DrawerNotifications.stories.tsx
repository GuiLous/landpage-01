import { useArgs } from '@storybook/preview-api'
import { Meta } from '@storybook/react'

import { DrawerNotifications } from './DrawerNotifications'

export default {
  title: 'Notifications/DrawerNotifications',
  component: DrawerNotifications,
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

  return <DrawerNotifications open={false} setOpen={changeOpen} {...props} />
}
