import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { AccountsAPI } from '@api'
import { DeleteAccountCard } from '@components'

jest.mock('@api', () => ({
  AccountsAPI: {
    delete: jest.fn(),
  },
}))

const renderComponent = () => {
  const mockStore = configureStore()({})

  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <DeleteAccountCard />
      </BrowserRouter>
    </Provider>
  )
}

describe('DeleteAccountCard Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('EXCLUIR CONTA')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Exclua permanentemente a sua conta. Essa ação é permanente e não pode ser desfeita.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Prosseguir com a exclusão')).toBeInTheDocument()
  })

  it('should open the modal when button is clicked', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Prosseguir com a exclusão'))

    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })

  it('should close the modal when the close button is clicked', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Prosseguir com a exclusão'))

    const modal = screen.getByRole('dialog')

    expect(modal).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Close'))

    expect(modal).not.toBeInTheDocument()
  })

  it('should call delete endpoint on click button', async () => {
    AccountsAPI.delete.mockResolvedValue({})

    renderComponent()

    fireEvent.click(screen.getByText('Prosseguir com a exclusão'))

    const modal = screen.getByRole('dialog')

    expect(modal).toBeInTheDocument()

    const deleteBtn = screen.getByTestId('deleteBtn')
    fireEvent.click(deleteBtn)

    await screen.findByText('Excluindo...')

    expect(AccountsAPI.delete).toHaveBeenCalledTimes(1)
  })
})
