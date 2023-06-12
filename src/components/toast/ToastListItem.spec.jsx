import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { ToastListItem } from '@components'
import AppReducer from '@slices/AppSlice'

describe('ToastListItem Component', () => {
  let app = {
    toasts: [],
    friendListOpen: false,
  }

  const store = configureStore({
    reducer: { app: AppReducer },
    devTools: true,
    preloadedState: { app },
  })

  it('should renders correctly', () => {
    app.toasts.push({
      id: 1,
      title: 'Feedback!',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      duration: 6,
      variant: 'success',
    })

    render(
      <Provider store={store}>
        <ToastListItem {...app.toasts[0]} />
      </Provider>
    )
    expect(screen.getByText('Feedback!')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      )
    ).toBeInTheDocument()
  })

  it('should render variant correctly', () => {
    render(
      <Provider store={store}>
        <ToastListItem {...app.toasts[0]} />
      </Provider>
    )

    expect(screen.getByTestId('container')).toHaveClass(app.toasts[0].variant)
  })

  it('should render default title', () => {
    app.toasts = []
    app.toasts.push({
      id: 1,
      content: 'Default title toast.',
      duration: 6,
      variant: 'success',
    })
    render(
      <Provider store={store}>
        <ToastListItem {...app.toasts[0]} />
      </Provider>
    )
    expect(screen.getByText('Tudo certo!')).toBeInTheDocument()

    app.toasts[0].variant = 'warning'
    render(
      <Provider store={store}>
        <ToastListItem {...app.toasts[0]} />
      </Provider>
    )
    expect(screen.getByText('Atenção!')).toBeInTheDocument()

    app.toasts[0].variant = 'error'
    render(
      <Provider store={store}>
        <ToastListItem {...app.toasts[0]} />
      </Provider>
    )
    expect(screen.getByText('Algo saiu errado...')).toBeInTheDocument()
  })
})
