import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { AccountsAPI } from '@api'
import { ChangeEmailCard } from '@components'
import UserReducer from '@slices/UserSlice'

jest.mock('@api', () => ({
  AccountsAPI: {
    updateEmail: jest.fn(),
  },
}))

const renderComponent = () => {
  const user = {
    id: 1,
    email: 'email@example.com',
    account: {
      is_verified: false,
    },
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  render(
    <Provider store={store}>
      <ChangeEmailCard />
    </Provider>
  )
}

describe('ChangeEmailCard Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('ALTERAR E-MAIL')).toBeInTheDocument()
    expect(screen.getByTestId('pencilIcon')).toBeInTheDocument()
  })

  it('should disable button if is not editing', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('should enable editing when input group is clicked', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)

    expect(input).toBeEnabled()
  })

  it('should update email when handleChange is called', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')
  })

  it('should change icon to CheckCircleIcon if user.email is different of email, is not editing and email is valid', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')
    expect(screen.getByTestId('checkCircleIcon1')).toBeInTheDocument()
  })

  it('should change icon to CheckCircleIcon if is editing and email is valid', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')
    expect(screen.getByTestId('checkCircleIcon2')).toBeInTheDocument()
  })

  it('should change icon to WarningCircleIcon if user.email is different of email, is not editing and email is not valid', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.' } })

    expect(input.value).toBe('test@example.')
    expect(screen.getByTestId('warningCircleIcon1')).toBeInTheDocument()
  })

  it('should change icon to WarningCircleIcon if is editing and email is not valid', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.' } })

    expect(input.value).toBe('test@example.')
    expect(screen.getByTestId('warningCircleIcon2')).toBeInTheDocument()
  })

  it('should change email when press Enter, email is correct and email is different of current email', async () => {
    AccountsAPI.updateEmail.mockResolvedValue({
      email: 'userUpdate@example.com',
    })
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    await waitFor(() => expect(input.value).toBe('test@example.com'))

    await waitFor(() =>
      expect(AccountsAPI.updateEmail).toHaveBeenCalledTimes(1)
    )
  })

  it('should change email when clicked on save, email is correct and email is different of current email', async () => {
    AccountsAPI.updateEmail.mockResolvedValue({
      email: 'userUpdate@example.com',
    })

    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')

    const saveBtn = screen.getByTestId('saveBtn')
    saveBtn.click()

    await waitFor(() =>
      expect(AccountsAPI.updateEmail).toHaveBeenCalledTimes(1)
    )
  })

  it('should disable button if email is equal of user.email', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'email@example.com' } })

    expect(input.value).toBe('email@example.com')
    const saveBtn = screen.getByTestId('saveBtn')
    expect(saveBtn).toBeDisabled()
  })

  it('should disable button if email is invalid', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'email@example.' } })

    expect(input.value).toBe('email@example.')
    const saveBtn = screen.getByTestId('saveBtn')
    expect(saveBtn).toBeDisabled()
  })

  it('should disable button if server return error with the email', async () => {
    AccountsAPI.updateEmail.mockResolvedValue({
      fieldsErrors: { email: 'Email already exists' },
    })

    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')

    const saveBtn = screen.getByTestId('saveBtn')

    saveBtn.click()

    await screen.findByText('Email already exists')
  })
})
