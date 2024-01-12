import { Meta } from '@storybook/react'

import { ModalMatchFoundPlayersIcon } from './ModalMatchFoundPlayersIcon'

export default {
  title: 'Logout/ModalMatchFoundPlayersIcon',
  component: ModalMatchFoundPlayersIcon,
} as Meta

export const Default = (props: any) => {
  return <ModalMatchFoundPlayersIcon {...props} />
}
