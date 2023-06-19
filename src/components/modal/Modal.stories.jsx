import { Modal } from '@components'

export default {
  title: 'Modal/Modal',
  component: Modal,
  argTypes: {
    title: { control: 'text' },
    isOpen: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    headerMarginBottom: { control: 'number' },
  },
  args: {
    title: 'Teste',
    isOpen: true,
    showCloseButton: true,
    headerMarginBottom: 40,
  },
}

export const Default = {
  render: (props) => <Modal {...props} />,
}
