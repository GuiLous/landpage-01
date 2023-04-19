import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { LevelProgressBar } from '@components'
import UserReducer from '@slices/UserSlice'

describe('LevelProgressBar Component', () => {
  it('should renders correctly', () => {
    const user = {
      account: {
        level: 0,
        level_points: 0,
      },
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
          <LevelProgressBar />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('+0')).toBeInTheDocument()
    expect(screen.getByText('CLASSIFICAÇÃO RANQUEADA')).toBeInTheDocument()
  })

  it('should render user level', () => {
    const user = {
      account: {
        level: 4,
        level_points: 0,
      },
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
          <LevelProgressBar earnedPoints={100} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('should render user points', () => {
    const user = {
      account: {
        level: 0,
        level_points: 55,
      },
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
          <LevelProgressBar earnedPoints={100} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('55')).toBeInTheDocument()
  })

  it('should be next level icon greater than current level icon in 1 level', () => {
    const user = {
      account: {
        level: 33,
        level_points: 0,
      },
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
          <LevelProgressBar earnedPoints={0} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('34')).toBeInTheDocument()
  })
})
