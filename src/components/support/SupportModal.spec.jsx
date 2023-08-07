import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { SupportAPI } from '@api'
import { SupportModal } from '@components'

jest.mock('@api', () => ({
  SupportAPI: {
    createTicket: jest.fn(),
    listTickets: jest.fn(),
  },
}))

const renderComponent = () => {
  const mockStore = configureStore()({})

  render(
    <Provider store={mockStore}>
      <SupportModal isOpen={true} setIsOpen={() => {}} />
    </Provider>
  )
}

describe('SupportModal Component', () => {
  it('should render correctly', async () => {
    SupportAPI.listTickets.mockResolvedValue([
      'option 1',
      'option 2',
      'option 3',
      'option 4',
    ])
    renderComponent()

    await screen.findByText(
      'Tem alguma dúvida? Preencha o formulário ou visite nossa'
    )
    await screen.findByText('central de suporte.')
    await screen.findByText('ENVIAR')
  })

  it('should disable ENVIAR button when description and subject is empty', async () => {
    SupportAPI.listTickets.mockResolvedValue([
      'option 1',
      'option 2',
      'option 3',
      'option 4',
    ])
    renderComponent()

    await waitFor(() => expect(screen.getByText('ENVIAR')).toBeDisabled())
  })

  it('should enable ENVIAR button when description and subject has content', async () => {
    SupportAPI.listTickets.mockResolvedValue([
      'option 1',
      'option 2',
      'option 3',
      'option 4',
    ])
    renderComponent()

    fireEvent.mouseDown(screen.getByRole('combobox'))

    await waitFor(() =>
      expect(screen.queryByText('Carregando opções...')).not.toBeInTheDocument()
    )

    fireEvent.mouseDown(screen.getByRole('combobox'))

    const option = await screen.findByText('option 2')
    fireEvent.click(option)

    expect(screen.getByText('option 2')).toBeInTheDocument()

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'description test' } })

    expect(input.value).toBe('description test')

    expect(screen.getByText('ENVIAR')).toBeEnabled()
  })

  it('should call createTicket on click ENVIAR', async () => {
    SupportAPI.listTickets.mockResolvedValue([
      'option 1',
      'option 2',
      'option 3',
      'option 4',
    ])
    SupportAPI.createTicket.mockResolvedValue({})
    renderComponent()

    fireEvent.mouseDown(screen.getByRole('combobox'))

    await waitFor(() =>
      expect(screen.queryByText('Carregando opções...')).not.toBeInTheDocument()
    )

    fireEvent.mouseDown(screen.getByRole('combobox'))

    const option = await screen.findByText('option 2')
    fireEvent.click(option)

    expect(screen.getByText('option 2')).toBeInTheDocument()

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'description test' } })

    expect(input.value).toBe('description test')

    const sendBtn = screen.getByText('ENVIAR')
    fireEvent.click(sendBtn)

    await waitFor(() =>
      expect(SupportAPI.createTicket).toHaveBeenCalledTimes(1)
    )
  })
})
