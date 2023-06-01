import { Modal } from '@components'

export default {
  title: 'Modal/Modal',
  component: Modal,
  argTypes: {
    title: { control: 'text' },
    isOpen: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
  },
  args: {
    title: 'Teste',
    isOpen: true,
    showCloseButton: true,
  },
}

export const Default = {
  render: (props) => <Modal {...props} />,
}
