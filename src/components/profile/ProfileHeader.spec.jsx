import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { ProfileHeader } from '@components'

const renderComponent = (isUserLogged = false, status = 'online') => {
  const profile = {
    username: 'User1',
    level: 0,
    level_points: 0,
    avatar: {
      medium:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
    },
    user_id: 1,
    status: status,
    socials: [
      {
        name: 'steam',
        url: 'https://steamcommunity.com/profiles/76561199086242260/',
      },
      { name: 'discord', url: 'https://discord.gg/mMMKshktfT' },
      {
        name: 'youtube',
        url: 'https://www.youtube.com/channel/UC0Yx6OapSWC0pym9ACd-D1A',
      },
    ],
  }

  const mockStore = configureStore()({})
  render(
    <BrowserRouter>
      <Provider store={mockStore}>
        <ProfileHeader isUserLogged={isUserLogged} profile={profile} />
      </Provider>
    </BrowserRouter>
  )
}

describe('ProfileHeader Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('User1')).toBeInTheDocument()
    expect(screen.getByText('Online')).toBeInTheDocument()
    expect(screen.getByText('Level 0')).toBeInTheDocument()
  })

  it('should status offline', () => {
    renderComponent(false, 'offline')

    expect(screen.getByText('Offline')).toBeInTheDocument()
  })

  it('should status teaming', () => {
    renderComponent(false, 'teaming')

    expect(screen.getByText('Em grupo')).toBeInTheDocument()
  })

  it('should status queued', () => {
    renderComponent(false, 'queued')

    expect(screen.getByText('Na fila')).toBeInTheDocument()
  })

  it('should status in_game', () => {
    renderComponent(false, 'in_game')

    expect(screen.getByText('Em jogo (RANKED 5X5)')).toBeInTheDocument()
  })

  it('should render user logged button', () => {
    renderComponent(true, 'in_game')

    expect(screen.getByText('Meu perfil')).toBeInTheDocument()
    expect(screen.getByText('Meu inventário')).toBeInTheDocument()
    expect(screen.getByText('Configurações')).toBeInTheDocument()
    expect(screen.queryByText('Abrir bate-papo')).not.toBeInTheDocument()
    expect(screen.queryByText('Reportar usuário')).not.toBeInTheDocument()
  })

  it('should not render user logged button', () => {
    renderComponent(false, 'in_game')

    expect(screen.queryByText('Meu perfil')).not.toBeInTheDocument()
    expect(screen.queryByText('Meu inventário')).not.toBeInTheDocument()
    expect(screen.queryByText('Configurações')).not.toBeInTheDocument()
    expect(screen.getByText('Abrir bate-papo')).toBeInTheDocument()
    expect(screen.getByText('Reportar usuário')).toBeInTheDocument()
  })

  it('should render social icons', () => {
    renderComponent(true, 'in_game')

    expect(screen.getByTestId('steam')).toBeInTheDocument()
    expect(screen.getByTestId('youtube')).toBeInTheDocument()
  })
})
