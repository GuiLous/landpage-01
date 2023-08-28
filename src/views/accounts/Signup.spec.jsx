import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { configureStore } from '@reduxjs/toolkit'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import UserReducer from '@slices/UserSlice'
import { SignupView } from '@views'

const mockNavigate = jest.fn()
const mockDispatch = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

jest.mock('@services', () => ({
  HttpService: {
    post: jest.fn(),
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
        <SignupView />
      </Provider>
    </BrowserRouter>
  )
}

describe('Signup View', () => {
  it('should render correctly', async () => {
    renderComponent()

    expect(screen.getByText('E-mail')).toBeInTheDocument()
    expect(screen.getByText('Cadastrar')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Seu e-mail aqui')).toBeInTheDocument()
  })

  it('should redirect to / if has no user', async () => {
    user = null

    renderComponent()

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'))
  })

  it('should redirect to / if user has account', async () => {
    user = { account: true }

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

    const button = screen.getByText('Cadastrar')
    expect(button).toBeDisabled()
  })

  it('should disable button if email is not valid', () => {
    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.c' } })

    const button = screen.getByText('Cadastrar')
    expect(button).toBeDisabled()
  })

  it('should call HttpService.post on press Enter', async () => {
    HttpService.post.mockResolvedValue({ account: true })
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    await waitFor(() => expect(input.value).toBe('test@example.com'))

    await waitFor(() => expect(HttpService.post).toHaveBeenCalled())
    expect(mockDispatch).toHaveBeenCalledWith(
      addToast({
        title: 'Que bom que você chegou!',
        content: 'Agora falta pouco, verifique sua conta para começar a jogar!',
        variant: 'success',
      })
    )
    expect(mockNavigate).toHaveBeenCalledWith('/verificar')
  })

  it('should call HttpService.post on click button', async () => {
    HttpService.post.mockResolvedValue({ account: true })
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const button = screen.getByText('Cadastrar')
    fireEvent.click(button)

    await waitFor(() => expect(input.value).toBe('test@example.com'))

    await waitFor(() => expect(HttpService.post).toHaveBeenCalled())
    expect(mockDispatch).toHaveBeenCalledWith(
      addToast({
        title: 'Que bom que você chegou!',
        content: 'Agora falta pouco, verifique sua conta para começar a jogar!',
        variant: 'success',
      })
    )
    expect(mockNavigate).toHaveBeenCalledWith('/verificar')
  })

  it('should show error if response has fieldsErrors', async () => {
    HttpService.post.mockResolvedValue({
      fieldsErrors: { email: 'error message' },
    })
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const button = screen.getByText('Cadastrar')
    fireEvent.click(button)

    await waitFor(() => expect(input.value).toBe('test@example.com'))

    await waitFor(() => expect(HttpService.post).toHaveBeenCalled())
    expect(screen.getByText('error message')).toBeInTheDocument()
  })
})
