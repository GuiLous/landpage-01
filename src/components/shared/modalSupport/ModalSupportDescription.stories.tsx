import { Meta, StoryObj } from '@storybook/react'

import { ModalSupportDescription } from './ModalSupportDescription'

export default {
  title: 'Support/ModalSupportDescription',
  component: ModalSupportDescription,
  argTypes: {
    open: { control: { type: 'boolean' } },
  },
  args: {
    open: false,
  },
} as Meta

export const Default: StoryObj = {
  render: (props) => <ModalSupportDescription {...props} />,
}
