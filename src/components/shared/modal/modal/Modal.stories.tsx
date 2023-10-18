import { Meta, StoryObj } from '@storybook/react'

import { Modal } from './Modal'

export default {
  title: 'Modal/Modal',
  component: Modal,
  argTypes: {
    showCloseButton: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {
    showCloseButton: true,
    title: 'Modal',
  },
} as Meta

export const Default: StoryObj = {
  render: (props: any) => (
    <Modal>
      <Modal.Button asChild>
        <button className="rounded bg-purple-400 px-2 py-1">Abrir</button>
      </Modal.Button>
      <Modal.Content {...props}>
        <div className="mt-4 text-white">modal</div>
      </Modal.Content>
    </Modal>
  ),
}
