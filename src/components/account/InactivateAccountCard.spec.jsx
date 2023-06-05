import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { InactivateAccountCard } from '@components'

describe('InactivateAccountCard Component', () => {
  const mockStore = configureStore()({})

  it('should render correctly', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <InactivateAccountCard />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('INATIVAR CONTA')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Ao inativar sua conta suas informações tornam-se privadas e você não será capaz de acessar nossos serviços até que a reative novamente.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Prosseguir com a inativação')).toBeInTheDocument()
  })

  it('should open the modal when button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <InactivateAccountCard />
        </BrowserRouter>
      </Provider>
    )

    fireEvent.click(screen.getByText('Prosseguir com a inativação'))

    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })

  it('should close the modal when the close button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <InactivateAccountCard />
        </BrowserRouter>
      </Provider>
    )

    fireEvent.click(screen.getByText('Prosseguir com a inativação'))

    const modal = screen.getByRole('dialog')

    expect(modal).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Close'))

    expect(modal).not.toBeInTheDocument()
  })
})
