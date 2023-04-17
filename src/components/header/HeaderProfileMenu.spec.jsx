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
        small: 'fakeImg',
      },
    },
  }

  it('should renders correctly', () => {
    const store = configureStore({
      reducer: {
        user: UserReducer,
      },
      preloadedState: { user },
    })

    render(
      <BrowserRouter>
        <Provider store={store}>
          <HeaderProfileMenu />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Olá!')).toBeInTheDocument()
  })

  it('should renders with user', () => {
    const store = configureStore({
      reducer: {
        user: UserReducer,
      },
      preloadedState: { user },
    })

    render(
      <BrowserRouter>
        <Provider store={store}>
          <HeaderProfileMenu />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('fakeUser')).toBeInTheDocument()
  })

  it('should open menu on click', () => {
    const store = configureStore({
      reducer: {
        user: UserReducer,
      },
      preloadedState: { user },
    })

    render(
      <BrowserRouter>
        <Provider store={store}>
          <HeaderProfileMenu />
        </Provider>
      </BrowserRouter>
    )

    const openMenuButton = screen.getByRole('button', { name: 'menu button' })
    fireEvent.click(openMenuButton)

    expect(screen.getByText('Meu perfil')).toBeInTheDocument()
  })
})
