import { configureStore } from '@reduxjs/toolkit'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import preMatchSlice, { PreMatch } from '@/store/slices/preMatchSlice'

import { ModalMatchFoundPlayersIcon } from './ModalMatchFoundPlayersIcon'

export default {
  title: 'Logout/ModalMatchFoundPlayersIcon',
  component: ModalMatchFoundPlayersIcon,
} as Meta

export const Default = (props: any) => {
  const preMatch: PreMatch | null = {
    id: 1,
    status: 'warmup',
    countdown: 30,
    players_ready_count: 3,
    players_total: 2,
    user_ready: false,
    ready: false,
  }

  const store = configureStore({
    reducer: {
      preMatch: preMatchSlice,
    },
    preloadedState: { preMatch: { preMatch } },
  })

  return (
    <Provider store={store}>
      <ModalMatchFoundPlayersIcon {...props} />
    </Provider>
  )
}
