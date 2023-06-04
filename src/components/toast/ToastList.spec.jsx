import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { ToastList } from '@components'
import AppReducer from '@slices/AppSlice'

describe('ToastList Component', () => {
  const app = {
    toasts: [
      {
        id: 1,
        title: 'Feedback!',
        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        duration: 6,
        variant: 'success',
      },
      {
        id: 2,
        title: 'Outro Feedback!',
        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        duration: 6,
        variant: 'error',
      },
    ],
    friendListOpen: false,
  }

  const store = configureStore({
    reducer: { app: AppReducer },
    devTools: true,
    preloadedState: { app },
  })

  it('should renders correctly', () => {
    render(
      <Provider store={store}>
        <ToastList />
      </Provider>
    )
    expect(screen.getAllByTestId('toast-item')).toHaveLength(2)
  })
})
