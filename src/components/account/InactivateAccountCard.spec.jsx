import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { AccountsAPI } from '@api'
import { InactivateAccountCard } from '@components'
import { updateUser } from '@slices/UserSlice'

jest.mock('@api', () => ({
  AccountsAPI: {
    inactivate: jest.fn(),
  },
}))

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

const renderComponent = () => {
  const mockStore = configureStore()({})

  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <InactivateAccountCard />
      </BrowserRouter>
    </Provider>
  )
}

describe('InactivateAccountCard Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('INATIVAR CONTA')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Ao inativar sua conta suas informações tornam-se privadas e você não será capaz de acessar nossos serviços até que a reative novamente.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Prosseguir com a inativação')).toBeInTheDocument()
  })

  it('should open the modal when button is clicked', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Prosseguir com a inativação'))

    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })

  it('should close the modal when the close button is clicked', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Prosseguir com a inativação'))

    const modal = screen.getByRole('dialog')

    expect(modal).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Close'))

    expect(modal).not.toBeInTheDocument()
  })

  it('should call inactivate endpoint on click button', async () => {
    AccountsAPI.inactivate.mockResolvedValue({})

    renderComponent()

    fireEvent.click(screen.getByText('Prosseguir com a inativação'))

    const modal = screen.getByRole('dialog')

    expect(modal).toBeInTheDocument()

    const deleteBtn = screen.getByTestId('inactiveBtn')

    fireEvent.click(deleteBtn)

    await screen.findByText('Inativando...')

    expect(AccountsAPI.inactivate).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith(updateUser(null))
  })
})
