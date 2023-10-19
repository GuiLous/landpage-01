import { useArgs } from '@storybook/preview-api'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { ModalLogout } from './ModalLogout'

export default {
  title: 'Logout/ModalLogout',
  component: ModalLogout,
  argTypes: {
    open: { control: { type: 'boolean' } },
  },
  args: {
    open: false,
  },
} as Meta

const mockStore = configureStore()({})

export const Default = (props: any) => {
  const [{ open }, updateArgs] = useArgs()
  const changeOpen = () => updateArgs({ open: !open })

  return (
    <Provider store={mockStore}>
      <ModalLogout open={false} setOpen={changeOpen} {...props} />
    </Provider>
  )
}
