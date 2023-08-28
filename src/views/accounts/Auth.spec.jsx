import { configureStore } from '@reduxjs/toolkit'
import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { AuthService, StorageService } from '@services'
import { updateMatch } from '@slices/MatchSlice'
import { updatePreMatch } from '@slices/PreMatchSlice'
import UserReducer, { updateUser } from '@slices/UserSlice'
import { AuthView } from '@views'

const mockNavigate = jest.fn()
const mockDispatch = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

jest.mock('@services', () => ({
  AuthService: {
    login: jest.fn(),
  },
  StorageService: {
    set: jest.fn(),
    get: jest.fn(),
  },
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

let user = null

const renderComponent = () => {
  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <AuthView />
      </Provider>
    </BrowserRouter>
  )
}

describe('Auth View', () => {
  it('should redirect to / if has no token', async () => {
    StorageService.get.mockResolvedValue(null)

    renderComponent()

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'))
  })

  it('should call login is has no user', async () => {
    AuthService.login.mockResolvedValue({})
    StorageService.set.mockResolvedValue({})
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    await waitFor(() => expect(AuthService.login).toHaveBeenCalled())
    expect(mockDispatch).toHaveBeenCalledWith(updateUser({}))
  })

  it('should update pre match if response has account and pre_match', async () => {
    AuthService.login.mockResolvedValue({ account: { pre_match: true } })
    StorageService.set.mockResolvedValue({})
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    await waitFor(() => expect(AuthService.login).toHaveBeenCalled())
    expect(mockDispatch).toHaveBeenCalledWith(
      updateUser({ account: { pre_match: true } })
    )
    expect(mockDispatch).toHaveBeenCalledWith(updatePreMatch(true))
  })

  it('should update match if response has account and match', async () => {
    AuthService.login.mockResolvedValue({ account: { match: true } })
    StorageService.set.mockResolvedValue({})
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    await waitFor(() => expect(AuthService.login).toHaveBeenCalled())
    expect(mockDispatch).toHaveBeenCalledWith(
      updateUser({ account: { match: true } })
    )
    expect(mockDispatch).toHaveBeenCalledWith(updateMatch(true))
  })

  it('should redirect to / is has no response', async () => {
    AuthService.login.mockResolvedValue(false)
    StorageService.set.mockResolvedValue({})
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'))
  })

  it('should redirect to /conta-inativa if user is not active', async () => {
    user = { is_active: false }

    StorageService.get.mockResolvedValue('token')

    renderComponent()

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/conta-inativa')
    )
  })

  it('should redirect to /cadastrar if user has no account', async () => {
    user = { is_active: true, account: false }

    StorageService.get.mockResolvedValue('token')

    renderComponent()

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/cadastrar'))
  })

  it('should redirect to /verificar if user is not verified', async () => {
    user = { is_active: true, account: { is_verified: false } }

    StorageService.get.mockResolvedValue('token')

    renderComponent()

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/verificar'))
  })

  it('should redirect to /conectar if user has account, match and status equal loading', async () => {
    user = {
      is_active: true,
      account: { is_verified: true, match: { status: 'loading' } },
    }

    StorageService.get.mockResolvedValue('token')

    renderComponent()

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/conectar'))
  })

  it('should redirect to /jogar if user pass all conditions', async () => {
    user = {
      is_active: true,
      account: { is_verified: true, match: false },
    }

    StorageService.get.mockResolvedValue('token')

    renderComponent()

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/jogar'))
  })
})
