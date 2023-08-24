import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { AccountsAPI } from '@api'
import { InactiveView } from '@views'

jest.mock('@api', () => ({
  AccountsAPI: {
    logout: jest.fn(),
  },
}))

const renderComponent = () => {
  const mockStore = configureStore()({})

  render(
    <BrowserRouter>
      <Provider store={mockStore}>
        <InactiveView />
      </Provider>
    </BrowserRouter>
  )
}

describe('Inactive View', () => {
  it('should render correctly', async () => {
    renderComponent()

    expect(screen.getByText('Sua conta está inativa')).toBeInTheDocument()
    expect(
      screen.getByText('Sair e voltar para página inicial')
    ).toBeInTheDocument()
    expect(screen.getAllByTestId('discord')).toHaveLength(2)
    expect(screen.getAllByTestId('instagram')).toHaveLength(2)
    expect(screen.getAllByTestId('twitter')).toHaveLength(2)
    expect(screen.getAllByTestId('facebook')).toHaveLength(2)
  })

  it('should call logout on click link', async () => {
    AccountsAPI.logout.mockResolvedValue({})

    renderComponent()

    const button = screen.getByText('Sair e voltar para página inicial')
    fireEvent.click(button)

    await waitFor(() => expect(AccountsAPI.logout).toHaveBeenCalled())
  })
})
