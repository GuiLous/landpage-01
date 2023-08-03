import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { LobbiesAPI, SupportAPI } from '@api'
import { FriendListMenu } from '@components'
import { addToast, toggleFriendList } from '@slices/AppSlice'
import { addInvite } from '@slices/InviteSlice'

jest.mock('@api', () => ({
  LobbiesAPI: {
    createInvite: jest.fn(),
  },
  SupportAPI: {
    listTickets: jest.fn(),
  },
}))

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

const mockNavigate = jest.fn()

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}))

const renderComponent = (props) => {
  const user = {
    lobby_id: 1,
    id: 1,
  }

  const mockStore = configureStore()({})
  render(
    <BrowserRouter>
      <Provider store={mockStore}>
        <FriendListMenu
          user={user}
          user_id={2}
          username="userTest1"
          steam_url="testUrl"
          {...props}
        />
      </Provider>
    </BrowserRouter>
  )
}

describe('FriendListMenu Component', () => {
  const props = {
    open: true,
    isAvailable: true,
    alreadyInvited: false,
    alreadyOnTeam: false,
  }

  it('should render correctly', () => {
    renderComponent(props)

    expect(screen.getByText('Convidar para o grupo')).toBeInTheDocument()
    expect(screen.getByText('Ver perfil')).toBeInTheDocument()
    expect(screen.getByText('Ver perfil na Steam')).toBeInTheDocument()
    expect(screen.getByText('Reportar usuário')).toBeInTheDocument()
  })

  it('should render button with disabled class if isAvailable is false', () => {
    props.isAvailable = false

    renderComponent(props)

    expect(screen.getByTestId('invite')).toHaveClass('disabled')
  })

  it('should render button with invited class if alreadyInvited is true', () => {
    props.isAvailable = true
    props.alreadyInvited = true

    renderComponent(props)

    expect(screen.getByTestId('invite')).toHaveClass('invited')
  })

  it('should render Convite enviado! if already invited', () => {
    props.isAvailable = true
    props.alreadyInvited = true

    renderComponent(props)

    expect(screen.getByText('Convite enviado!')).toBeInTheDocument()
  })

  it('should call createInvite on click button', async () => {
    LobbiesAPI.createInvite.mockResolvedValue({ id: '1:2' })

    props.alreadyInvited = false

    renderComponent(props)

    const inviteBtn = screen.getByText('Convidar para o grupo')

    fireEvent.click(inviteBtn)

    await waitFor(() =>
      expect(LobbiesAPI.createInvite).toHaveBeenCalledTimes(1)
    )
    expect(mockDispatch).toHaveBeenCalledWith(addInvite({ id: '1:2' }))
    expect(mockDispatch).toHaveBeenCalledWith(
      addToast({
        title: 'Convite enviado',
        variant: 'success',
      })
    )
  })

  it('should not call createInvite on click button if isAvailable is false', async () => {
    LobbiesAPI.createInvite.mockResolvedValue({})

    props.isAvailable = false

    renderComponent(props)

    const inviteBtn = screen.getByText('Convidar para o grupo')

    fireEvent.click(inviteBtn)

    await waitFor(() =>
      expect(LobbiesAPI.createInvite).toHaveBeenCalledTimes(0)
    )
  })

  it('should not call createInvite on click button if alreadyInvited is true', async () => {
    LobbiesAPI.createInvite.mockResolvedValue({})

    props.isAvailable = true
    props.alreadyInvited = true

    renderComponent(props)

    const inviteBtn = screen.getByText('Convite enviado!')

    fireEvent.click(inviteBtn)

    await waitFor(() =>
      expect(LobbiesAPI.createInvite).toHaveBeenCalledTimes(0)
    )
  })

  it('should not call createInvite on click button if alreadyOnTeam is true', async () => {
    LobbiesAPI.createInvite.mockResolvedValue({})

    props.isAvailable = true
    props.alreadyInvited = false
    props.alreadyOnTeam = true

    renderComponent(props)

    const inviteBtn = screen.getByText('Convidar para o grupo')

    fireEvent.click(inviteBtn)

    await waitFor(() =>
      expect(LobbiesAPI.createInvite).toHaveBeenCalledTimes(0)
    )
  })

  it('should navigate to profile on click button', async () => {
    renderComponent(props)

    const profileBtn = screen.getByText('Ver perfil')

    fireEvent.click(profileBtn)

    expect(mockDispatch).toHaveBeenCalledWith(toggleFriendList(false))
    expect(mockNavigate).toHaveBeenCalledWith(`/perfil/2`)
  })

  it('should open supportModal on click button', async () => {
    SupportAPI.listTickets.mockResolvedValue([])
    renderComponent(props)

    const supportBtn = screen.getByText('Reportar usuário')

    fireEvent.click(supportBtn)

    await screen.findByText('SUPORTE RELOAD CLUB')
  })
})
