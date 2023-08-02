import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { InactivateAccountCard } from '@components'

const server = setupServer(
  rest.patch(
    'http://localhost:8000/api/accounts/inactivate/',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(null))
    }
  )
)

const renderComponent = () => {
  const mockStore = configureStore()({})

  return (
    <Provider store={mockStore}>
      <BrowserRouter>
        <InactivateAccountCard />
      </BrowserRouter>
    </Provider>
  )
}

describe('InactivateAccountCard Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => server.close())

  it('should render correctly', () => {
    render(renderComponent())

    expect(screen.getByText('INATIVAR CONTA')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Ao inativar sua conta suas informações tornam-se privadas e você não será capaz de acessar nossos serviços até que a reative novamente.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Prosseguir com a inativação')).toBeInTheDocument()
  })

  it('should open the modal when button is clicked', () => {
    render(renderComponent())

    fireEvent.click(screen.getByText('Prosseguir com a inativação'))

    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })

  it('should close the modal when the close button is clicked', () => {
    render(renderComponent())

    fireEvent.click(screen.getByText('Prosseguir com a inativação'))

    const modal = screen.getByRole('dialog')

    expect(modal).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Close'))

    expect(modal).not.toBeInTheDocument()
  })

  it('should call inactivate endpoint on click button', async () => {
    render(renderComponent())

    fireEvent.click(screen.getByText('Prosseguir com a inativação'))

    const modal = screen.getByRole('dialog')

    expect(modal).toBeInTheDocument()

    const deleteBtn = screen.getByTestId('inactiveBtn')
    fireEvent.click(deleteBtn)

    expect(screen.getByText('Inativando...')).toBeInTheDocument()

    await waitFor(() =>
      expect(server.listHandlers()[0].info.path).toBe(
        'http://localhost:8000/api/accounts/inactivate/'
      )
    )
  })
})
