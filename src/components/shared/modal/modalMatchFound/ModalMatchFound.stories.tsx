import { useArgs } from '@storybook/preview-api'
import { Meta } from '@storybook/react'

import { PreMatch } from '@/store/preMatchStore'

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
    status: 'warmup',
    countdown: 30,
    players_ready_count: 3,
    players_total: 2,
    user_ready: false,
    ready: false,
  }

  return <ModalMatchFound open={false} setOpen={changeOpen} {...props} />
}
