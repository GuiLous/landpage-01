import { useArgs } from '@storybook/preview-api'
import { Meta } from '@storybook/react'

import { ModalMatchFound } from './ModalMatchFound'

export default {
  title: 'Logout/ModalMatchFound',
  component: ModalMatchFound,
  argTypes: {
    open: { control: { type: 'boolean' } },
  },
  args: {
    open: false,
  },
} as Meta

export const Default = (props: any) => {
  const [{ open }, updateArgs] = useArgs()
  const changeOpen = () => updateArgs({ open: !open })

  return <ModalMatchFound open={false} setOpen={changeOpen} {...props} />
}
