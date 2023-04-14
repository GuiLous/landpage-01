import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Header } from '@components'
import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '@slices/UserSlice'

describe('Header Component', () => {
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
      reducer: UserReducer,
      preloadedState: { user },
    })

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Jogar')).toBeInTheDocument()
    expect(screen.getByText('Ola!')).toBeInTheDocument()
  })

  it('should renders with user', () => {
    const store = configureStore({
      reducer: UserReducer,
      preloadedState: { user },
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
