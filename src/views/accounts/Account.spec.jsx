import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ProfilesAPI } from '@api'
import { ProfileDetailsProvider } from '@contexts'
import UserReducer from '@slices/UserSlice'
import { AccountView } from '@views'

jest.mock('@api', () => ({
  ProfilesAPI: {
    detail: jest.fn(),
  },
}))

const mockedResponse = {
  username: 'Username',
  level: 0,
  level_points: 0,
  avatar: {
    medium:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
  },
  user_id: 1,
  status: 'online',
  social_handles: {
    steam: '112415987456519643',
    twitch: 'coreano',
    discord: null,
    youtube: null,
  },
}

const renderComponent = () => {
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
      <ProfileDetailsProvider>
        <Provider store={store}>
          <AccountView />
        </Provider>
      </ProfileDetailsProvider>
    </BrowserRouter>
  )
}

describe('Account View', () => {
  it('should render correctly', async () => {
    ProfilesAPI.detail.mockResolvedValue(mockedResponse)

    renderComponent()

    await screen.findByText('CONFIGURAÇÕES DE CONTA')
    await screen.findByText('INFORMAÇÕES PESSOAIS')
    await screen.findByText('EXCLUIR CONTA')
    await screen.findByText('INATIVAR CONTA')
    await screen.findByText('Username')
    await screen.findByText('Online')
  })
})
