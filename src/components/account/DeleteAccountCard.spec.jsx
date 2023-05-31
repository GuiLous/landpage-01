import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { DeleteAccountCard } from '@components'

describe('DeleteAccountCard Component', () => {
  const mockStore = configureStore()({})

  it('should render correctly', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <DeleteAccountCard />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('EXCLUIR CONTA')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Exclua permanentemente a sua conta. Essa ação é permanente e não pode ser desfeita.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Prosseguir com a exclusão')).toBeInTheDocument()
  })

  it('should open the modal when button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <DeleteAccountCard />
        </BrowserRouter>
      </Provider>
    )

    fireEvent.click(screen.getByText('Prosseguir com a exclusão'))

    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })

  it('should close the modal when the close button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <DeleteAccountCard />
        </BrowserRouter>
      </Provider>
    )

    fireEvent.click(screen.getByText('Prosseguir com a exclusão'))

    const modal = screen.getByRole('dialog')

    expect(modal).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Close'))

    expect(modal).not.toBeInTheDocument()
  })
})
