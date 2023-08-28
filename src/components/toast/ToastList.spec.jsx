import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { ToastList } from '@components'
import AppReducer from '@slices/AppSlice'
import InviteReducer from '@slices/InviteSlice'

const renderComponent = () => {
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

  const invites = []

  const store = configureStore({
    reducer: { app: AppReducer, invites: InviteReducer },
    devTools: true,
    preloadedState: { app, invites },
  })

  render(
    <Provider store={store}>
      <ToastList />
    </Provider>
  )
}

describe('ToastList Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getAllByTestId('toast-item')).toHaveLength(2)
  })
})
