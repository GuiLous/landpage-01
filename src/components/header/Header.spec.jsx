import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Header } from '@components'
import MatchReducer from '@slices/MatchSlice'
import UserReducer from '@slices/UserSlice'

describe('Header Component', () => {
  const user = {
    account: {
      username: 'fakeUser',
      avatar: {
        small: 'fakeImg',
      },
      lobby: {
        queue: null,
      },
    },
  }

  const match = {
    preMatch: null,
    match: null,
  }

  it('should renders correctly', () => {
    const store = configureStore({
      reducer: {
        user: UserReducer,
        match: MatchReducer,
      },
      preloadedState: { user, match },
    })

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Jogar')).toBeInTheDocument()
    expect(screen.getByText('Olá!')).toBeInTheDocument()
  })

  it('should renders with user', () => {
    const store = configureStore({
      reducer: {
        user: UserReducer,
        match: MatchReducer,
      },
      preloadedState: { user, match },
    })

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('fakeUser')).toBeInTheDocument()
  })
})
