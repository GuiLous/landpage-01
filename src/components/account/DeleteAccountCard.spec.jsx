import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { DeleteAccountCard } from '@components'

const server = setupServer(
  rest.delete('http://localhost:8000/api/accounts/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(null))
  })
)

const renderComponent = () => {
  const mockStore = configureStore()({})

  return (
    <Provider store={mockStore}>
      <BrowserRouter>
        <DeleteAccountCard />
      </BrowserRouter>
    </Provider>
  )
}

describe('DeleteAccountCard Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => server.close())

  it('should render correctly', () => {
    render(renderComponent())

    expect(screen.getByText('EXCLUIR CONTA')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Exclua permanentemente a sua conta. Essa ação é permanente e não pode ser desfeita.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Prosseguir com a exclusão')).toBeInTheDocument()
  })

  it('should open the modal when button is clicked', () => {
    render(renderComponent())

    fireEvent.click(screen.getByText('Prosseguir com a exclusão'))

    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })

  it('should close the modal when the close button is clicked', () => {
    render(renderComponent())

    fireEvent.click(screen.getByText('Prosseguir com a exclusão'))

    const modal = screen.getByRole('dialog')

    expect(modal).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Close'))

    expect(modal).not.toBeInTheDocument()
  })

  it('should call delete endpoint on click button', async () => {
    render(renderComponent())

    fireEvent.click(screen.getByText('Prosseguir com a exclusão'))

    const modal = screen.getByRole('dialog')

    expect(modal).toBeInTheDocument()

    const deleteBtn = screen.getByTestId('deleteBtn')
    fireEvent.click(deleteBtn)

    expect(screen.getByText('Excluindo...')).toBeInTheDocument()

    await waitFor(() =>
      expect(server.listHandlers()[0].info.path).toBe(
        'http://localhost:8000/api/accounts/'
      )
    )
  })
})
