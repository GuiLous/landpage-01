import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { LobbiesAPI } from '@api'
import { ToastListItem } from '@components'
import InviteReducer from '@slices/InviteSlice'

jest.mock('@api', () => ({
  LobbiesAPI: {
    acceptInvite: jest.fn(),
  },
}))

const toast = {
  id: 1,
  title: 'Feedback!',
  content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  duration: 6,
  variant: 'success',
}

let invites = []

const renderComponent = () => {
  const store = configureStore({
    reducer: { invites: InviteReducer },
    preloadedState: { invites },
  })

  render(
    <Provider store={store}>
      <ToastListItem {...toast} />
    </Provider>
  )
}

describe('ToastListItem Component', () => {
  afterEach(() => {
    invites = []
  })

  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('Feedback!')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      )
    ).toBeInTheDocument()
  })

  it('should render variant correctly', () => {
    renderComponent()
    expect(screen.getByTestId('container')).toHaveClass(toast.variant)
  })

  it('should render default title', () => {
    toast.title = null

    renderComponent()
    expect(screen.getByText('Tudo certo!')).toBeInTheDocument()

    toast.variant = 'warning'

    renderComponent()
    expect(screen.getByText('Atenção!')).toBeInTheDocument()

    toast.variant = 'error'

    renderComponent()
    expect(screen.getByText('Algo saiu errado...')).toBeInTheDocument()

    toast.variant = 'invite'

    renderComponent()
    expect(screen.getByText('Info')).toBeInTheDocument()
  })

  it('should render Aceitar button when variant is invite', () => {
    toast.variant = 'invite'

    renderComponent()

    expect(screen.getByText('Aceitar')).toBeInTheDocument()
  })

  it('should call acceptInvite on click Aceitar button', async () => {
    LobbiesAPI.acceptInvite.mockResolvedValue({})
    toast.variant = 'invite'

    renderComponent()

    const acceptInviteBtn = screen.getByText('Aceitar')
    fireEvent.click(acceptInviteBtn)

    await waitFor(() =>
      expect(LobbiesAPI.acceptInvite).toHaveBeenCalledTimes(1)
    )
  })
})
