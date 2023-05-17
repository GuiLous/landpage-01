import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { ToastListItem } from '@components'
import ToastReducer from '@slices/ToastSlice'

describe('ToastListItem Component', () => {
  const preloadedState = {
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
  }

  const store = configureStore({
    reducer: { toasts: ToastReducer },
    devTools: true,
    preloadedState: preloadedState,
  })

  it('should renders correctly', () => {
    render(
      <Provider store={store}>
        <ToastListItem {...preloadedState.toasts[0]} />
      </Provider>
    )
    expect(screen.getByText('Feedback!')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      )
    ).toBeInTheDocument()
  })
})
