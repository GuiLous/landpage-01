import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { LobbiesAPI } from '@api'
import { InviteListGroupItem } from '@components'
import AppReducer from '@slices/AppSlice'

jest.mock('@api', () => ({
  LobbiesAPI: {
    acceptInvite: jest.fn(),
    refuseInvite: jest.fn(),
  },
}))

const renderComponent = () => {
  const app = {
    toasts: [],
    friendListOpen: false,
  }

  const store = configureStore({
    reducer: {
      app: AppReducer,
    },
    preloadedState: { app },
  })

  const invite = {
    invite_id: '3:1',
    avatar:
      'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
    status: 'online',
    username: 'Username',
  }

  render(
    <Provider store={store}>
      <InviteListGroupItem {...invite} />
    </Provider>
  )
}

describe('InviteListGroupItem Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Convidou você')).toBeInTheDocument()
  })

  it('should accept invite on click button', async () => {
    LobbiesAPI.acceptInvite.mockResolvedValue({})

    renderComponent()

    const acceptInviteBtn = screen.getByTestId('acceptInvite')

    fireEvent.click(acceptInviteBtn)

    await waitFor(() =>
      expect(LobbiesAPI.acceptInvite).toHaveBeenCalledTimes(1)
    )
  })

  it('should refuse invite on click button', async () => {
    LobbiesAPI.refuseInvite.mockResolvedValue({})

    renderComponent()

    const refuseInviteBtn = screen.getByTestId('refuseInvite')

    fireEvent.click(refuseInviteBtn)

    await waitFor(() =>
      expect(LobbiesAPI.refuseInvite).toHaveBeenCalledTimes(1)
    )
  })
})
