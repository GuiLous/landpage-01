import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { LobbiesAPI } from '@api'
import { LobbyLineup } from '@components'

jest.mock('@api', () => ({
  LobbiesAPI: {
    startQueue: jest.fn(),
    cancelQueue: jest.fn(),
    removePlayer: jest.fn(),
  },
}))

let props = {
  otherPlayers: [
    {
      username: 'Username 2',
      user_id: 2,
      avatar: {
        large:
          'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
      },
      latest_matches_results: ['V', 'D', 'N/A', 'N/A', 'N/A'],
      matches_played: 2,
      level: 1,
      steam_url: 'https://steamcommunity.com/profiles/76561198075990604',
    },
  ],
  userPlayer: {
    username: 'Username',
    user_id: 1,
    avatar: {
      large:
        'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
    },
    latest_matches_results: ['V', 'D', 'N/A', 'N/A', 'N/A'],
    matches_played: 2,
    level: 1,
    steam_url: 'https://steamcommunity.com/profiles/76561198075990604',
  },
  lobby: {
    id: 1,
    owner_id: 1,
    queue: null,
    queue_time: null,
    restriction_countdown: null,
  },
  match_id: null,
  preMatch: null,
}

const renderComponent = () => {
  const mockStore = configureStore()({})

  render(
    <BrowserRouter>
      <Provider store={mockStore}>
        <LobbyLineup {...props} />
      </Provider>
    </BrowserRouter>
  )
}

describe('LobbyLineup Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Username 2')).toBeInTheDocument()
  })

  it('should call startQueue on click button', async () => {
    LobbiesAPI.startQueue.mockResolvedValue({})

    renderComponent()

    const playBtn = screen.getByTestId('container')

    fireEvent.click(playBtn)

    await waitFor(() => expect(LobbiesAPI.startQueue).toHaveBeenCalledTimes(1))
  })

  it('should call cancelQueue on click button', async () => {
    LobbiesAPI.cancelQueue.mockResolvedValue({})

    props.lobby.queue_time = 1

    renderComponent()

    const playBtn = screen.getByTestId('container')

    fireEvent.click(playBtn)

    await waitFor(() => expect(LobbiesAPI.cancelQueue).toHaveBeenCalledTimes(1))
  })

  it('should not call startQueue if has restriction_countdown', async () => {
    LobbiesAPI.startQueue.mockResolvedValue({})

    props.lobby.queue_time = null
    props.lobby.restriction_countdown = 1

    renderComponent()

    const playBtn = screen.getByTestId('container')

    fireEvent.click(playBtn)

    await waitFor(() => expect(LobbiesAPI.startQueue).toHaveBeenCalledTimes(0))
  })

  it('should not call startQueue if has preMatch', async () => {
    LobbiesAPI.startQueue.mockResolvedValue({})

    props.lobby.queue_time = null
    props.lobby.restriction_countdown = null
    props.preMatch = true

    renderComponent()

    const playBtn = screen.getByTestId('container')

    fireEvent.click(playBtn)

    await waitFor(() => expect(LobbiesAPI.startQueue).toHaveBeenCalledTimes(0))
  })

  it('should not call startQueue if is in match', async () => {
    LobbiesAPI.startQueue.mockResolvedValue({})

    props.lobby.queue_time = null
    props.lobby.restriction_countdown = null
    props.preMatch = null
    props.match_id = 1

    renderComponent()

    const playBtn = screen.getByTestId('container')

    fireEvent.click(playBtn)

    await waitFor(() => expect(LobbiesAPI.startQueue).toHaveBeenCalledTimes(0))
  })

  it('should not call cancelQueue if has restriction_countdown', async () => {
    LobbiesAPI.cancelQueue.mockResolvedValue({})

    props.lobby.queue_time = null
    props.lobby.restriction_countdown = 1

    renderComponent()

    const playBtn = screen.getByTestId('container')

    fireEvent.click(playBtn)

    await waitFor(() => expect(LobbiesAPI.cancelQueue).toHaveBeenCalledTimes(0))
  })

  it('should not call cancelQueue if has preMatch', async () => {
    LobbiesAPI.cancelQueue.mockResolvedValue({})

    props.lobby.queue_time = null
    props.lobby.restriction_countdown = null
    props.preMatch = true

    renderComponent()

    const playBtn = screen.getByTestId('container')

    fireEvent.click(playBtn)

    await waitFor(() => expect(LobbiesAPI.cancelQueue).toHaveBeenCalledTimes(0))
  })

  it('should not call cancelQueue if is in match', async () => {
    LobbiesAPI.cancelQueue.mockResolvedValue({})

    props.lobby.queue_time = null
    props.lobby.restriction_countdown = null
    props.preMatch = null
    props.match_id = 1

    renderComponent()

    const playBtn = screen.getByTestId('container')

    fireEvent.click(playBtn)

    await waitFor(() => expect(LobbiesAPI.cancelQueue).toHaveBeenCalledTimes(0))
  })

  it('should call removePlayer on click close button', async () => {
    LobbiesAPI.removePlayer.mockResolvedValue({})

    renderComponent()

    const closeBtn = screen.getAllByTestId('close')

    fireEvent.click(closeBtn[0])

    await waitFor(() =>
      expect(LobbiesAPI.removePlayer).toHaveBeenCalledTimes(1)
    )
  })

  it('should not call removePlayer if has lobby.queue', async () => {
    LobbiesAPI.removePlayer.mockResolvedValue({})

    props.lobby.queue_time = null
    props.lobby.restriction_countdown = null
    props.preMatch = null
    props.match_id = null
    props.lobby.queue = true

    renderComponent()

    expect(screen.queryByTestId('close')).not.toBeInTheDocument()

    await waitFor(() =>
      expect(LobbiesAPI.removePlayer).toHaveBeenCalledTimes(0)
    )
  })
})
