import { ModalConfirmation } from '@components'

export default {
  title: 'Modal/ModalConfirmation',
  component: ModalConfirmation,
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
  render: (props) => <ModalConfirmation {...props} />,
}
