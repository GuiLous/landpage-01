import { LobbyPlayButton } from '@components'

export default {
  title: 'Lobby/LobbyPlayButton',
  component: LobbyPlayButton,
  argTypes: {
    title: { control: 'text' },
    queued: { control: 'boolean' },
    disabled: { control: 'boolean' },
    restricted: { control: 'boolean' },
  },
  args: {
    disabled: false,
    restricted: false,
    queued: false,
  },
}

export const Default = {
  render: (props) => (
    <LobbyPlayButton
      {...props}
      queueTime={props.queued && 1}
      countdown={props.restricted && 3600}
    />
  ),
}
