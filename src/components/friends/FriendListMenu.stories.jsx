import { Container, FriendListMenu } from '@components'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

export default {
  title: 'Friends/FriendListMenu',
  component: FriendListMenu,
  argProps: {
    open: { control: { type: 'boolean' } },
    isAvailable: { control: { type: 'boolean' } },
    alreadyInvited: { control: { type: 'boolean' } },
    alreadyOnTeam: { control: { type: 'boolean' } },
    user_id: { control: { type: 'number' } },
    username: { control: { type: 'text' } },
  },
  args: {
    open: false,
    isAvailable: true,
    alreadyInvited: false,
    alreadyOnTeam: false,
    user_id: 1,
    username: 'player 1',
  },
}

const user = {
  id: 1,
  lobby_id: 1,
  account: {
    steam_url: 'https://steamcommunity.com/profiles/76561199086242260/',
  },
}

const mockStore = configureStore()({})

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <Provider store={mockStore}>
        <Container style={{ position: 'relative' }} fitContent>
          <FriendListMenu {...props} user={user} />
        </Container>
      </Provider>
    </BrowserRouter>
  ),
}
