import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ProfileHeaderButtons } from '@components'
import UserReducer from '@slices/UserSlice'

const mockNavigate = jest.fn()

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}))

const renderComponent = (isUserLogged = false) => {
  const user = {
    id: 1,
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <ProfileHeaderButtons isUserLogged={isUserLogged} username="User1" />
      </Provider>
    </BrowserRouter>
  )
}

describe('ProfileHeaderButtons Component', () => {
  it('should render user logged button', () => {
    renderComponent(true, 'online')

    expect(screen.getByText('Meu perfil')).toBeInTheDocument()
    expect(screen.getByText('Meu inventário')).toBeInTheDocument()
    expect(screen.getByText('Configurações')).toBeInTheDocument()
    expect(screen.queryByText('Abrir bate-papo')).not.toBeInTheDocument()
    expect(screen.queryByText('Reportar usuário')).not.toBeInTheDocument()
  })

  it('should not render user logged button', () => {
    renderComponent(false, 'online')

    expect(screen.queryByText('Meu perfil')).not.toBeInTheDocument()
    expect(screen.queryByText('Meu inventário')).not.toBeInTheDocument()
    expect(screen.queryByText('Configurações')).not.toBeInTheDocument()
    expect(screen.getByText('Abrir bate-papo')).toBeInTheDocument()
    expect(screen.getByText('Reportar usuário')).toBeInTheDocument()
  })

  it('should navigate to inventory on click button', async () => {
    renderComponent(true, 'online')

    const inventoryBtn = screen.getByText('Meu inventário')

    fireEvent.click(inventoryBtn)

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith(`/inventory/1`)
    )
  })

  it('should navigate to profile on click button', async () => {
    renderComponent(true, 'online')

    const profileBtn = screen.getByText('Meu perfil')

    fireEvent.click(profileBtn)

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(`/perfil/1`))
  })

  it('should navigate to conta on click button', async () => {
    renderComponent(true, 'online')

    const configBtn = screen.getByText('Configurações')

    fireEvent.click(configBtn)

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(`/conta`))
  })

  it('should open support modal on click button', async () => {
    renderComponent(false, 'online')

    const supportBtn = screen.getByText('Reportar usuário')

    fireEvent.click(supportBtn)

    await screen.findByText('SUPORTE RELOAD CLUB')
  })

  it('should call window.open on click button', async () => {
    window.open = jest.fn()

    renderComponent(false, 'online')

    const chatBtn = screen.getByText('Abrir bate-papo')

    fireEvent.click(chatBtn)

    await waitFor(() =>
      expect(window.open).toHaveBeenCalledWith(
        `https://steamcommunity.com/chat`,
        '_blank'
      )
    )
  })
})
