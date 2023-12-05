import { useArgs } from '@storybook/preview-api'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import { store } from '@/store'

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

export const Default = (props: any) => {
  const [{ open }, updateArgs] = useArgs()
  const changeOpen = () => updateArgs({ open: !open })

  return (
    <Provider store={store}>
      <ModalLogout open={false} setOpen={changeOpen} {...props} />
    </Provider>
  )
}
