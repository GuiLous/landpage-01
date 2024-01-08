import { useArgs } from '@storybook/preview-api'
import { Meta, StoryObj } from '@storybook/react'

import { ModalSupportForm } from './ModalSupportForm'

export default {
  title: 'Support/ModalSupportForm',
  component: ModalSupportForm,
  argTypes: {
    open: { control: { type: 'boolean' } },
    user_id: { control: { type: 'number' } },
    username: { control: { type: 'text' } },
  },
  args: {
    open: true,
    user_id: null,
    username: null,
  },
} as Meta

type Story = StoryObj<typeof ModalSupportForm>

export const Default = (props: Story) => {
  const [{ open }, updateArgs] = useArgs()
  const setFormSent = () => updateArgs({ open: !open })

  return <ModalSupportForm open={true} setFormSent={setFormSent} {...props} />
}
