import { Meta, StoryObj } from '@storybook/react'

import { Modal } from './Modal'

export default {
  title: 'Modal/Modal',
  component: Modal,
} as Meta

export const Default: StoryObj = {
  render: () => (
    <Modal>
      <Modal.Button asChild>
        <button className="rounded-[4px] bg-purple-400 px-2 py-1">Abrir</button>
      </Modal.Button>
      <Modal.Content title="Modal">
        <div className="mt-4 text-white">modal</div>
      </Modal.Content>
    </Modal>
  ),
}
