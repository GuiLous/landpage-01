import { Meta, StoryObj } from '@storybook/react'

import { ModalSupportConfirmation } from './ModalSupportConfirmation'

export default {
  title: 'Support/ModalSupportConfirmation',
  component: ModalSupportConfirmation,
} as Meta

export const Default: StoryObj = {
  render: (props) => <ModalSupportConfirmation {...props} />,
}
