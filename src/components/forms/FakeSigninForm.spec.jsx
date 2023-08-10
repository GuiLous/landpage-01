import { fireEvent, render, screen } from '@testing-library/react'

import { FakeSigninForm } from '@components'

const mockSubmit = jest.fn()

const renderComponent = (errors = {}) => {
  render(
    <FakeSigninForm
      fetching={false}
      onSubmit={mockSubmit}
      fieldsErrors={errors}
    />
  )
}

describe('FakeSigninForm Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('Entrar sem Steam')).toBeInTheDocument()
    expect(
      screen.getByText('*Disponível somente para testes.')
    ).toBeInTheDocument()
  })

  it('should render email errors', () => {
    const errors = {
      email: 'Email error test',
    }

    renderComponent(errors)

    expect(screen.getByTestId('warningIcon')).toBeInTheDocument()
    expect(screen.getByText('Email error test')).toBeInTheDocument()
  })

  it('should change email input on change', () => {
    renderComponent()

    const input = screen.getByPlaceholderText('exemplo@email.com')
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')
  })

  it('should call onSubmit function on press Enter', () => {
    renderComponent()

    const input = screen.getByPlaceholderText('exemplo@email.com')
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    expect(input.value).toBe('test@example.com')

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(mockSubmit).toHaveBeenCalledTimes(1)
  })

  it('should call onSubmit function on click button', () => {
    renderComponent()

    const input = screen.getByPlaceholderText('exemplo@email.com')
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    expect(input.value).toBe('test@example.com')

    const submitBtn = screen.getByText('Entrar')

    submitBtn.click()

    expect(mockSubmit).toHaveBeenCalledTimes(1)
  })

  it('should change select contente on change', () => {
    renderComponent()

    const select = screen.getByTestId('select')
    fireEvent.change(select, { target: { value: 'player2@reloadclub.gg' } })

    expect(select.value).toBe('player2@reloadclub.gg')
  })

  it('should render default option on select when not changed', () => {
    renderComponent()

    const select = screen.getByTestId('select')

    expect(select.value).toBe('player1@reloadclub.gg')
    expect(screen.getByText('Selecione um email')).toBeInTheDocument()
  })

  it('should disable button if value is null or undefined', () => {
    renderComponent()

    const submitBtn = screen.getByText('Entrar')

    expect(submitBtn).toBeDisabled()
  })

  it('should enable button if has value', () => {
    renderComponent()

    const submitBtn = screen.getByText('Entrar')

    expect(submitBtn).toBeDisabled()

    const select = screen.getByTestId('select')
    fireEvent.change(select, { target: { value: 'player2@reloadclub.gg' } })

    expect(submitBtn).toBeEnabled()
  })
})
