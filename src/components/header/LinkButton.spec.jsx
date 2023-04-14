import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { LinkButton } from '@components'
import MatchReducer from '@slices/MatchSlice'
import UserReducer from '@slices/UserSlice'

describe('LinkButton Component', () => {
  it('should renders correctly', () => {
    const user = {
      account: {
        lobby: {
          queue: null,
        },
      },
    }

    const match = {
      preMatch: null,
      match: null,
    }

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
          <LinkButton />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Jogar')).toBeInTheDocument()
  })

  it('should renders with text Em partida', () => {
    const user = {
      account: {
        lobby: {
          queue: null,
        },
      },
    }

    const match = {
      preMatch: null,
      match: true,
    }

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
          <LinkButton />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Em partida')).toBeInTheDocument()
  })

  it('should renders with Count', () => {
    const user = {
      account: {
        lobby: {
          queue: true,
        },
      },
    }

    const match = {
      preMatch: null,
      match: null,
    }

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
          <LinkButton />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Na fila')).toBeInTheDocument()
  })
})
