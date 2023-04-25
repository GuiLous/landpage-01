import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { HeaderProfile } from '@components'
import UserReducer from '@slices/UserSlice'

describe('HeaderProfile Component', () => {
  const user = {
    account: {
      username: 'fakeUser',
      avatar: {
        medium: 'fakeImg',
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
      <Provider store={store}>
        <HeaderProfile />
      </Provider>
    )

    expect(screen.getByText('Platinum 20')).toBeInTheDocument()
    expect(screen.getByText('Vitórias')).toBeInTheDocument()
  })
})
