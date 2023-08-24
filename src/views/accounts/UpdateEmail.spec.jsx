import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { configureStore } from '@reduxjs/toolkit'
import { HttpService, StorageService } from '@services'
import UserReducer, { updateUser } from '@slices/UserSlice'
import { UpdateEmailView } from '@views'

const mockNavigate = jest.fn()
const mockDispatch = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

jest.mock('@services', () => ({
  HttpService: {
    patch: jest.fn(),
  },
  StorageService: {
    set: jest.fn(),
    get: jest.fn(),
  },
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

let user = {
  id: 1,
}

const renderComponent = () => {
  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <UpdateEmailView />
      </Provider>
    </BrowserRouter>
  )
}

describe('UpdateEmail View', () => {
  it('should render correctly', async () => {
    renderComponent()

    expect(screen.getByText('Altere seu e-mail')).toBeInTheDocument()
    expect(screen.getByText('Alterar e-mail')).toBeInTheDocument()
    expect(screen.getByText('Cancelar e voltar')).toBeInTheDocument()
  })

  it('should redirect to / if has no user', async () => {
    user = null

    renderComponent()

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'))
  })

  it('should redirect to / if user has no account', async () => {
    user = { account: false }

    renderComponent()

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'))
  })

  it('should update email when handleChange is called', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')
  })

  it('should disable button if has no value', () => {
    renderComponent()

    const button = screen.getByText('Alterar e-mail')
    expect(button).toBeDisabled()
  })

  it('should disable button if email is not valid', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.c' } })

    const button = screen.getByText('Alterar e-mail')
    expect(button).toBeDisabled()
  })

  it('should call HttpService.patch on press Enter', async () => {
    HttpService.patch.mockResolvedValue({ account: { is_verified: true } })
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    await waitFor(() => expect(input.value).toBe('test@example.com'))

    await waitFor(() => expect(HttpService.patch).toHaveBeenCalled())
    expect(mockDispatch).toHaveBeenCalledWith(
      updateUser({ account: { is_verified: true } })
    )
    expect(mockNavigate).toHaveBeenCalledWith('/jogar')
  })

  it('should call HttpService.patch on click button', async () => {
    HttpService.patch.mockResolvedValue({ account: { is_verified: true } })
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const button = screen.getByText('Alterar e-mail')
    fireEvent.click(button)

    await waitFor(() => expect(input.value).toBe('test@example.com'))

    await waitFor(() => expect(HttpService.patch).toHaveBeenCalled())
    expect(mockDispatch).toHaveBeenCalledWith(
      updateUser({ account: { is_verified: true } })
    )
    expect(mockNavigate).toHaveBeenCalledWith('/jogar')
  })

  it('should show error if response has fieldsErrors', async () => {
    HttpService.patch.mockResolvedValue({
      fieldsErrors: { email: 'error message' },
    })
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const button = screen.getByText('Alterar e-mail')
    fireEvent.click(button)

    await waitFor(() => expect(input.value).toBe('test@example.com'))

    await waitFor(() => expect(HttpService.patch).toHaveBeenCalled())
    expect(screen.getByText('error message')).toBeInTheDocument()
  })

  it('should show redirect to /verificar is response user is not verified', async () => {
    HttpService.patch.mockResolvedValue({ account: { is_verified: false } })
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const button = screen.getByText('Alterar e-mail')
    fireEvent.click(button)

    await waitFor(() => expect(input.value).toBe('test@example.com'))

    await waitFor(() => expect(HttpService.patch).toHaveBeenCalled())
    expect(mockDispatch).toHaveBeenCalledWith(
      updateUser({ account: { is_verified: false } })
    )
    expect(mockNavigate).toHaveBeenCalledWith('/verificar')
  })
})
