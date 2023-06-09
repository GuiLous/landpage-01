import { SupportModal } from '@components'

export default {
  title: 'Support/SupportModal',
  component: SupportModal,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  args: {
    isOpen: false,
  },
}

export const Default = {
  render: (props) => <SupportModal {...props} />,
}
