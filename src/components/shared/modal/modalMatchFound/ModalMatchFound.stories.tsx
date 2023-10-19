import { configureStore } from '@reduxjs/toolkit'
import { useArgs } from '@storybook/preview-api'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import preMatchSlice, { PreMatch } from '@/store/slices/preMatchSlice'

import { ModalMatchFound } from './ModalMatchFound'

export default {
  title: 'Logout/ModalMatchFound',
  component: ModalMatchFound,
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

  const preMatch: PreMatch | null = {
    id: 1,
    state: 'string',
    countdown: 30,
    players_ready_count: 3,
    players_total: 2,
    user_ready: false,
  }

  const store = configureStore({
    reducer: {
      preMatch: preMatchSlice,
    },
    preloadedState: { preMatch: { preMatch } },
  })

  return (
    <Provider store={store}>
      <ModalMatchFound open={false} setOpen={changeOpen} {...props} />
    </Provider>
  )
}
