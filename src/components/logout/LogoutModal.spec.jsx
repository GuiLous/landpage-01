import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { AccountsAPI } from '@api'
import LogoutModal from './LogoutModal'

jest.mock('@api', () => ({
  AccountsAPI: {
    logout: jest.fn(),
  },
}))

const mockSetIsOpen = jest.fn()

const renderComponent = () => {
  const mockStore = configureStore()({})

  render(
    <Provider store={mockStore}>
      <LogoutModal isOpen={true} setIsOpen={mockSetIsOpen} />
    </Provider>
  )
}

describe('LogoutModal component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('ESTÁ INDO EMBORA?')).toBeInTheDocument()
    expect(screen.getByText('Cancelar')).toBeInTheDocument()
    expect(screen.getByText('Sair')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Você está prestes a fazer logout da sua conta. Tem certeza de que deseja sair?'
      )
    ).toBeInTheDocument()
  })

  it('should close modal on click Cancelar', async () => {
    renderComponent()

    const cancelBtn = screen.getByText('Cancelar')

    fireEvent.click(cancelBtn)

    await waitFor(() => expect(mockSetIsOpen).toHaveBeenCalled())
  })

  it('should call logout on click Sair button', async () => {
    AccountsAPI.logout.mockResolvedValue({})

    renderComponent()

    const logoutBtn = screen.getByText('Sair')

    fireEvent.click(logoutBtn)

    await waitFor(() => expect(AccountsAPI.logout).toHaveBeenCalledTimes(1))
  })
})
