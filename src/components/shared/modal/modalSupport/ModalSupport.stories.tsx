import { useArgs } from '@storybook/preview-api'
import { Meta, StoryObj } from '@storybook/react'

import { ModalSupport } from './ModalSupport'

export default {
  title: 'Support/ModalSupport',
  component: ModalSupport,
  argTypes: {
    open: { control: { type: 'boolean' } },
  },
  args: {
    open: false,
  },
} as Meta

type Story = StoryObj<typeof ModalSupport>

export const Default = (props: Story) => {
  const [{ open }, updateArgs] = useArgs()
  const changeOpen = () => updateArgs({ open: !open })

  return <ModalSupport open={false} setOpen={changeOpen} {...props} />
}
