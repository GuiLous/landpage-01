import { Meta } from '@storybook/react'

import { PreMatch } from '@/store/preMatchStore'

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

  return <ModalMatchFoundPlayersIcon {...props} />
}
