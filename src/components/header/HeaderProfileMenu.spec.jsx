import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { HeaderProfileMenu } from '@components'
import UserReducer from '@slices/UserSlice'

describe('HeaderProfileMenu Component', () => {
  const user = {
    account: {
      username: 'fakeUser',
      avatar: {
        small:
          'https://avatars.akamai.steamstatic.com/fba2f7ffa02a5501d1fdee81221d87b4504a6159_small.jpg',
      },
    },
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  it('should renders correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <HeaderProfileMenu user={user} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Olá!')).toBeInTheDocument()
  })

  it('should renders with user', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <HeaderProfileMenu user={user} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('fakeUser')).toBeInTheDocument()
  })

  it('should open menu on click', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <HeaderProfileMenu user={user} />
        </Provider>
      </BrowserRouter>
    )

    const openMenuButton = screen.getByRole('button', { name: 'menu button' })
    fireEvent.click(openMenuButton)

    expect(screen.getByText('Meu perfil')).toBeInTheDocument()
  })
})
