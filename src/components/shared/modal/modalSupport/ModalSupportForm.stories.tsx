import { useArgs } from '@storybook/client-api'
import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { ModalSupportForm } from './ModalSupportForm'

export default {
  title: 'Support/ModalSupportForm',
  component: ModalSupportForm,
  argTypes: {
    open: { control: { type: 'boolean' } },
    user_id: { control: { type: 'number' } },
    username: { control: { type: 'text' } },
  },
  args: {
    open: true,
    user_id: null,
    username: null,
  },
} as Meta

type Story = StoryObj<typeof ModalSupportForm>

const mockStore = configureStore()({})

export const Default = (props: Story) => {
  const [{ open }, updateArgs] = useArgs()
  const setFormSent = () => updateArgs({ open: !open })

  return (
    <Provider store={mockStore}>
      <ModalSupportForm open={true} setFormSent={setFormSent} {...props} />
    </Provider>
  )
}
