import { SidebarLobbyButton } from '@components'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Sidebar/SidebarLobbyButton',
  component: SidebarLobbyButton,
  argTypes: {
    isInQueue: { control: 'boolean' },
    isInMatch: { control: 'boolean' },
    isRestricted: { control: 'boolean' },
  },
  args: {
    isInQueue: false,
    isInMatch: false,
    isRestricted: false,
  },
}

export const Default = {
  render: (props) => {
    const lobby = {
      queue: props.isInQueue
        ? new Date().toISOString().replace('T', ' ').replace('Z', '')
        : null,
      queue_time: 300,
      restriction_countdown: props.isRestricted ? 300 : null,
    }

    const match_id = props.isInMatch && 1

    return (
      <BrowserRouter>
        <SidebarLobbyButton lobby={lobby} match_id={match_id} {...props} />
      </BrowserRouter>
    )
  },
}
