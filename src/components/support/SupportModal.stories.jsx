import { SupportModal } from '@components'

export default {
  title: 'Support/SupportModal',
  component: SupportModal,
  argTypes: {
    isOpenModal: { control: 'boolean' },
  },
  args: {
    isOpenModal: false,
  },
}

export const Default = {
  render: (props) => <SupportModal {...props} />,
}
