import { ModalConfirmation } from '@components'

export default {
  title: 'Account/ModalConfirmation',
  component: ModalConfirmation,
  argTypes: {
    title: { control: 'text' },
    isOpen: { control: 'boolean' },
  },
  args: {
    title: 'Teste',
    isOpen: true,
  },
}

export const Default = {
  render: (props) => <ModalConfirmation {...props} />,
}
