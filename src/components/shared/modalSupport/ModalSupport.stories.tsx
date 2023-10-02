import { useArgs } from '@storybook/client-api'
import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { ModalSupport } from './ModalSupport'

export default {
  title: 'Support/ModalSupport',
  component: ModalSupport,
  argTypes: {
    open: { control: { type: 'boolean' } },
  },
  args: {
    open: false,
  },
} as Meta

type Story = StoryObj<typeof ModalSupport>

const mockStore = configureStore()({})

export const Default = (props: Story) => {
  const [{ open }, updateArgs] = useArgs()
  const changeOpen = () => updateArgs({ open: !open })

  return (
    <Provider store={mockStore}>
      <ModalSupport open={false} setOpen={changeOpen} {...props} />
    </Provider>
  )
}
